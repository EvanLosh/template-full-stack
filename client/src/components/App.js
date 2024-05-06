import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home";
import "./App.css";
import Header from "./Header";
import Login from "./Login";
import About from "./About";
import AppointmentList from "./AppointmentList";

const serverURL = "http://127.0.0.1:5000";
const websiteURL = "http://127.0.0.1:3000"
const blankUser = {
  username: "",
  id: 0,
}


function App() {

  function getAccessToken() {
    const authJWTString = localStorage.getItem('access_token')
    if (authJWTString) {
      return authJWTString
    }
    else {
      return null
    }
  }

  function setAccessToken(x) {
    localStorage.setItem('access_token', x)
  }

  function getLocalUser() {
    const localUserString = localStorage.getItem('localUser');
    if (localUserString) {
      const localUser = JSON.parse(localUserString);
      return localUser
    }
    else {
      return blankUser
    }
  }

  const [user, setUser] = useState(getLocalUser)


  function setLocalUser(user) {
    const localUser = {
      username: user.username,
      id: user.id
    }
    localStorage.setItem('localUser', JSON.stringify(localUser))
  }

  function login(user) {
    // user is a object with credentials
    // Send the credentials to the server for verification
    fetch(commonProps.serverURL + '/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(r => r.json())
      .then(data => {
        if ('access_token' in data) {
          // user's credentials waere verified by the server
          // save user in localStorage, save access token in localStorage, and set user state
          setLocalUser(data.user)
          setAccessToken(data.access_token)
          setUser(data.user)
        }

        else {
          console.log('login failed')
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }


  function logout() {
    setLocalUser(blankUser)
    setUser(getLocalUser())
    window.location.reload()
  }

  // When App.js mounts, retrieve the user from local storage 
  // If a user is retrieved, set the user state
  useEffect(() => {
    const localUser = getLocalUser()
    console.log('Local user is ')
    console.log(localUser)
    if (localUser?.id > 0) {
      setUser(localUser)
    }
  }, [])

  // Common properties to be passed down to lower components
  const commonProps = {
    serverURL: serverURL,
    websiteURL: websiteURL,
    user: user,
  }

  // Define the React router
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home commonProps={commonProps} />,
      children: [],
    },
    {
      path: "/login",
      element: <Login commonProps={commonProps} login={login} logout={logout} />,
      children: [],
    },
    {
      path: "/about",
      element: <About commonProps={commonProps} />,
      children: [],
    },

  ]);


  return (
    <div id="app">
      <h1>App.js</h1>
      <Header commonProps={commonProps} />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;