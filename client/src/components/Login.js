import React from "react";
import LoginForm from "./LoginForm.js"

function Login({ commonProps, login, logout }) {



    return (
        <div id="Login">

            <LoginForm commonProps={commonProps} login={login} logout={logout} />

        </div>
    );
}

export default Login;