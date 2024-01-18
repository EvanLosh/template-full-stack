import React, { useState, useEffect } from 'react';
// import Component from ./Component
import HomeObject from './HomeObject'
import ManagePerson from './ManagePerson';

function Home({ homes, people }) {
    let homeItems = homes.map((home) => { return <HomeObject home={home} people={people} /> })

    return (
        <div className="Home">
            <h1>Homes and their residents</h1>
            {homeItems}
            <ManagePerson homes={homes} people={people} />
        </div>
    );
}

export default Home;