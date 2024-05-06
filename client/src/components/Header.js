import React, { useEffect, useState } from "react";
import "./Header.css"


function Header({ commonProps, handleLogout }) {



    return <div id="header">
        <h1>Header.js</h1>
        <a href='/'><p>Home</p></a>
        <a href='/about'><p>About</p></a>
        {
            commonProps.user.id > 0 ?
                <p onClick={handleLogout}>Logout</p>
                :
                <a href='/login'><p>Login</p></a>
        }
    </div>;
}

export default Header;