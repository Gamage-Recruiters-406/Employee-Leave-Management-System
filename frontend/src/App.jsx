import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LeaveApplicationPage from './pages/LeaveApplicationPage'
import AdminDashboard from './pages/AdminDashboard'


function App() {
  return (
    <>
        <Routes>

          {/* Public route - Employee Leave Application */}
          <Route path="/" element={<LeaveApplicationPage />} />

          {/* Admin protected route */}
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
    </> 
  )
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login"; // Adjust path if you put them in components
import Register from "./pages/Register"; // Adjust path if you put them in components

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route redirects to login */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
