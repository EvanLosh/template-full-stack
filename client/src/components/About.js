import React, { useEffect, useState } from "react";

function About() {

    return (
        <div id="About">
            <h1>About.js</h1>
            <p>To use Tailwind CSS, use VS Code with the Tailwind CSS Intellisense extension.</p>
            <p>To start the back end, in the project directory:</p>
            <p>$ pipenv install</p>
            <p>$ pipenv shell</p>
            <p>$ cd server</p>
            <p>server$ flask db init</p>
            <p>server$ flask migrate -m "initial migration"</p>
            <p>server$ flask upgrade head</p>
            <p>server$ python seed.py</p>
            <p>server$ python app.y</p>
            <p>To quickly delete the databse and create a new one:</p>
            <p>server$ chmod +x new-db.sh</p>
            <p>server$ ./new-db.sh</p>
            <p>To start the front end, in another terminal in the project directory:</p>
            <p>$ cd client</p>
            <p>client$ npm install</p>
            <p>client$ npm run start</p>
            <p></p>

        </div>
    );
}

export default About;