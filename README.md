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

# To run this application locally

In the client directory, run 

```
    $client npm install
    $client npm run start
```

In another terminal the project directory, run

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

# Begin coding

* To code the structure and relationships of the database tables, edit server/models.py
* To code the API, edit server/app.py
* To code React components, work in client/src/components
