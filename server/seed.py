from random import randint, choice as rc
from faker import Faker
from app import app
from models import db, Home, Person

fake = Faker()

# define functions to create instances of model classes with fake or random data
def make_n_homes(n):
    homes = []
    for i in range(n):
        homes.append(Home(address = fake.address()))
    return homes

def make_people():
    people = []
    homes = Home.query.all()
    for i in range(4*len(homes)):
        people.append(Person(name = fake.name(), home_id = rc(homes).id))
    return people

if __name__ == '__main__':

    with app.app_context():
        print("Clearing db...")
        # Delete all database contents
        homes = Home.query.all()
        people = Person.query.all()
        for home in homes:
            db.session.delete(home)
        for person in people:
            db.session.delete(person)
        db.session.commit()

        # Create data and insert it into the db
        print("Seeding homes and people...")
        db.session.add_all(make_n_homes(4))
        db.session.add_all(make_people())
        db.session.commit()

