import React, { useState, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css';
// import Component from './Component'
import Home from './Home'
import About from './About'
import Header from './Header'

function App() {

  const blankHomes = [
    {
      "id": 0,
      "address": ""
    }]

  const blankPeople = [
    {
      "id": 0,
      "name": "",
      "home_id": 0
    }]


  // When the page loads, get the database and put it in a state
  const [homes, setHomes] = useState(blankHomes)
  const [people, setPeople] = useState(blankPeople)
  const loadData = () => {
    fetch('http://localhost:5555/homes')
      .then(res => res.json())
      .then(data => {
        setHomes(data)
      })
    fetch('http://localhost:5555/people')
      .then(res => res.json())
      .then(data => {
        setPeople(data)
      })
  }
  useEffect(() => {
    loadData()
  }, [])

  // Configure our Router
  const router = createBrowserRouter([
    {
      path: "/",
      // Props to Home get passed here
      element: <Home homes={homes} people={people} />
    },
    {
      path: "/about",
      // Props to About get passed here
      element: <About />
    }
  ]);


  return (
    <div className="App">
      <Header />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;