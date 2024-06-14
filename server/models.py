from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates, backref
from datetime import datetime, timezone
import bcrypt

db = SQLAlchemy()


class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
   
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), nullable=False, unique=True)
    password_hash = db.Column(db.String(100), nullable=False)
    datetime_created = db.Column(db.DateTime, default=datetime.now(timezone.utc))

    def __repr__(self):
        return f'User(id={self.id}, username={self.username})'
    
    def verify_password(self, password):
        password_bytes = password.encode('utf-8')
        return bcrypt.checkpw(password_bytes, self.password_hash)
    
    def generate_session_data(self):
        userdata = {
            'username': self.username,
            'password': str(self.password_hash),
            'id': self.id,
            'datetime_created': str(self.datetime_created),
            'datetime_session_start': str(datetime.now(timezone.utc))
        }
        return userdata

class Patient(db.Model, SerializerMixin):
    __tablename__ = 'patients'
   
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), nullable=False)
    dob = db.Column(db.String(20), nullable=False)
    datetime_created = db.Column(db.DateTime, default=datetime.now(timezone.utc))

    appointments = db.relationship('Appointment', back_populates='patient')
    
    serialize_rules = (
        "-appointments.patient",
        "-appointments.provider",
        )
    
    def __repr__(self):
        return f'User(id={self.id}, name={self.name}, DOB={self.dob})'

    @validates('name')
    def validate_name(self, key, value):
        if not value:
            raise ValueError('Invalid namename')
        if 1 > len(value) > 100:
            raise ValueError('Name length must be between 1 and 100 characters')
        if ',' in value or '\\' in value or '/' in value or ';' in value or "{" in value or "}" in value:
            return ValueError('Names cannot contain commas, semicolons, slashes, and brackets')
        return value
    
    @validates('dob')
    def validate_dob(self, key, value):
        if not value:
            raise ValueError('Invalid date of birth')
        return value
    
class Provider(db.Model, SerializerMixin):
    __tablename__ = 'providers'

    id = db.Column(db.Integer, primary_key=True)
    npi = db.Column(db.String(150))
    name = db.Column(db.String(100))
    datetime_created = db.Column(db.DateTime, default=datetime.now(timezone.utc))

    appointments = db.relationship('Appointment', back_populates="provider")

    serialize_rules = (
        "-appointments.patient",
        "-appointments.provider",
        )

    def __repr__(self):
        return f'Post(id={self.id} name={self.name} NPI={self.npi})'
    
    
class Appointment(db.Model, SerializerMixin):
    __tablename__ = 'appointments'

    id = db.Column(db.Integer, primary_key=True)
    patient_id = db.Column(db.Integer,  db.ForeignKey('patients.id'), nullable=False)
    provider_id = db.Column(db.Integer,  db.ForeignKey('providers.id'), nullable=False)
    location = db.Column(db.String(10000))
    datetime_created = db.Column(db.DateTime, default=datetime.now(timezone.utc))
    appointment_datetime = db.Column(db.DateTime)
    status = (db.Column(db.String(100))) # "Active" or "Canceled"

    patient = db.relationship("Patient", back_populates="appointments")
    provider = db.relationship("Provider", back_populates="appointments")

    serialize_rules = (
        "-patient.appointments",
        "-provider.appointments"
        )


    def __repr__(self):
        return f'Comment(id={self.id} Patient={self.patient.name} Provider={self.provider.name}, Datetime={self.appointment_datetime})'
    


