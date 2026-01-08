import { mockLeaveRequests } from '../data/mockData';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8083';

// Function to get auth token
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Function for authenticated requests
const authFetch = async (url, options = {}) => {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || `HTTP ${response.status}`);
  }

  return response.json();
};

const api = {
  // Get all leave requests (Admin endpoint)
  async getLeaveRequests() {
    try {
      return await authFetch(`${API_BASE_URL}/api/leaves/admin/all`);
    } catch (error) {
      console.error('Error fetching leave requests:', error);
      throw error;
    }
  },

  // Update leave request status
  async updateLeaveStatus(id, status) {
    try {
      return await authFetch(`${API_BASE_URL}/api/leaves/admin/${id}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status })
      });
    } catch (error) {
      console.error('Error updating leave status:', error);
      throw error;
    }
  },

  // Send email to employee
  async sendEmail(email, status) {
    try {
      return await authFetch(`${API_BASE_URL}/api/send-email`, {
        method: 'POST',
        body: JSON.stringify({ email, status })
      });
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  },

  // Send custom email to employee
  async sendEmailWithMessage(email, subject, message, status) {
    try {
      return await authFetch(`${API_BASE_URL}/api/send-email`, {
        method: 'POST',
        body: JSON.stringify({ email, subject, message, status })
      });
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }
};

export default api;