import React, { useState } from 'react';
import { useFormik } from 'formik'
import "./LoginForm.css"

function LoginForm({ commonProps, login, logout }) {
    const [loggingIn, setLoggingIn] = useState(true)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [createdANewUser, setCreatedANewUser] = useState(false)

    const initialValues = { username: "", password: "" }

    // const login = (e) => {
    //     e.preventDefault();
    //     // Add your login logic here (e.g., API call, authentication, etc.)
    //     console.log('Logging in with:', email, password);
    // };

    const formikLogin = useFormik({
        initialValues: initialValues,
        onSubmit: (values) => {
            fetch(`${commonProps.serverURL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            })
                .then(r => r.json())
                .then(r => {
                    console.log('Success:', r);
                    login(r)
                    formikLogin.resetForm();
                })
        }
    })

    const formikSignUp = useFormik({
        initialValues: initialValues,
        onSubmit: (values) => {
            fetch(`${commonProps.serverURL}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            })
                .then(r => r.json())
                .then(r => {
                    console.log('Success:', r);
                    formikSignUp.resetForm();
                    setCreatedANewUser(true)
                })
        }
    })

    const loginForm = <div>

        <form onSubmit={formikLogin.handleSubmit}>
            <div className="form-line">

                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    name="username"
                    onChange={formikLogin.handleChange}
                    value={formikLogin.values.username}
                />
            </div>
            <br></br>
            <div className="form-line">

                <label htmlFor="password">Password:</label>
                <input
                    type="text"
                    name="password"
                    onChange={formikLogin.handleChange}
                    value={formikLogin.values.password}
                />
            </div>
            <br></br>
            {/* <label htmlFor="email">Email (not required):</label>
        <input
            type="text"
            name="email"
            onChange={formikLogin.handleChange}
            value={formikLogin.values.email}
        />
        <br></br> */}
            <div >

                <input className='submit button clickable' type="submit" value="Login" />
            </div>
        </form>
    </div>

    const displayLoginForm = commonProps.user.id > 0 ? <p>You are logged in</p> : loginForm

    const signUpSuccessMessage =
        createdANewUser
            ?
            <p id='signup-success-message'>Successfully created new user. You may login.</p>
            :
            null

    const signUpForm = <div>
        <form onSubmit={formikSignUp.handleSubmit}>
            <div className="form-line">

                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    name="username"
                    onChange={formikSignUp.handleChange}
                    value={formikSignUp.values.username}
                />
            </div>
            <br></br>
            <div className="form-line">

                <label htmlFor="password">Password:</label>
                <input
                    type="text"
                    name="password"
                    onChange={formikSignUp.handleChange}
                    value={formikSignUp.values.password}
                />
            </div>
            <br></br>
            <div className="form-line">

                <label htmlFor="email">Email:</label>
                <input
                    type="text"
                    name="email"
                    onChange={formikSignUp.handleChange}
                    value={formikSignUp.values.email}
                />
            </div>
            <br></br>
            {signUpSuccessMessage}
            <div >

                <input className='submit button clickable' type="submit" value="Sign up" />
            </div>
        </form>
    </div>



    return (
        <div>
            <div id='login-form-top-part'>
                {loggingIn
                    ?
                    <div className="login-or-sign-up-selection">
                        <div className="inactive clickable">
                            <p onClick={(e) => setLoggingIn(false)}>Sign up</p>
                        </div>
                        <div>
                            <p >Login</p>
                        </div>
                    </div>
                    :
                    <div className="login-or-sign-up-selection">
                        <div>
                            <p >Sign up</p>
                        </div>
                        <div className="inactive clickable">
                            <p onClick={(e) => setLoggingIn(true)}>Login</p>
                        </div>
                    </div>
                }
            </div>
            <div id="login-form">
                {loggingIn ? displayLoginForm : signUpForm}
            </div>
        </div>

    );
}

export default LoginForm;
