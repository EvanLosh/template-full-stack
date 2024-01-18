import React, { useState, useEffect } from 'react';
// import Component from ./Component

function Header() {
    return (
        <div class="header">
            <a class="navlink" id="title" href="/">New Project</a>
            <a class="navlink" href="/about">About</a>
            <a class="navlink" href="http://127.0.0.1:5555/homes">Homes API endpoint</a>
        </div>
    );
}

export default Header;