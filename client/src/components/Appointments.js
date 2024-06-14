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
                    // this is bad code. need to improve api response structure.
                    setAppointments(r)
                }
                if ('msg' in r) {
                    if (r.msg === 'Token has expired') {
                        commonProps.handleExpiredTokenMessage()
                    }

                    // handle bad response from server
                    // e.g. auth token expired -> tell the user to logout
                }
            }
            )
    }
        , []
    )

    return (
        <div className="w-3/4 m-auto my-24">
            <AppointmentList commonProps={commonProps} appointments={appointments} />
            <div id='unauthorized-message-container'
                className="text-center">

                {commonProps.user.id > 0 ? null : <h3>You are not logged in</h3>}
                {commonProps.user.tokenIsExpired
                    ?
                    <div>
                        <h3>Your session has expired</h3>
                        <button
                            className='button clickable'
                            onClick={() => commonProps.logout()}>Logout</button>
                    </div>
                    : null}

            </div>
        </div>
    );
}

export default Appointments;