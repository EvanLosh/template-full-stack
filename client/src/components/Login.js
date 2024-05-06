import React, { useEffect, useState } from "react";
import LoginForm from "./LoginForm.js"

function Login({ commonProps }) {



    return (
        <div id="Login">
            <h1>Login.js</h1>

            <LoginForm commonProps={commonProps} />

        </div>
    );
}

export default Login;