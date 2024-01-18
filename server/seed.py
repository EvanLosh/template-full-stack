from random import randint, choice as rc

from faker import Faker

from app import app
from models import db

fake = Faker()

# define functions to create instances of model classes with fake or random data

if __name__ == '__main__':

    with app.app_context():
        print("Clearing db...")
        # Delete all existing instances of model classes

        # For each model class, do:
        print("Seeding [model class]...")
        # Call function to create instances of model class
        # db.session.add_all(model_class_instance_list)
        # db.session.commit()

    pass