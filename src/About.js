import React, { useState, useEffect } from 'react';
// import Component from ./Component

function About() {
    return (
        <div id="about">
            <h2>What is this app for?</h2>
            <p>This web app is a template for starting new full-stack projects using React, Flask, and SQLalchemy.</p>
            <h2>On the backend</h2>
            <p><code>models.py</code> defines two model classes (people and homes) and an ORM. Every person has one home, and Each home may have many people. <code>models.py</code> also defines serialization rules and validates data. Each class has a corresponding table in a SQL database, and each instance is synced to a row of data.</p>
            <p><code>app.py</code> defines API endpoints and server responses.</p>
            <p>To set up the database, run these commands in the project directory:</p>
            <p class="code"># pipenv install</p>
            <p class="code"># pipenv shell</p>
            <p>And then in the server directory:</p>
            <p class="code"># flask db init</p>
            <p class="code"># flask db migrate -m "initial migration"</p>
            <p class="code"># flask db upgrade head</p>
            <p>To populate the database with fake data, run <code> seed.py</code>.</p>
            <p>To start the server, run <code> app.py</code>.</p>
            <h2>On the frontend</h2>
            <p><code>App.js</code> fetches data from the server when it mounts. It also features a React Router. The user can perform CRUD actions on the server database via form submission.</p>
            <p>To start the frontend, run these commands in the project directory:</p>
            <p class="code"># npm install</p>
            <p class="code"># npm run server</p>
        </div>
    );
}

export default About;