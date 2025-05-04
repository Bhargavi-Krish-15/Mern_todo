
import React from 'react'
import './App.css'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import { BrowserRouter , Router, Routes, Route } from 'react-router-dom';

function App() {

  return (
    // BrowserRouter is used to wrap the entire application
    // It enables the use of React Router for navigation
    // It allows us to define routes and navigate between different components
    // Routes is used to define the different routes in the application
    // Route is used to define a single route
    // The path prop specifies the URL path for the route
    // The element prop specifies the component to render when the route is matched
    <BrowserRouter>
      <div className='App'>
        {/* <Home /> */}
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
        </Routes>  
      </div>
    </BrowserRouter>
  )
}

export default App
