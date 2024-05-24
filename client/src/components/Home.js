import React, { useEffect, useState } from "react";
import "./Home.css";
import AppointmentList from "./AppointmentList.js";

function Home({ commonProps }) {

    const [appointments, setAppointments] = useState([])

    useEffect(() => {
        fetch(commonProps.serverURL + "/appointments",
            {
                method: 'GET',
                headers: {
                    'Authorization': "Bearer " + commonProps.getAccessToken(),
                    'Content-Type': 'application/json'
                }
            }
        )
            .then(r => r.json())
            .then(r => {
                console.log(r)
                setAppointments(r)
            }
            )
    }
        , []
    )

    return (
        <div id="home">

            <p>This box is an example of CSS gradients, animations, masks, and text effects.</p>
            <div id="fancy-css-example-container">

                <div id="masked"></div>
                <div id="mask">
                    <div id="css-blurry">=====</div>
                </div>

            </div>
            <AppointmentList commonProps={commonProps} appointments={appointments} />

        </div>
    );
}

export default Home;
