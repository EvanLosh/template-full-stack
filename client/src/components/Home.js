import React, { useEffect, useState } from "react";
import "./Home.css";
import Appointments from "./Appointments"

function Home({ commonProps }) {



    return (
        <div id="home">

            <h1>Welcome to Evan's template for full-stack web applications using JavaScript, React, Python, Flask, and Tailwind</h1>

            <a href='/about'>
                <h1>Who is this website for?</h1>
            </a>



            <Appointments commonProps={commonProps} />
        </div>
    );
}

export default Home;
