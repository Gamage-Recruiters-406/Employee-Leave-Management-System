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
  // ===== AUTH ENDPOINTS =====
  register: async (userData) => {
    return authFetch(`${API_BASE_URL}/api/auth/register`, {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  login: async (credentials) => {
    return authFetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  logout: async () => {
    localStorage.clear();
    sessionStorage.clear();
    return Promise.resolve();
  },

  // ===== LEAVE ENDPOINTS =====
  createLeave: async (leaveData) => {
    return authFetch(`${API_BASE_URL}/leaves`, {
      method: 'POST',
      body: JSON.stringify(leaveData),
    });
  },

  getMyLeaves: async () => {
    return authFetch(`${API_BASE_URL}/leaves/my`, {
      method: 'GET',
    });
  },

  updateMyLeave: async (leaveId, leaveData) => {
    return authFetch(`${API_BASE_URL}/leaves/${leaveId}`, {
      method: 'PUT',
      body: JSON.stringify(leaveData),
    });
  },

  deleteLeave: async (leaveId) => {
    return authFetch(`${API_BASE_URL}/leaves/${leaveId}`, {
      method: 'DELETE',
    });
  },

  // ===== ADMIN ENDPOINTS =====
  getAllLeaves: async () => {
    return authFetch(`${API_BASE_URL}/leaves/admin/all`, {
      method: 'GET',
    });
  },

  updateLeaveStatus: async (leaveId, status) => {
    return authFetch(`${API_BASE_URL}/leaves/admin/${leaveId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  },

  getAuditLog: async () => {
    return authFetch(`${API_BASE_URL}/leaves/admin/audit-logs`, {
      method: 'GET',
    });
  },
};

export default api;