import React, { useState } from "react";
import Appointment from "./Appointment.js"
import "./AppointmentList.css"

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
    const [hideSearch, setHideSearch] = useState(true)


    // The search input values are not stored in a react state. If they were, this component would rerender upon every change of the input values, and the array of appointments would be filtered and sorted every time. Instead, the user must press a button to filter appointments. 
    const appointmentCards = appointments.filter((a) => {
        return (
            a['patient']['name'].toUpperCase().includes((search['patientName']).toUpperCase()) &&
            a['patient']['dob'].includes(search['patientDOB']) &&
            a['appointment_datetime'].includes(search['appointment_datetime']) &&
            a['provider']['name'].toUpperCase().includes((search['providerName']).toUpperCase()) &&
            a['location'].toUpperCase().includes((search['location']).toUpperCase()) &&
            a['status'].toUpperCase().includes((search['status']).toUpperCase())
        )
    })
        .map((appointment) => {
            // The patient and provider objects are nested in the appointment object. To simplify the logic of the sort function, the appointment object is mapped to a nestless object before sorting. 
            let normalizedAppointment = {}
            normalizedAppointment['patientName'] = appointment['patient']['name']
            normalizedAppointment['patientDOB'] = appointment['patient']['dob']
            normalizedAppointment['appointment_datetime'] = appointment['appointment_datetime']
            normalizedAppointment['providerName'] = appointment['provider']['name']
            normalizedAppointment['location'] = appointment['location']
            normalizedAppointment['status'] = appointment['status']
            normalizedAppointment['id'] = appointment['id']
            return normalizedAppointment
        })
        .sort((a, b) => {
            if (((typeof a[sort]) == "string") && ((typeof b[sort]) == "string")) {
                if (a[sort].toUpperCase() < b[sort].toUpperCase()) {
                    return -1
                } else {
                    return 1
                }
            } else {
                return (a[sort] - b[sort])
            }
        })
        .map(a => {
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
        <div id="appointment-list" className="m-auto">
            <h3 className="m-16">Table of Appointments</h3>
            <form id="filter-appointments-form" className="bg-white" onSubmit={handleSearchSubmit}>
                <button className="button" onClick={() => setHideSearch(!hideSearch)}>{hideSearch ? "Show search criteria" : "Hide search criteria"}</button>
                <div className={hideSearch ? 'hidden' : ''}>
                    <div className="form-line flex">

                        <label>Patient name:</label>
                        <input name='patientName'></input>
                    </div>
                    <div className="form-line flex">
                        <label>Patient DOB:</label>
                        <input name='patientDOB'></input>
                    </div>
                    <div className="form-line flex">
                        <label>Appointment datetime:</label>
                        <input name='appointment_datetime'></input>
                    </div>
                    <div className="form-line flex">
                        <label>Provider:</label>
                        <input name='providerName'></input>
                    </div>
                    <div className="form-line flex">
                        <label>Location:</label>
                        <input name='location'></input>
                    </div>
                    <div className="form-line flex">
                        <label>Status:</label>
                        <input name='status'></input>
                    </div>
                    <input type='submit' className='clickable button' value='Apply search criteria'></input>
                </div>

                <p>Found {appointmentCards.length} matching results</p>
            </form>

            <p className="text-center">Click on any column header to sort the table by that column</p>
            <div className='block w-full overflow-x-auto'>

                <table className="m-auto">
                    <tr>
                        <th className='clickable text-white bg-blue-500 border-black' onClick={() => handleSort('patientName')}>Patient Name</th>
                        <th className='clickable text-white bg-blue-500 border-black' onClick={() => handleSort('patientDOB')}>Patient DOB</th>
                        <th className='clickable text-white bg-blue-500 border-black' onClick={() => handleSort('appointment_datetime')}>Appointment Datetime</th>
                        <th className='clickable text-white bg-blue-500 border-black' onClick={() => handleSort('providerName')}>Provider Name</th>
                        <th className='clickable text-white bg-blue-500 border-black' onClick={() => handleSort('location')}>Appointment Location</th>
                        <th className='clickable text-white bg-blue-500 border-black' onClick={() => handleSort('status')}>Status</th>
                    </tr>
                    {appointmentCards}
                    { }
                </table>
            </div>
        </div>
    );
}

export default AppointmentList;