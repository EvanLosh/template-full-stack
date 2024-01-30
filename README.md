# Full-stack project template

Clone this repository, then copy the template into your new project directory

## cp -r /path1/template-full-stack/* /path2/my-new-project/

In the client directory, run 

## npm install
## npm run start

In the project directory, run

## pipenv install
## pipenv shell

In the server directory, run

## flask db init
## flask db migrate -m "initial migration"
## flask db upgrade head
## python app.py
