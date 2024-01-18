import React, { useState, useEffect } from 'react';
// import Component from ./Component

function HomeObject({ home, people }) {

    let peopleNodes = people.filter((person) => { return person.home_id === home.id }).map((person) => {
        return <p class="preson-name">{person.name}</p>
    })

    return (
        <div class="homeObject">
            <h3 class="address">{home.address}</h3>
            {peopleNodes}
        </div>
    );
}

export default HomeObject;