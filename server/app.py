from flask import Flask, jsonify, request, make_response, session
from flask_migrate import Migrate
from flask_restful import Resource, Api
from models import User, db, Patient, Appointment, Provider
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime
import bcrypt
import werkzeug
from werkzeug import security
from werkzeug.middleware.proxy_fix import ProxyFix
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager
# from flask_jwt import jwt_required, current_identity, JWT
# import requests
# from flask_session import Session
# import jwt as pyjwt


app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret-key'
# ===========================================================================
# FOR PRODUCTION ONLY: "Tell Flask that it is behind a proxy.
# Set the correct number of proxies that set each header. 
# It can be a security issue if you get this configuration wrong."
# ===========================================================================
app.wsgi_app = ProxyFix(
    app.wsgi_app, x_for=1, x_proto=1, x_host=1, x_prefix=1
)
# ===========================================================================

jwt = JWTManager(app)
api = Api(app)
cors = CORS(app, resources={r'/*': {"origins": "*"}})
# configure the database connection to the local file app.db
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
# configure flag to disable modification tracking and use less memory
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
migrate = Migrate(app, db)
db.init_app(app)

# def generate_jwt(user):
#     return str(pyjwt.encode(user.generate_session_data(), 'secret-key', algorithm='HS256'))

# def decode_jwt(token):
#     return pyjwt.decode(token, 'secret-key', algorithms=['HS256'])

class LoginResource(Resource):
    # Return an access token to the user
    def post(self):
        form_data = request.get_json()
        user = User.query.filter_by(username = form_data['username']).first()
        if user:
            password = form_data['password']
            if user.verify_password(password):
                return {
                    'user': {
                        'username': user.username,
                        'id': user.id,
                        'datetime_created': str(user.datetime_created),
                        },
                    'access_token': create_access_token(identity=user.username)
                    }, 200
            else:
                return {'message': 'Username or password is incorrect'}, 401
        else:
            return {'message': 'Username or password is incorrect'}, 401
        
class UsersResource(Resource):
    
    def post(self):
        # create a new user
        try:
            form_data = request.get_json()
            if bool(User.query.filter_by(username=form_data['username']).first()):
                return {"message": "That username is not available"}, 200
            password = form_data['password']
            password_bytes = password.encode('utf-8')
            salt = bcrypt.gensalt()
            password_hash = bcrypt.hashpw(password_bytes, salt)
            new_user = User(username=form_data['username'], password_hash=password_hash)
            db.session.add(new_user)
            db.session.commit()
            return new_user.to_dict(), 201
        except:
            return {"message": "Failed to add new user to the database"}, 500


class ProvidersResource(Resource):
    def get(self):
        providers = [p.to_dict() for p in Provider.query.all()]
        return providers, 200  

class AppointmentsResource(Resource):
    @jwt_required()
    def get(self):
        appointments = [a.to_dict() for a in Appointment.query.all()]
        return appointments, 200  
    
    @jwt_required()
    def post(self):
        # create a new appointment
        form_data = request.get_json()

        if form_data['patient_id'] < 1:
            return {'errors': 'Patient not found'}, 404
        if form_data['provider_id'] < 1:
            return {'errors': 'Provider not found'}, 404
        try:
            newAppointment = Appointment(
                           patient_id = form_data['patient_id'],
                           provider_id = form_data['provider_id'],
                           appointment_datetime = form_data['appointment_datetime'],
                           location = form_data['location'],
                           status = "Active"
                           )
            db.session.add(newAppointment)
            db.session.commit()
            return newAppointment.to_dict(), 201
        except:
            return {'errors': 'failed to create an instance of calss Appointment'}, 500
        return {'errors': 'idk'}, 500

class AppointmentResource(Resource):
    @jwt_required()
    def get(self, id):
        # return an appointment
        appointment = Appointment.query.filter_by(id=id).first()
        if appointment:
            return appointment.to_dict(), 200  
        else:
            return {"errors": "Appointment not found"}, 404
    @jwt_required()
    def patch(self, id):
        # alter an appointment
        appointment = Appointment.query.get_or_404(id)
        form_data = request.get_json()        
        
        try:
            if 'location' in form_data:
                appointment.location = form_data['location']
            if 'appointment_datetime' in form_data:
                appointment.appointment_datetime = form_data['appointment_datetime']
            if 'status' in form_data:
                appointment.status = form_data['status']

            db.session.add(appointment)
            db.session.commit()
            return appointment.to_dict(), 200
        except:
            return {"errors": "Error updating appointment"}, 500

    @jwt_required()
    def delete(self, id):
        appointment = Appointment.query.filter_by(id = id).first()
        if appointment:
            db.session.delete(appointment)
            db.session.commit() 
            return {}, 204
        else: 
            return {}, 404


api.add_resource(UsersResource, '/users') # HTTP methods: Post
api.add_resource(ProvidersResource, '/providers') # HTTP methods: Get
api.add_resource(AppointmentsResource, '/appointments') # HTTP methods: Get, Post
api.add_resource(AppointmentResource, '/appointment/<int:id>') # HTTP methods: Get, Patch, Delete
api.add_resource(LoginResource, '/login') # HTTP methods: Post


if __name__ == "__main__":
    app.run(debug=True)