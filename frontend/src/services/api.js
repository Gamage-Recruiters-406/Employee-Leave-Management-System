const API_BASE_URL = 'http://localhost:8083';

// Helper function to get auth token
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Helper function for authenticated requests
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
    credentials: 'include',
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || `HTTP ${response.status}`);
  }

  return response.json().catch((error) => {
    throw new Error('Invalid JSON response from server');
  });
};

const api = {
  createLeave: async (leaveData) => {
    return authFetch(`${API_BASE_URL}/api/leaves`, {
      method: 'POST',
      body: JSON.stringify(leaveData),
    });
  },

  getMyLeaves: async () => {
    return authFetch(`${API_BASE_URL}/api/leaves/my`, {
      method: 'GET',
    });
  },

  getAllLeaves: async () => {
    return authFetch(`${API_BASE_URL}/api/leaves/admin/all`, {
      method: 'GET',
    });
  },

  updateLeaveStatus: async (leaveId, status) => {
    return authFetch(`${API_BASE_URL}/api/leaves/admin/${leaveId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  },

  deleteLeave: async (leaveId) => {
    return authFetch(`${API_BASE_URL}/api/leaves/${leaveId}`, {
      method: 'DELETE',
    });
  },

  sendEmail: async (email, status) => {
    return authFetch(`${API_BASE_URL}/api/send-email`, {
      method: 'POST',
      body: JSON.stringify({ email, status }),
    });
  },

  sendEmailWithMessage: async (email, subject, message, status) => {
    return authFetch(`${API_BASE_URL}/api/send-email`, {
      method: 'POST',
      body: JSON.stringify({ email, subject, message, status }),
    });
  },

  getAuditLog: async () => {
    return authFetch(`${API_BASE_URL}/api/audit-log`, {
      method: 'GET',
    });
  },

  logout: async () => {
    localStorage.clear();
    sessionStorage.clear();
    return Promise.resolve();
  },
};

export default api;