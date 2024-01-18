# Template for full stack app development using React, Flask, and SQLalchemy

This template was created by running npx create-react-app and then adding a Pipfile and a server directory containing app.py, models.py, and seed.py. 


## Get started

Fork this repository and give it a new name. Clone it.

In the project directory, you can run:

### `npm install`

Install node dependencies.

### `npm start`

Runs the frontend app in the development mode at [http://localhost:3000](http://localhost:3000) 

### `pipenv install`

Install dependencies from Pipfile.

### `pipenv shell`

Enter the virtual environment of the backend.

### `python ./server/app.py`

Runs the server at [http:/127.0.0.1:5555](http:/127.0.0.1:5555).

### `flask db init`
### `flask db migrate -m 'your message'`
### `flask db upgrade head`

Create a migrations directory and an app.db file with SQL tables based on the class definitions in server/models.py.

### `python ./server/seed.py`

Insert seed data into app.db.

### `flask shell`

Enter the flask CLI.

## If 
