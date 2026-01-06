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
}

export default App;
