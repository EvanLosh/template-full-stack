import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home";
import "./App.css";
import Header from "./Header";
import Footer from "./Footer";
import Login from "./Login";
import About from "./About";
import Appointments from "./Appointments";


const serverURL = "http://127.0.0.1:5000";
const websiteURL = "http://127.0.0.1:3000"
const blankUser = {
  username: "",
  id: 0,
  tokenIsExpired: false,
}

function App() {

  // JWT is stored in local storage
  const getAccessToken = () => {
    const authJWTString = localStorage.getItem('access_token')
    return authJWTString
  }

  function setAccessToken(x) {
    localStorage.setItem('access_token', x)
  }

  // user object is stored in local storage
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

  function setLocalUser(user) {
    localStorage.setItem('localUser', JSON.stringify({ ...user }))
  }

  const [user, setUser] = useState(getLocalUser)

  // call this function when a fetch request comes back with {msg: 'Token has expired'}
  function handleExpiredTokenMessage() {
    setUser((prev) => { return { ...prev, tokenIsExpired: true } })
  }

  function login(data) {
    setLocalUser(data.user)
    setAccessToken(data.access_token)
    setUser({ ...data.user, tokenIsExpired: false })
  }

  function logout() {
    localStorage.removeItem('access_token')
    setLocalUser(blankUser)
    setUser(getLocalUser())
    window.location.reload()
  }

  // When App.js mounts, retrieve user object from local storage 
  useEffect(() => {
    const localUser = getLocalUser()
    console.log('Local user is ')
    console.log(localUser)
    // If a user is retrieved, set the user state
    if (localUser?.id > 0) {
      setUser(localUser)
    }
  }, [])

  // Common properties to be passed down to lower components
  const commonProps = {
    serverURL: serverURL,
    websiteURL: websiteURL,
    user: user,
    logout: logout,
    getAccessToken: getAccessToken,
    handleExpiredTokenMessage: handleExpiredTokenMessage,
  }

  // Define the React router parameters
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home commonProps={commonProps} />,
      children: [],
    },
    {
      path: "/view-appointments",
      element: <Appointments commonProps={commonProps} />,
      children: [],
    },
    {
      path: "/login",
      element: <Login commonProps={commonProps} login={login} />,
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
      <div id="app-content" className="">
        <RouterProvider router={router} />
      </div>
      <Footer commonProps={commonProps} />
    </div>
  );
}

export default App;