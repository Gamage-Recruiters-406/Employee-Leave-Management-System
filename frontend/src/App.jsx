import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login"; // Adjust path if you put them in components
import Register from "./pages/Register"; // Adjust path if you put them in components
import LeaveApplicationPage from './pages/LeaveApplicationPage'
import AdminDashboard from './pages/AdminDashboard'

function App() {
  return (
      <Routes>
        {/* Default route redirects to login */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/leave" element={<LeaveApplicationPage />} />
      </Routes>
  );
}

export default App;
