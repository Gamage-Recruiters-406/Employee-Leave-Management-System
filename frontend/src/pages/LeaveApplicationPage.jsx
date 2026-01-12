import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Header from '../components/Header';
import LeaveApplicationForm from '../components/LeaveApplicationForm';
import LeaveHistory from '../components/LeaveHistory';
import api from '../services/api';

const ITEMS_PER_PAGE = 5;

const LeaveManagementApp = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    reason: ''
  });
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState('User');

  // Fetch leave requests and user data on component mount
  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      setUserName(user.name || 'User');
    }

    fetchLeaveRequests();
  }, []);

  const fetchLeaveRequests = async () => {
    try {
      setIsLoading(true);
      const data = await api.getMyLeaves();

      // Format the data to match the UI expectations
      const formattedLeaves = data.map(leave => ({
        id: leave._id,
        startDate: new Date(leave.startDate).toISOString().split('T')[0],
        endDate: new Date(leave.endDate).toISOString().split('T')[0],
        totalDays: leave.totalDays.toString().padStart(2, '0'),
        reason: leave.reason,
        status: leave.status
      }));

      setLeaveRequests(formattedLeaves);
    } catch (error) {
      // If no leaves found or not authenticated, just keep empty array
      console.error('Error fetching leaves:', error);
      if (error.message !== 'No leaves found') {
        Swal.fire({
          icon: 'info',
          title: 'Note',
          text: 'Please log in to view your leave requests',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitLeave = async () => {
    if (!formData.startDate || !formData.endDate) {
      Swal.fire({
        icon: 'error',
        title: 'Missing Dates',
        text: 'Please select start and end dates',
        confirmButtonColor: '#d33'
      });
      return;
    }

    if (!formData.reason.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Missing Reason',
        text: 'Please provide a reason for your leave',
        confirmButtonColor: '#d33'
      });
      return;
    }

    try {
      setIsLoading(true);

      const leaveData = {
        startDate: formData.startDate,
        endDate: formData.endDate,
        reason: formData.reason
      };

      await api.createLeave(leaveData);

      // Refresh the leave requests list
      await fetchLeaveRequests();

      setCurrentPage(1);
      setFormData({ startDate: '', endDate: '', reason: '' });

      Swal.fire({
        icon: 'success',
        title: 'Leave Submitted',
        text: 'Your leave request has been submitted successfully!',
        timer: 2000,
        showConfirmButton: false
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Submission Failed',
        text: error.message || 'Failed to submit leave request. Please ensure you are logged in.',
        confirmButtonColor: '#d33'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({ startDate: '', endDate: '', reason: '' });
  };

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Clear authentication data
          await api.logout();

          // Clear leave requests state
          setLeaveRequests([]);
          setFormData({ startDate: '', endDate: '', reason: '' });

          // Show success message
          Swal.fire({
            icon: 'success',
            title: 'Logged Out',
            text: 'You have been successfully logged out!',
            timer: 1500,
            showConfirmButton: false
          });

          // Redirect to login or home page after a short delay
          setTimeout(() => {
            window.location.href = '/';
          }, 1500);
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Logout Failed',
            text: 'An error occurred during logout',
            confirmButtonColor: '#d33'
          });
        }
      }
    });
  };

  // Pagination
  const totalPages = Math.ceil(leaveRequests.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentLeaves = leaveRequests.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-gray-50 text-xl px-10 py-6">
      <Header userName={userName} onLogout={handleLogout} />

      <LeaveApplicationForm
        formData={formData}
        onFormChange={setFormData}
        onSubmit={handleSubmitLeave}
        onCancel={handleCancel}
        isLoading={isLoading}
      />

      {isLoading ? (
        <div className="text-center py-10">
          <p className="text-gray-500">Loading leave history...</p>
        </div>
      ) : (
        <LeaveHistory
          leaves={currentLeaves}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default LeaveManagementApp;
