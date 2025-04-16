# Full-stack web application template using React and Flask

This template project is a starting point for web developers creating new full-stack web applications. I made this template for myself, but anybody is welcome to use it. 

Why would you use this template? Because you can start coding your project by editing already-working ORM models, API endpoints, and React components.

# Features

The Flask back-end includes
* A relational SQL database
* An ORM (object-relational mapping) using SQLAlchemy
* A script that seeds the databse with random data
* A RESTful web API
* Endpoint protection using encrypted JWTs stored in the client's local storage

The React front-end includes
* A React router
* Login and Sign Up forms
* A table that fetches and displays data from the database
* The table can be sorted and filtered
* Tailwind CSS

# Starting a new project

1. Download the files of this repo as a .zip
2. On github.com, create a new repo
3. Unzip the download
4. On github.com, Upload the contents of template-full-stack/ to the new repo and commit
5. Clone the new repo to your local machine


# To run this application locally

Open a terminal and cd to the project directory. Enter these commands to run the back-end:

```
    $ pipenv install
    $ pipenv shell
    $ cd server
    /server$ flask db init
    /server$ flask db migrate -m "initial migration"
    /server$ flask db upgrade head
    /server$ python seed.py
    /server$ python app.py
```

Open another terminal and cd to the client directory. Enter these commands to run the front-end: 

```
    /client$ npm install
    /client$ npm run start
```

# Begin coding

* The ORM is coded in /server/models.py
* The API is coded in /server/app.py
* React components are located in /client/src/components
