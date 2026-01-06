import { mockLeaveRequests } from '../data/mockData';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = {
  // Get all leave requests
  async getLeaveRequests() {
    try {
      // FOR PRODUCTION - Uncomment this:
      // const response = await fetch(`${API_BASE_URL}/leave-requests`);
      // return await response.json();
      
      // FOR DEVELOPMENT - Using mock data:
      return new Promise((resolve) => {
        setTimeout(() => resolve([...mockLeaveRequests]), 500);
      });
    } catch (error) {
      console.error('Error fetching leave requests:', error);
      throw error;
    }
  },

  // Update leave request status
  async updateLeaveStatus(id, status) {
    try {
      // FOR PRODUCTION:
      // const response = await fetch(`${API_BASE_URL}/leave-requests/${id}`, {
      //   method: 'PATCH',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ status })
      // });
      // return await response.json();

      // FOR DEVELOPMENT:
      return new Promise((resolve) => {
        setTimeout(() => resolve({ success: true, status }), 500);
      });
    } catch (error) {
      console.error('Error updating leave status:', error);
      throw error;
    }
  },

  // Send email to employee
  async sendEmail(email, status) {
    try {
      // FOR PRODUCTION:
      // const response = await fetch(`${API_BASE_URL}/send-email`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, status })
      // });
      // return await response.json();

      // FOR DEVELOPMENT:
      return new Promise((resolve) => {
        setTimeout(() => resolve({ success: true }), 500);
      });
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  },

  // Send custom email to employee
  async sendEmailWithMessage(email, subject, message, status) {
    try {
      // FOR PRODUCTION:
      // const response = await fetch(`${API_BASE_URL}/send-email`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, subject, message, status })
      // });
      // return await response.json();

      // FOR DEVELOPMENT:
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log('Email sent:', { email, subject, message, status });
          resolve({ success: true, message: 'Email sent successfully' });
        }, 1000);
      });
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }
};

export default api;