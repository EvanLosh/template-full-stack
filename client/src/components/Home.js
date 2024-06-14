import React from "react";
import Appointments from "./Appointments"
import "./Home.css";

function Home({ commonProps }) {



    return (
        <div id="home" className="w-3/4 m-auto">


            <div id='welcome-message' className="bg-yellow-300 shadow rounded-3xl w-full border-yellow-200 border-2">
                <h1 className=" py-6 px-12 mb-24 text-gray-600 text-7xl" id="welcome-web-developer">Welcome, web developer!</h1>
                <a href='/about' className="bg-purple-500 text-white pl-8 rounded-3xl pr-12 py-4 border-2 border-purple-400 shadow-lg ml-96 my-8 mr-10">
                    <img
                        src='/images/left-arrow-angle-svgrepo-com.svg'
                        alt="arrow graphic"
                        className="right invert"
                    >
                    </img>
                    <h3 className="clickable">What is this website for?</h3>
                </a>
            </div>

            <button onClick={() => window.location.href = "/view-appointments"} className="button m-32">View appointments</button>

            {/* <Appointments commonProps={commonProps} /> */}
        </div >
    );
}

export default Home;
