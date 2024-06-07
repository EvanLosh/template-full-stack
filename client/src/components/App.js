import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home";
import "./App.css";
import Header from "./Header";
import Login from "./Login";
import About from "./About";
import Appointments from "./Appointments";

const serverURL = "http://127.0.0.1:5000";
const websiteURL = "http://127.0.0.1:3000"
const blankUser = {
  username: "",
  id: 0,
}


function App() {

  const getAccessToken = () => {
    const authJWTString = localStorage.getItem('access_token')
    return authJWTString
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

  function login(data) {
    setLocalUser(data.user)
    setAccessToken(data.access_token)
    setUser(data.user)
  }

  function logout() {
    setLocalUser(blankUser)
    setUser(getLocalUser())
    localStorage.removeItem('access_token')
    window.location.reload()
  }

  function handleUnauthorizedResponse() {
    //this function should be called whenever the user is logged in and gets unauthorized response (401) from the server

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
    getAccessToken: getAccessToken,
  }

  // Define the React router
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home commonProps={commonProps} />,
      children: [],
    },
    {
      path: "/appointments",
      element: <Appointments commonProps={commonProps} />,
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
      <Header commonProps={commonProps} logout={logout} />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;