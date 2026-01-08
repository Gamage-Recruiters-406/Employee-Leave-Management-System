import { useEffect } from "react";
import Header from "../components/Header";
import StatsCard from "../components/StatsCard";
import { Clock, Check, X } from "react-feather";
import LeaveRequestModal from "../components/LeaveRequestModal";
import SendEmailModal from "../components/SendEmailModal";
import AlertNotification from "../components/AlertNotification";
import { useState } from "react";
import api from "../services/api";

const AdminDashboard = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [modalAction, setModalAction] = useState(null);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    loadLeaveRequests();
  }, []);

  const loadLeaveRequests = async () => {
    setLoading(true);
    try {
      const data = await api.getLeaveRequests();
      setLeaveRequests(data);
    } catch (error) {
      console.error('Error loading leave requests:', error);
      showAlert('error', 'Failed to load leave requests. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    alert('Logout functionality - Connect to your authentication system');
  };

  const openModal = (request, action) => {
    setSelectedRequest(request);
    setModalAction(action);
    setShowEmailModal(true);
  };

  const closeModal = () => {
    setSelectedRequest(null);
    setModalAction(null);
    setShowEmailModal(false);
  };

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 5000);
  };

  const handleApprove = async (id) => {
    try {
      const request = leaveRequests.find(r => r.id === id);
      const result = await api.updateLeaveStatus(id, 'Approved');
      
      if (result.success) {
        setLeaveRequests(prev =>
          prev.map(req => req.id === id ? { ...req, status: 'Approved' } : req)
        );
        showAlert('success', 'Leave request approved and email sent successfully!');
        closeModal();
      }
    } catch (error) {
      console.error('Error approving leave:', error);
      showAlert('error', 'Failed to approve leave request. Please try again.');
    }
  };

  const handleReject = async (id) => {
    try {
      const request = leaveRequests.find(r => r.id === id);
      const result = await api.updateLeaveStatus(id, 'Rejected');
      
      if (result.success) {
        setLeaveRequests(prev =>
          prev.map(req => req.id === id ? { ...req, status: 'Rejected' } : req)
        );
        showAlert('success', 'Leave request rejected and email sent successfully!');
        closeModal();
      }
    } catch (error) {
      console.error('Error rejecting leave:', error);
      showAlert('error', 'Failed to reject leave request. Please try again.');
    }
  };

  const handleEmailSent = async () => {
    if (modalAction === 'approve') {
      await handleApprove(selectedRequest.id);
    } else if (modalAction === 'reject') {
      await handleReject(selectedRequest.id);
    }
  };

  const stats = {
    pending: leaveRequests.filter(r => r.status === 'Pending').length,
    approved: leaveRequests.filter(r => r.status === 'Approved').length,
    rejected: leaveRequests.filter(r => r.status === 'Rejected').length
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onLogout={handleLogout} />
      
      {/* Alert Notification */}
      {alert && (
        <AlertNotification
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard
            icon={<Clock className="w-6 h-6" />}
            label="Pending"
            count={stats.pending}
            color="yellow"
          />
          <StatsCard
            icon={<Check className="w-6 h-6" />}
            label="Approved"
            count={stats.approved}
            color="green"
          />
          <StatsCard
            icon={<X className="w-6 h-6" />}
            label="Rejected"
            count={stats.rejected}
            color="red"
          />
        </div>

        {/* Leave Requests Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">Leave Requests</h2>
            <p className="text-sm text-gray-500 mt-1">
              Review and manage employee leave applications
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Employee ID</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Start Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">End Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Total Days</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Reason</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {leaveRequests.map((request, index) => (
                  <tr
                    key={request.id}
                    className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                  >
                    <td className="px-6 py-4 text-sm text-gray-800">{request.employeeId}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{request.startDate}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{request.endDate}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{request.totalDays}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{request.reason}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          request.status === 'Approved'
                            ? 'text-green-700 bg-green-50'
                            : request.status === 'Rejected'
                            ? 'text-red-700 bg-red-50'
                            : 'text-orange-700 bg-orange-50'
                        }`}
                      >
                        {request.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {request.status === 'Pending' ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() => openModal(request, 'approve')}
                            className="p-2 bg-green-50 hover:bg-green-100 text-green-600 rounded-lg transition-colors"
                          >
                            <Check className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => openModal(request, 'reject')}
                            className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      ) : (
                        <button
                          className="p-2 bg-gray-50 text-gray-400 rounded-lg cursor-not-allowed"
                          disabled
                        >
                          <Check className="w-5 h-5" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Audit Log */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">Audit Log</h2>
            <p className="text-sm text-gray-500 mt-1">
              Complete history of all leave request reviews
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Employee ID</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Start Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">End Date</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {leaveRequests.map((request, index) => (
                  <tr
                    key={request.id}
                    className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                  >
                    <td className="px-6 py-4 text-sm text-gray-800">{request.employeeId}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{request.startDate}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{request.endDate}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          request.status === 'Approved'
                            ? 'text-green-700 bg-green-50'
                            : request.status === 'Rejected'
                            ? 'text-red-700 bg-red-50'
                            : 'text-orange-700 bg-orange-50'
                        }`}
                      >
                        {request.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modals */}
      {selectedRequest && modalAction && showEmailModal && (
        <SendEmailModal
          request={selectedRequest}
          onClose={closeModal}
          onEmailSent={handleEmailSent}
          isApproved={modalAction === 'approve'}
        />
      )}
    </div>
  );
};

export default AdminDashboard;