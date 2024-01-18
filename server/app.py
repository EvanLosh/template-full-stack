#!/usr/bin/env python3

from models import db, Person, Home
# from models import [your model classes]
from flask_restful import Api, Resource
from flask_migrate import Migrate
from flask import Flask, make_response, jsonify, request
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get(
    "DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")

app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

migrate = Migrate(app, db)

db.init_app(app)

# Define API endpoints and responses here
@app.route('/')
def home():
    return make_response(
        {'body': 'This is a response from the server.'},
        200
    )

@app.route('/people', methods = ['GET', 'POST'])
def people():
    people = Person.query.all()
    person_dicts = [p.to_dict() for p in people]
    if request.method == 'GET':
        response = make_response(person_dicts, 200)
    elif request.method == 'POST':
        form_data = request.get_json()
        new_person = Person(name = form_data['name'], home_id = form_data['home_id'])
        db.session.add(new_person)
        db.session.commit()
        response = make_response(new_person.to_dict(), 201)
    return response

@app.route('/homes', methods = ['GET'])
def homes():
    home_dicts = [h.to_dict() for h in Home.query.all()]
    response = make_response(home_dicts, 200)
    return response

@app.route('/people/<int:id>', methods = ['GET', 'PATCH', 'DELETE'])
def person_by_id(id):
    person = Person.query.filter_by(id=id).first()
    if request.method == 'GET':
        response = make_response(person.to_dict(), 200)
    elif request.method == 'PATCH':
        form_data = request.get_json()
        for attr in form_data:
            setattr(person, attr, form_data[attr])
        db.session.add(person)
        db.session.commit()
        response = make_response(person.to_dict(), 200)
    elif request.method == 'DELETE':
        db.session.delete(person)
        db.session.commit()
        response = make_response({}, 204)
    return response



if __name__ == '__main__':
    app.run(port=5555, debug=True)