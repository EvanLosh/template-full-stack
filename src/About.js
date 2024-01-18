import React, { useState, useEffect } from 'react';
// import Component from ./Component

function About() {
    return (
        <div id="about">
            <h2>What is this app for?</h2>
            <p>This web app is a template for starting new full-stack projects using React, Flask, and SQLalchemy.</p>
            <h2>On the backend</h2>
            <p>models.py defines two model classes (people and homes) and an object relationship model. Every person has one home, and Each home may have many people. models.py also defines serialization rules and validates data. Each class has a corresponding table in a SQL database, and each instance is synced to a row of data.</p>
            <p>app.py defines API endpoints and server responses.</p>
            <p>To set up the database, ...</p>
            <p>To run the server, ...</p>
            <h2>On the frontend</h2>
            <p>App.js fetches data from the server when it mounts. It also features a React Router. The user can perform CRUD actions on the server database via form submission.</p>
            <p>To start the frontend, ...</p>
        </div>
    );
}

export default About;