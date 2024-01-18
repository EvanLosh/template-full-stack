import React, { useState, useEffect } from 'react';
// import Component from ./Component

function Header() {
    return (
        <div className="Header">
            <a classname="navlink" id="title" href="/">New Project</a>
            <a classname="navlink" href="/about">About</a>
            <a classname="navlink" href="http://127.0.0.1:5555/homes">Homes API endpoint</a>
        </div>
    );
}

export default Header;