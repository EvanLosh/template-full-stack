import React, { useState, useEffect } from 'react';
// import Component from ./Component

function HomeObject({ home, people }) {

    let peopleNodes = people.filter((person) => { return person.home_id === home.id }).map((person) => {
        return <p classname="preson-name">{person.name}</p>
    })

    return (
        <div className="HomeObject">
            <h3 classname="address">{home.address}</h3>
            {peopleNodes}
        </div>
    );
}

export default HomeObject;