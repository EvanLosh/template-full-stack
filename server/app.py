from flask import Flask, jsonify, request, make_response, session
from flask_migrate import Migrate
from flask_restful import Resource, Api
from models import db, Patient, Provider, Appointment
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

from datetime import datetime


app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret-key'

api = Api(app)
cors = CORS(app, resources={r'/*': {"origins": "*"}})
# configure the database connection to the local file app.db
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'

# configure flag to disable modification tracking and use less memory
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# create a Migrate object to manage schema modifications
migrate = Migrate(app, db)

# initialize the Flask application to use the database
db.init_app(app)

class AppointmentsResource(Resource):
    def get(self):
        # return a list of all posts with only the attributes needed to render cards (no bodies or comments)
        appointments = [a.to_dict() for a in Appointment.query.all()]
        return appointments, 200  
    
    def post(self):
        
        # create a new post
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
    def get(self, id):
    # return complete data of a specified post
        appointment = Appointment.query.filter_by(id=id).first()
        if appointment:
            return appointment.to_dict(), 200  
        else:
            return {"errors": "Appointment not found"}, 404
    
    def patch(self, id):
        # post = Post.query.filter_by(id = id).first()
        appointment = Appointment.query.get_or_404(id)
        
        form_data = request.get_json()        
        
        try:
            # post = Post.query.filter_by(id = id).first()
            if 'location' in form_data:
                appointment.location = form_data['location']
            if 'appointment_datetime' in form_data:
                appointment.appointment_datetime = form_data['appointment_datetime']
            if 'status' in form_data:
                appointment.status = form_data['status']

            # post.datetime_last_edited = datetime.now()
            db.session.add(appointment)
            db.session.commit()
            return appointment.to_dict(), 200
        except:
            return {"errors": "Error updating appointment"}, 500


    def delete(self, id):
        appointment = Appointment.query.filter_by(id = id).first()
        if appointment:
            db.session.delete(appointment)
            db.session.commit() 
            return {}, 204
        else: 
            return {}, 404


# api.add_resource(UsersResource, '/users') # Post
# api.add_resource(UserResource, '/users/<int:id>') # Get
api.add_resource(AppointmentsResource, '/appointments') # Get, Post
api.add_resource(AppointmentResource, '/appointment/<int:id>') # Get, Patch, Delete
# api.add_resource(SignInResource, '/signin') # Post


if __name__ == "__main__":
    app.run(debug=True)