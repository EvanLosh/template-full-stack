import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik'
import "./LoginForm.css"

function LoginForm({ commonProps, login }) {
    const [loggingIn, setLoggingIn] = useState(true)
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    // const [createdANewUser, setCreatedANewUser] = useState(false)
    // const classNameFormLine = "flex"
    const initialValues = { username: "", password: "" }
    const [responseMessage, setResponseMessage] = useState('')

    useEffect(() => setResponseMessage(''), [loggingIn])

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
                    if (r.message && r.message === 'Username or password is incorrect') {
                        setResponseMessage(r.message)
                    }
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
                    if (r.message && r.message === 'That username is not available') {
                        setResponseMessage(r.message)
                    }
                    else {
                        setResponseMessage('Successfully created new user. You may log in.')
                    }
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
                    type="password"
                    name="password"
                    onChange={formikLogin.handleChange}
                    value={formikLogin.values.password}
                />
            </div>
            <br></br>

            <div >
                <p className='text-red-600' id='login-sign-up-failure-message'>
                    {responseMessage}
                </p>
                <input className='submit button clickable' type="submit" value="Login" />
            </div>
        </form>
    </div>

    const displayLoginForm = commonProps.user.id > 0
        ?
        <div className="">
            <p className="m-auto text-center mt-12">You are logged in as {commonProps.user.username}</p>
            <div className="m-auto flex align-middle">
                <button className="clickable button m-auto my-12" onClick={commonProps.logout}>Logout</button>
            </div>
        </div>
        :
        loginForm

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
                    type="password"
                    name="password"
                    onChange={formikSignUp.handleChange}
                    value={formikSignUp.values.password}
                />
            </div>
            {/* <br></br> */}
            {/* <div className="form-line">

                <label htmlFor="email">Email:</label>
                <input
                    type="text"
                    name="email"
                    onChange={formikSignUp.handleChange}
                    value={formikSignUp.values.email}
                />
            </div> */}
            <br></br>
            <div >

                <p className='text-red-600' id='login-sign-up-failure-message'>
                    {responseMessage}
                </p>

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
                        <div className="inactive clickable" onClick={(e) => setLoggingIn(false)}>
                            <p >Sign up</p>
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
                        <div className="inactive clickable" onClick={(e) => setLoggingIn(true)}>
                            <p >Login</p>
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
