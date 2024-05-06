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
            <h1>Home.js</h1>
            <AppointmentList commonProps={commonProps} appointments={appointments} />
        </div>
    );
}

export default Home;
