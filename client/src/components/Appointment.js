import React, { useEffect, useState } from "react";

function Appointment({ commonProps, appointment }) {


    return (
        <tr>
            <td>{appointment.patient.name}</td>
            <td>{appointment.patient.dob}</td>
            <td>{appointment.appointment_datetime}</td>
            <td>{appointment.provider.name}</td>
            <td>{appointment.location}</td>
            <td>{appointment.status}</td>
        </tr>


        // <div className="appointment">

        //     <h1>Appointment.js</h1>
        // </div>
    );
}

export default Appointment;