import React from "react";

function Appointment({ commonProps, appointment }) {


    return (
        <tr className="appointment-data-row">
            <td>{appointment['patientName']}</td>
            <td>{appointment['patientDOB']}</td>
            <td>{appointment['appointment_datetime']}</td>
            <td>{appointment['providerName']}</td>
            <td>{appointment['location']}</td>
            <td>{appointment['status']}</td>
        </tr>

    );
}

export default Appointment;