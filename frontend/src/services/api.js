const API_BASE_URL = 'http://localhost:8083';

// API service for leave management
const api = {
  // Create a new leave request
  createLeave: async (leaveData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/leaves`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies for authentication
        body: JSON.stringify(leaveData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create leave request');
      }

      return data;
    } catch (error) {
      throw error;
    }
  },

  // Get all leaves for the logged-in employee
  getMyLeaves: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/leaves/my`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies for authentication
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch leave requests');
      }

      return data;
    } catch (error) {
      throw error;
    }
  },

  // Delete leave request
  deleteLeave: async (leaveId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/leaves/${leaveId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete leave request');
      }

      return data;
    } catch (error) {
      throw error;
    }
  },

  // Get all leaves (Admin only)
  getAllLeaves: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/leaves/admin/all`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch all leave requests');
      }

      return data;
    } catch (error) {
      throw error;
    }
  },

  // Update leave status (Admin only)
  updateLeaveStatus: async (leaveId, status) => {
    try {
      const response = await fetch(`${API_BASE_URL}/leaves/admin/${leaveId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ status }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update leave status');
      }

      return data;
    } catch (error) {
      throw error;
    }
  },

  // Logout - Clear client-side authentication
  logout: () => {
    // Clear any stored authentication data
    localStorage.clear();
    sessionStorage.clear();
    
    // Note: HTTP-only cookies can only be cleared by the server
    // But we can redirect to clear the session
    return Promise.resolve();
  },
};

export default api;
