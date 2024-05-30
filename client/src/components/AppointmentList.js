import React, { useEffect, useState } from "react";
import Appointment from "./Appointment.js"

function AppointmentList({ commonProps, appointments }) {



    const appointmentCards = appointments.map(a => {
        return <Appointment key={a.id} appointment={a} commonProps={commonProps} />
    })

    return (
        <div id="appointment-list">
            <h1>AppointmentList.js</h1>
            <table>
                <tr>
                    <th>Patient Name</th>
                    <th>Patient DOB</th>
                    <th>Datetime</th>
                    <th>Provider</th>
                    <th>Location</th>
                    <th>Status</th>
                </tr>

                {appointmentCards}
            </table>
        </div>
    );
}

export default AppointmentList;