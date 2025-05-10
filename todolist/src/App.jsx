import React from "react";
import "./App.css";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import { BrowserRouter, Router, Routes, Route } from "react-router-dom";
import { NotesProvider } from "./components/notes/NotesContext";
import { useResponsiveFontSize } from "./utils/useResponsiveFontSize";

function App() {
   useResponsiveFontSize();
  return (
    // BrowserRouter is used to wrap the entire application
    // It enables the use of React Router for navigation
    // It allows us to define routes and navigate between different components
    // Routes is used to define the different routes in the application
    // Route is used to define a single route
    // The path prop specifies the URL path for the route
    // The element prop specifies the component to render when the route is matched
    <NotesProvider>
      <BrowserRouter basename="/Mern_todo">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </NotesProvider>
  );
}

export default App;
