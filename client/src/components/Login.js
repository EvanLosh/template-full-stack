import React, { useEffect, useState } from "react";
import LoginForm from "./LoginForm.js"

function Login({ commonProps, handleLogin, handleLogout }) {



    return (
        <div id="Login">
            <h1>Login.js</h1>

            <LoginForm commonProps={commonProps} handleLogin={handleLogin} handleLogout={handleLogout}/>

        </div>
    );
}

export default Login;