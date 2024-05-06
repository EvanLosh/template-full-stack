#!/usr/bin/env python3

# Standard library imports
from datetime import datetime, timedelta
import random
import math
# Remote library imports
from faker import Faker
import bcrypt

# Local imports
from app import app
from models import db, Patient, Provider, Appointment, User

fake = Faker()

# Function to generate fake users
def generate_patient():
    name=fake.name()
    dob=fake.date_time()
    if len(name) > 100:
        name = name[0:100]
    return Patient(
        name=name,
        dob=dob
    )

def generate_provider():
    name=fake.name() + ", M.D."
    npi=fake.pystr(20)
    if len(name) > 100:
        name = name[0:100]
    if len(npi) > 20:
        npi = npi[0:20]
    return Provider(
        name=name,
        npi=npi
    )

def generate_appointment():
    return Appointment(
        patient_id = random.choice(Patient.query.all()).id,
        provider_id = random.choice(Provider.query.all()).id,
        appointment_datetime = fake.date_time(),
        location = fake.address(),
        status = random.choice(["Active", "Canceled"]),
        )

# Main function to seed the database
def seed_database():
    with app.app_context():
        # delete all entries in the database
        for i in (Patient.query.all() + Provider.query.all() + Appointment.query.all() ):
            db.session.delete(i)
        db.session.commit()

        # generate new patients
        for i in range(4):
            patient = generate_patient()
            db.session.add(patient)
        db.session.commit()

        # generate new providers
        for i in range(2):
            provider = generate_provider()
            db.session.add(provider)
        db.session.commit()
        
        # generate appointments
        for i in range(12):
            appointment = generate_appointment()
            db.session.add(appointment)
        db.session.commit()

if __name__ == "__main__":
    seed_database()