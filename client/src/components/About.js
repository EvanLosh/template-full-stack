import React, { useEffect, useState } from "react";

function About() {

    const [featuresCollapsed, setFeaturesCollapsed] = useState(true)
    const [guideCollapsed, setGuideCollapsed] = useState(true)

    function buttonContent(x) {
        return x ? "Expand" : "Hide"
    }

    return (
        <div id="About">
            <h1>This is a template project for web developers</h1>
            <p>This is an open source project meant to be used by anybody as a starting point for creating new web applications.</p>
            <div className="collapseable ">
                <div className="collapseable-headline">

                    <img
                        src='/images/left-arrow-angle-svgrepo-com.svg'
                        alt={(featuresCollapsed ? "Expand" : "Collapse")}
                        className={"collapse-button " + (featuresCollapsed ? "right" : "down")}
                        onClick={() => setFeaturesCollapsed(!featuresCollapsed)}>
                    </img>
                    <h3>The features of this template</h3>
                </div>
                <ol className={featuresCollapsed ? "collapse" : ""}>
                    <li>A relational, structured database with tables for users, patients, doctors, and appointments</li>
                    <li>A SQLAlchemy object-relationship mapping (ORM) defined in server/models.py</li>
                    <li>Serialized object relationships using SerializerMixin</li>
                    <li>A Flask server application with a RESTful web API in server/app.py</li>
                    <li>Endpoint protection using encrypted JWTs stored in the user's localStorage</li>
                    <li>A React front-end with routing</li>
                    <li>A login/sign up page for creating new users</li>
                    <li>A table that fetches and displays appointments from the database</li>
                    <li>The table data can be sorted and filtered</li>
                </ol>
            </div>

            <div className="collapseable ">
                <div className="collapseable-headline">
                    <img
                        src='/images/left-arrow-angle-svgrepo-com.svg'
                        alt={(guideCollapsed ? "Expand" : "Collapse")}
                        className={"collapse-button " + (guideCollapsed ? "right" : "down")}
                        onClick={() => setGuideCollapsed(!guideCollapsed)}>
                    </img>
                    <h3>Get started</h3>
                </div>
                <ol className={guideCollapsed ? "collapse" : ""}>
                    <li>Copy this project from Github.</li>
                    <li>In a terminal in the project directory, install Python dependencies and enter the virtual environment.</li>
                    <div className="code-block">
                        <p>$ pipenv install</p>
                        <p>$ pipenv shell</p>
                    </div>
                    <li>Create the database and optionally seed it with random data.</li>
                    <div className="code-block">
                        <p>$ cd server</p>
                        <p>server$ flask db init</p>
                        <p>server$ flask migrate -m "initial migration"</p>
                        <p>server$ flask upgrade head</p>
                    </div>
                    <li>Optionally, populate the database with randomly generated seed data for testing and demo purposes.</li>
                    <div className="code-block">
                        <p>server$ python seed.py</p>
                    </div>
                    <li>To start the server:</li>
                    <div className="code-block">
                        <p>server$ python app.y</p>
                    </div>
                    <li>To quickly delete the databse and create a new one:</li>
                    <div className="code-block">
                        <p>server$ chmod +x new-db.sh</p>
                        <p>server$ ./new-db.sh</p>

                    </div>
                    <li>To start the front end, open a second terminal in the project directory and run these commands:</li>
                    <div className="code-block">
                        <p>$ cd client</p>
                        <p>client$ npm install</p>
                        <p>client$ npm run start</p>
                    </div>
                    <li>To use Tailwind CSS, it is suggested to work in VS Code with the extension Tailwind CSS Intellisense.</li>
                    <li>The database and object mapping are programmed in server/models.py</li>
                    <li>The API is programmed in server/app.py</li>
                </ol>

            </div>
        </div>
    );
}

export default About;