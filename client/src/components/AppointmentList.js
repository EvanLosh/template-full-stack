import React, { useEffect, useState } from "react";
import Appointment from "./Appointment.js"

function AppointmentList({ commonProps, appointments }) {

    const [sort, setSort] = useState(['appointment_datetime'])
    const [search, setSearch] = useState({
        patientName: '',
        patientDOB: '',
        appointment_datetime: '',
        providerName: '',
        location: '',
        status: ''
    })

    const appointmentCards = appointments.filter((a) => {
        return (
            a['patient']['name'].includes(search['patientName']) &&
            a['patient']['dob'].includes(search['patientDOB']) &&
            a['appointment_datetime'].includes(search['appointment_datetime']) &&
            a['provider']['name'].includes(search['providerName']) &&
            a['location'].includes(search['location']) &&
            a['status'].includes(search['status'])
        )
    }).map((appointment) => {
        let normalizedAppointment = {}
        normalizedAppointment['patientName'] = appointment['patient']['name']
        normalizedAppointment['patientDOB'] = appointment['patient']['dob']
        normalizedAppointment['appointment_datetime'] = appointment['appointment_datetime']
        normalizedAppointment['providerName'] = appointment['provider']['name']
        normalizedAppointment['location'] = appointment['location']
        normalizedAppointment['status'] = appointment['status']
        normalizedAppointment['id'] = appointment['id']
        return normalizedAppointment
    }).sort((a, b) => {
        if (((typeof a[sort]) == "string") && ((typeof b[sort]) == "string")) {
            if (a[sort].toUpperCase() < b[sort].toUpperCase()) {
                return -1
            } else {
                return 1
            }
        } else {
            return (a[sort] - b[sort])
        }
    }).map(a => {
        return <Appointment key={a.id} appointment={a} commonProps={commonProps} />
    })

    function handleSort(field) {
        setSort(field)
    }

    function handleSearchSubmit(e) {
        e.preventDefault()
        // set search to the search input
        setSearch(
            {
                patientName: e.target.patientName.value,
                patientDOB: e.target.patientDOB.value,
                appointment_datetime: e.target.appointment_datetime.value,
                providerName: e.target.providerName.value,
                location: e.target.location.value,
                status: e.target.status.value
            }
        )
    }

    return (
        <div id="appointment-list">
            <h1>Appoints</h1>
            <p>Search criteria</p>
            <form onSubmit={handleSearchSubmit}>
                <label>Patient name</label>
                <input name='patientName'></input>
                <label>Patient DOB</label>
                <input name='patientDOB'></input>
                <label>Appointment datetime</label>
                <input name='appointment_datetime'></input>
                <label>Provider</label>
                <input name='providerName'></input>
                <label>Location</label>
                <input name='location'></input>
                <label>Status</label>
                <input name='status'></input>
                <input type='submit' className='clickable' value='Apply search criteria'></input>
            </form>


            <table>
                <tr>
                    <th className='clickable' onClick={() => handleSort('patient.name')}>Patient Name</th>
                    <th className='clickable' onClick={() => handleSort('patient.dob')}>Patient DOB</th>
                    <th className='clickable' onClick={() => handleSort('appointment_datetime')}>Datetime</th>
                    <th className='clickable' onClick={() => handleSort('provider.name')}>Provider</th>
                    <th className='clickable' onClick={() => handleSort('location')}>Location</th>
                    <th className='clickable' onClick={() => handleSort('status')}>Status</th>
                </tr>
                {appointmentCards}

            </table>
        </div>
    );
}

export default AppointmentList;