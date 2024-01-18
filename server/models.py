from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin

convention = {
    "ix": "ix_%(column_0_label)s",
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s"
}

metadata = MetaData(naming_convention=convention)

db = SQLAlchemy(metadata=metadata)

# Define model classes
class Person(db.Model, SerializerMixin):
    __tablename__ = 'people'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    home_id = db.Column(db.Integer, db.ForeignKey('homes.id'))

    # Add relationship
    home = db.relationship('Home', back_populates = 'people')
    # Add serialization rules
    serialize_rules = ('-home.people',)
    # Validate data
    @validates('name')
    def validate_name(self, key, value):
        if isinstance(value, str) and len(value) > 0:
            return value
        else:
            raise ValueError('invalid name')
    
    def __repr__(self):
        return f'<Person {self.id}: {self.name}>'
    
class Home(db.Model, SerializerMixin):
    __tablename__ = 'homes'

    id = db.Column(db.Integer, primary_key=True)
    address = db.Column(db.String)

    # Add relationship
    people = db.relationship('Person', back_populates = 'home')
    # Add serialization rules
    serialize_rules = ('-people.home',)
    # Validate data
    @validates('address')
    def validate_address(self, key, value):
        if isinstance(value, str) and len(value) > 0:
            return value
        else:
            raise ValueError('invalid address')

    def __repr__(self):
        return f'<Home {self.id}: {self.address}>'
