import React, { useEffect, useState } from "react";
import AppointmentList from "./AppointmentList.js"


function Appointments({ commonProps }) {

    const [appointments, setAppointments] = useState([])
    // let authorized = false

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
            .then(r => {
                return r.json()
            })
            .then(r => {
                console.log(r)
                if (r.constructor === Array) {
                    setAppointments(r)
                }
                if ('msg' in r) {
                    // handle bad response from server
                    // e.g. auth token expired -> tell the user to logout
                }
            }
            )
    }
        , []
    )

    return (
        <div >
            <AppointmentList commonProps={commonProps} appointments={appointments} />

        </div>
    );
}

export default Appointments;