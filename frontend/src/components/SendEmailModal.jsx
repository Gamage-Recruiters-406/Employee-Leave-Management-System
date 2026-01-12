import React, { useState } from "react";
import { X, Mail, Send } from "react-feather";
import api from "../services/api";

const SendEmailModal = ({ request, onClose, onEmailSent, isApproved }) => {
  const [subject, setSubject] = useState(
    isApproved ? `Leave Approved - ${request.employeeId}` : `Leave Rejected - ${request.employeeId}`
  );
  const [message, setMessage] = useState(
    isApproved
      ? `Dear ${request.employeeName},\n\nYour leave request from ${request.startDate} to ${request.endDate} has been approved.\n\nBest regards,\nHR Department`
      : `Dear ${request.employeeName},\n\nUnfortunately, your leave request from ${request.startDate} to ${request.endDate} has been rejected.\n\nBest regards,\nHR Department`
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSendEmail = async () => {
    if (!subject.trim() || !message.trim()) {
      setError("Subject and message cannot be empty");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const result = await api.sendEmailWithMessage(
        request.employeeEmail,
        subject,
        message,
        isApproved ? "Approved" : "Rejected"
      );

      if (result.success) {
        onEmailSent(true);
        onClose();
      } else {
        setError("Failed to send email. Please try again.");
      }
    } catch (err) {
      console.error("Error sending email:", err);
      setError("An error occurred while sending the email.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-blue-700 text-white px-6 py-4 rounded-t-lg flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Mail className="w-6 h-6" />
            <h2 className="text-xl font-semibold">Send Email to Employee</h2>
          </div>
          <button
            onClick={onClose}
            className="hover:bg-blue-600 p-1 rounded transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Employee Info */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-3">Employee Information</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="font-semibold text-gray-600">Employee ID: </span>
                <span className="text-gray-800">{request.employeeId}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-600">Name: </span>
                <span className="text-gray-800">{request.employeeName}</span>
              </div>
              <div className="col-span-2">
                <span className="font-semibold text-gray-600">Email: </span>
                <span className="text-gray-800">{request.employeeEmail}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-600">Start Date: </span>
                <span className="text-gray-800">{request.startDate}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-600">End Date: </span>
                <span className="text-gray-800">{request.endDate}</span>
              </div>
            </div>
          </div>

          {/* Status Indicator */}
          <div>
            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
              isApproved ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              Status: {isApproved ? 'Approved' : 'Rejected'}
            </span>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Subject Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Email Subject
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter email subject"
              disabled={isSubmitting}
            />
          </div>

          {/* Message Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Email Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows="8"
              placeholder="Enter your email message"
              disabled={isSubmitting}
            />
            <p className="text-xs text-gray-500 mt-2">
              {message.length} characters
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 px-6 py-4 border-t border-gray-200 rounded-b-lg flex gap-3">
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={handleSendEmail}
            disabled={isSubmitting}
            className="flex-1 bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            {isSubmitting ? 'Sending...' : 'Send Email'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendEmailModal;
