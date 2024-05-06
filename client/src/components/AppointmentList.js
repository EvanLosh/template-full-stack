import React, { useEffect, useState } from "react";
import Appointment from "./Appointment.js"

function AppointmentList({ commonProps, appointments }) {



    // const appointmentComponents = appointments.map(a => {
    //     return <Appointment appointment={a} commonProps={commonProps} />
    // })

    return (
        <div id="appointment-list">
            <h1>AppointmentList.js</h1>
            {/* {appointmentComponents} */}
        </div>
    );
}

export default AppointmentList;