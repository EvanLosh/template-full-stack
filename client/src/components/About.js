import React, { useState } from "react";

function About() {

    const [featuresCollapsed, setFeaturesCollapsed] = useState(true)
    const [guideCollapsed, setGuideCollapsed] = useState(true)

    const collapseableDivClassName = "collapseable w-full mb-8 px-16 pt-4 pb-8 border-2 rounded shadow bg-white"
    const olClassName = "list-decimal my-8"
    const collapseableH3ClassName = 'clickable'

    return (
        <div id="About" className="w-1/2 m-auto mt-12 ">
            <h1 className="m-8">About</h1>
            <div className="w-full mb-16 px-8 pt-4 pb-16 border-2 rounded shadow bg-white">
                <p className="mt-4">This template project is a starting point for web developers creating new full-stack web applications. I made this template for myself, but anybody is welcome to use it.</p>
                <p className="mt-4">Why would you use this template? Because you can start coding your project by editing already-working ORM models, API endpoints, and React components.</p>
            </div>
            <div className={collapseableDivClassName}>
                <span className="collapseable-headline clickable" onClick={() => setFeaturesCollapsed(!featuresCollapsed)}>

                    <img
                        src='/images/left-arrow-angle-svgrepo-com.svg'
                        alt={(featuresCollapsed ? "Expand" : "Collapse")}
                        className={"collapse-button " + (featuresCollapsed ? "right" : "down")}
                    // onClick={() => setFeaturesCollapsed(!featuresCollapsed)}
                    >

                    </img>
                    <h3 className={collapseableH3ClassName}>The features of this template</h3>
                </span>
                <ol className={(featuresCollapsed ? "collapse " : " ") + olClassName}>
                    <li>A Flask back-end including</li>
                    <ol className="list-disc pl-8">

                        <li>A relational SQL database</li>
                        <li>An ORM (object-relational mapping) using SQLAlchemy</li>
                        <li>A script that seeds the databse with random data</li>
                        <li>A RESTful web API</li>
                        <li>Endpoint protection using encrypted JWTs stored in the client's local storage</li>
                    </ol>
                    <li>A React front-end including</li>
                    <ol className="list-disc pl-8">
                        <li>A React router</li>
                        <li>Login and Sign Up forms</li>
                        <li>A table that fetches and displays data from the database</li>
                        <li>The table can be sorted and filtered</li>
                        <li>Tailwind CSS</li>
                    </ol>
                </ol>
            </div>

            <div className={collapseableDivClassName}>
                <span className="collapseable-headline clickable" onClick={() => setGuideCollapsed(!guideCollapsed)}>
                    <img
                        src='/images/left-arrow-angle-svgrepo-com.svg'
                        alt={(guideCollapsed ? "Expand" : "Collapse")}
                        className={"collapse-button " + (guideCollapsed ? "right" : "down")}
                    // onClick={() => setGuideCollapsed(!guideCollapsed)}
                    >
                    </img>
                    <h3 className={collapseableH3ClassName}>Get started</h3>
                </span>
                <ol className={(guideCollapsed ? "collapse " : " ") + olClassName}>
                    <li>Copy this project from <a href="https://github.com/EvanLosh/template-full-stack" target="_blank" rel="noreferrer noopener" className="text-blue-700 underline">Github</a></li>
                    <li>In a terminal in the project directory, install Python dependencies and run the virtual environment for the Flask app.</li>
                    <div className="code-block">
                        <p>$ pipenv install</p>
                        <p>$ pipenv shell</p>
                    </div>
                    <li>Create the database</li>
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
                    <li>Start the server:</li>
                    <div className="code-block">
                        <p>server$ python app.py</p>
                    </div>
                    <li>At any time, you can quickly delete the databse and create a new one (because it's easier than migrating):</li>
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
                    <li>Begin coding the structure and relationships of your databse by editing this file:</li>
                    <div className="code-block">
                        <p>server/models.py</p>
                    </div>
                    <li>Begin coding your API by editing this file:</li>
                    <div className="code-block">
                        <p>server/app.py</p>
                    </div>
                    <li>Begin coding your client by editing files located in:</li>
                    <div className="code-block">
                        <p>client/src/components/</p>
                        <p>client/public/</p>
                    </div>
                    <li>Build and deploy your web app... (need to think about this before writing instructions)</li>
                    <li>If utilizing Tailwind CSS, it is suggested to work in VS Code with the extension Tailwind CSS Intellisense.</li>
                </ol>

            </div>
            <div className="h-24"></div>
        </div >
    );
}

export default About;