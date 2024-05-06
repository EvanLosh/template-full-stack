import React, { useState } from 'react';
import { useFormik } from 'formik'

function LoginForm({ commonProps }) {
    const [loggingIn, setLoggingIn] = useState(true)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [createdANewUser, setCreatedANewUser] = useState(false)

    const initialValues = { username: "", password: "" }

    // const handleLogin = (e) => {
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
            <label htmlFor="username">Username:</label>
            <input
                type="text"
                name="username"
                onChange={formikLogin.handleChange}
                value={formikLogin.values.username}
            />
            <br></br>
            <label htmlFor="password">Password:</label>
            <input
                type="text"
                name="password"
                onChange={formikLogin.handleChange}
                value={formikLogin.values.password}
            />
            <br></br>
            {/* <label htmlFor="email">Email (not required):</label>
        <input
            type="text"
            name="email"
            onChange={formikLogin.handleChange}
            value={formikLogin.values.email}
        />
        <br></br> */}
            <input className='submit button' type="submit" value="Login" />
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
            <label htmlFor="username">Username:</label>
            <input
                type="text"
                name="username"
                onChange={formikSignUp.handleChange}
                value={formikSignUp.values.username}
            />
            <br></br>
            <label htmlFor="password">Password:</label>
            <input
                type="text"
                name="password"
                onChange={formikSignUp.handleChange}
                value={formikSignUp.values.password}
            />
            <br></br>
            <label htmlFor="email">Email:</label>
            <input
                type="text"
                name="email"
                onChange={formikSignUp.handleChange}
                value={formikSignUp.values.email}
            />
            <br></br>
            {signUpSuccessMessage}
            <input className='submit button' type="submit" value="Sign up" />
        </form>
    </div>



    return (<div>
        <p>LoginForm.js</p>
        <p onClick={(e) => setLoggingIn(true)}>Login</p>
        <p onClick={(e) => setLoggingIn(false)}>Sign up</p>
        {loggingIn ? displayLoginForm : signUpForm}

    </div>

    );
}

export default LoginForm;
