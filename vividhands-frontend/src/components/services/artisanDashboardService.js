import axios from "axios";

// const API_URL = "http://localhost:8080/api/artisan/products";
const API_URL = "http://localhost:8080/api";

const getDashboardStats = async () => {
  const token = localStorage.getItem("artisanToken");
  return axios.get(`${API_URL}/dashboard/stats`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};



const getMyProducts = async () => {
  const token = localStorage.getItem("artisanToken");
  return axios.get(`${API_URL}/my-products`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const updateProduct = async (productId, data) => {
  const token = localStorage.getItem("artisanToken");
  return axios.put(`${API_URL}/update/${productId}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data", // Add this line
    },
  });
};

const deleteProduct = async (productId) => {
  const token = localStorage.getItem("artisanToken");
  return axios.delete(`${API_URL}/delete/${productId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const getMyOrders = async () => {
  const token = localStorage.getItem("artisanToken");
  const artisanId = localStorage.getItem("artisanId");

  return axios.get(`${API_URL}/orders/artisan/${artisanId}/orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
};

const getOrderDetails = async (orderId) => {
  const token = localStorage.getItem("artisanToken");
  const artisanId = localStorage.getItem("artisanId");

  return axios.get(`${API_URL}/orders/artisan/${artisanId}/orders/${orderId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
};



// Assigning the object to a variable before exporting
const artisanDashboardService = {
  getDashboardStats,
  getMyProducts,
  updateProduct,
  deleteProduct,
  getMyOrders,
  getOrderDetails,
};

export default artisanDashboardService;
