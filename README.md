# Template for new full stack web apps using React, Flask, and SQLalchemy

This template was created by running `npx create-react-app` and then adding a `Pipfile` and a `server` directory containing `app.py`, `models.py`, and `seed.py`. 

Use this project as a starting point for developing any new web app.

## Get started

Fork this repository and give it a new name.

In the project directory, you can run:

### `npm install`

Installs Javascript dependencies.

### `npm start`

Runs the frontend app in development mode at [http://localhost:3000](http://localhost:3000) 

### `pipenv install`

Installs backend dependencies from `Pipfile`.

### `pipenv shell`

Enters the virtual environment of the backend.

### `python ./server/app.py`

Runs the server at [http:/127.0.0.1:5555](http:/127.0.0.1:5555).

### `flask db init`
### `flask db migrate -m 'your message'`
### `flask db upgrade head`

Creates `app.db` with SQL tables corresponding to your model classes in `server/models.py`.

### `flask shell`

Enters the Flask shell.
