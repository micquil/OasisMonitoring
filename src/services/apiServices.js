import axios from "axios";

const API_BASE_URL = "http://localhost:5241/api/accountsPayable"; // Adjust based on your .NET backend URL

const apiServices = {
  // Fetch all accounts payable records
  getAll: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching accounts payable:", error);
      throw error;
    }
  },

  // Fetch a single account payable by ID
  getById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching account payable:", error);
      throw error;
    }
  },

  // Create a new account payable
  create: async (accountData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}`, accountData);
      return response.data;
    } catch (error) {
      console.error("Error creating account payable:", error);
      throw error;
    }
  },

  // Update an existing account payable
  update: async (id, accountData) => {
    try {
      await axios.put(`${API_BASE_URL}/${id}`, accountData);
    } catch (error) {
      console.error("Error updating account payable:", error);
      throw error;
    }
  },

  // Delete an account payable
  delete: async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
    } catch (error) {
      console.error("Error deleting account payable:", error);
      throw error;
    }
  },
};

export default apiServices;
