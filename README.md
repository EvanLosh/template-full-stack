# Full-stack project template

This template includes a working Flask server and databse with ORM. To use it, clone this repository, then copy the template into your new project directory

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
    pipenv install
    pipenv shell
```

In the server directory, run

```
    flask db init
    flask db migrate -m "initial migration"
    flask db upgrade head
    python seed.py
    python app.py
```
