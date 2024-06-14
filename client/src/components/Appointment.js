import React from "react";

function Appointment({ commonProps, appointment }) {

    return (
        <tr className="appointment-data-row">
            <td>{appointment['patientName']}</td>
            <td>{appointment['patientDOB'].substring(0, 10)}</td>
            <td>{appointment['appointment_datetime'].substring(0, 16)}</td>
            <td>{appointment['providerName']}</td>
            <td>{appointment['location']}</td>
            <td>{appointment['status']}</td>
        </tr>

    );
}

export default Appointment;