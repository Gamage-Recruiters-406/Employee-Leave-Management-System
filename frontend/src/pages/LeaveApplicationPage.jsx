import React, { useState } from 'react';
import Swal from 'sweetalert2';
import Header from '../components/Header';
import LeaveApplicationForm from '../components/LeaveApplicationForm';
import LeaveHistory from '../components/LeaveHistory';

const ITEMS_PER_PAGE = 5;

const LeaveManagementApp = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    reason: ''
  });

  const [leaveRequests, setLeaveRequests] = useState([
    { id: 1, startDate: '2025-09-01', endDate: '2025-09-03', totalDays: '03', reason: 'Vacation', status: 'Approved' },
    { id: 2, startDate: '2025-10-01', endDate: '2025-10-10', totalDays: '09', reason: 'Health issues', status: 'Approved' },
    { id: 3, startDate: '2025-10-10', endDate: '2025-10-20', totalDays: '10', reason: 'Personal matters', status: 'Approved' },
    { id: 4, startDate: '2025-11-01', endDate: '2025-11-12', totalDays: '11', reason: 'Family time', status: 'Rejected' },
    { id: 5, startDate: '2025-11-21', endDate: '2025-12-01', totalDays: '10', reason: 'Personal work', status: 'Pending' }
  ]);

  const calculateDays = (start, end) => {
    const diff = Math.abs(new Date(end) - new Date(start));
    return (Math.ceil(diff / (1000 * 60 * 60 * 24)) + 1)
      .toString()
      .padStart(2, '0');
  };

  const handleSubmitLeave = () => {
    if (!formData.startDate || !formData.endDate) {
      Swal.fire({
        icon: 'error',
        title: 'Missing Dates',
        text: 'Please select start and end dates',
        confirmButtonColor: '#d33'
      });
      return;
    }

    const newLeave = {
      id: Date.now(),
      startDate: formData.startDate,
      endDate: formData.endDate,
      totalDays: calculateDays(formData.startDate, formData.endDate),
      reason: formData.reason || 'No reason provided',
      status: 'Pending'
    };

    setLeaveRequests([newLeave, ...leaveRequests]);
    setCurrentPage(1);
    setFormData({ startDate: '', endDate: '', reason: '' });

    Swal.fire({
      icon: 'success',
      title: 'Leave Submitted',
      text: 'Your leave request has been submitted successfully!',
      timer: 2000,
      showConfirmButton: false
    });
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
    }).then((result) => {
      if (result.isConfirmed) {
        // Add logout logic here
        console.log('User logged out');
      }
    });
  };

  // Pagination
  const totalPages = Math.ceil(leaveRequests.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentLeaves = leaveRequests.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-gray-50 text-xl px-10 py-6">
      <Header userName="John Doe" onLogout={handleLogout} />
      
      <LeaveApplicationForm
        formData={formData}
        onFormChange={setFormData}
        onSubmit={handleSubmitLeave}
        onCancel={handleCancel}
      />

      <LeaveHistory
        leaves={currentLeaves}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default LeaveManagementApp;
