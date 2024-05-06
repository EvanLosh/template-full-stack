# Full-stack web application template using React and Flask

This template includes a Flask server and databse with ORM and RESTful API. Users are authenticated at endpoints using password encryption stored as JWT in the client.  

To use the template, clone this repository, then copy the template into your new project directory

```
    cp -r /template-full-stack/* /new-project/
```


In the client directory, run 

```
    npm install
    npm run start
```

In the project directory, run

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
