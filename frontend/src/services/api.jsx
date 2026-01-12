const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8083";

// API service for leave management
const api = {
  // Register new user
  register: async (userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to register");
      }

      return data;
    } catch (error) {
      throw error;
    }
  },

  // Login user
  login: async (credentials) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to login");
      }

      // Store user data and token in localStorage
      if (data.success && data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        if (data.token) {
          localStorage.setItem("token", data.token);
        }
      }

      return data;
    } catch (error) {
      throw error;
    }
  },

  // Create a new leave request
  createLeave: async (leaveData) => {
    try {
      const token = localStorage.getItem("token");
      
      if (!token) {
        throw new Error("Authentication required. Please log in.");
      }
      
      const response = await fetch(`${API_BASE_URL}/leaves`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify(leaveData),
      });

      if (response.status === 401) {
        localStorage.clear();
        window.location.href = '/login';
        throw new Error("Session expired. Please log in again.");
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create leave request");
      }

      return data;
    } catch (error) {
      throw error;
    }
  },

  // Get all leaves for the logged-in employee
  getMyLeaves: async () => {
    try {
      const token = localStorage.getItem("token");
      
      if (!token) {
        throw new Error("Authentication required. Please log in.");
      }
      
      const response = await fetch(`${API_BASE_URL}/leaves/my`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        credentials: "include",
      });

      if (response.status === 401) {
        localStorage.clear();
        window.location.href = '/login';
        throw new Error("Session expired. Please log in again.");
      }

      // Handle 404 as empty array (no leaves found)
      if (response.status === 404) {
        return [];
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch leave requests");
      }

      return data;
    } catch (error) {
      throw error;
    }
  },

  // Delete leave request
  deleteLeave: async (leaveId) => {
    try {
      const token = localStorage.getItem("token");
      
      if (!token) {
        throw new Error("Authentication required. Please log in.");
      }
      
      const response = await fetch(`${API_BASE_URL}/leaves/${leaveId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        credentials: "include",
      });

      if (response.status === 401) {
        localStorage.clear();
        window.location.href = '/login';
        throw new Error("Session expired. Please log in again.");
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete leave request");
      }

      return data;
    } catch (error) {
      throw error;
    }
  },

  // Send email to employee
  sendEmail: async (email, status) => {
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
      console.error("Error sending email:", error);
      throw error;
    }
  },

  // Get all leaves (Admin only)
  getAllLeaves: async () => {
    try {
      const token = localStorage.getItem("token");
      
      if (!token) {
        // Redirect to login if no token found
        window.location.href = '/login';
        throw new Error("Authentication required. Please log in.");
      }
      
      const response = await fetch(`${API_BASE_URL}/leaves/admin/all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        credentials: "include",
      });

      // Handle 401 Unauthorized
      if (response.status === 401) {
        localStorage.clear();
        window.location.href = '/login';
        throw new Error("Unauthorized: Session expired or invalid token");
      }

      // Handle 403 Forbidden (not admin)
      if (response.status === 403) {
        throw new Error("Access denied. Admin privileges required.");
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch all leave requests");
      }

      return data;
    } catch (error) {
      throw error;
    }
  },

  // Update leave status (Admin only)
  updateLeaveStatus: async (leaveId, status) => {
    try {
      const token = localStorage.getItem("token");
      
      if (!token) {
        throw new Error("Authentication required. Please log in.");
      }
      
      const response = await fetch(
        `${API_BASE_URL}/leaves/admin/${leaveId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          credentials: "include",
          body: JSON.stringify({ status }),
        }
      );

      if (response.status === 401) {
        localStorage.clear();
        window.location.href = '/login';
        throw new Error("Session expired. Please log in again.");
      }

      if (response.status === 403) {
        throw new Error("Access denied. Admin privileges required.");
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update leave status");
      }

      return data;
    } catch (error) {
      throw error;
    }
  },

  // Send custom email to employee
  sendEmailWithMessage: async (email, subject, message, status) => {
    try {
      // FOR DEVELOPMENT:
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log("Email sent:", { email, subject, message, status });
          resolve({ success: true, message: "Email sent successfully" });
        }, 1000);
      });
    } catch (error) {
      console.error("Error sending email:", error);
      throw error;
    }
  },

  // Logout - Clear client-side authentication
  logout: () => {
    localStorage.clear();
    sessionStorage.clear();
    return Promise.resolve();
  },
};

export default api;