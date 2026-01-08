import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: (name: string, email: string, password: string) =>
    api.post('/auth/register', { name, email, password }),
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  forgotPassword: (email: string) =>
    api.post('/auth/forgot-password', { email }),
  resetPassword: (token: string, password: string) =>
    api.post('/auth/reset-password', { token, newPassword: password }),
};

// Category API
export const categoryAPI = {
  getAll: () => api.get('/categories'),
  getById: (id: string) => api.get(`/categories/${id}`),
  create: (data: { name: string; image: string; status: boolean }) =>
    api.post('/categories', data),
  update: (id: string, data: { name: string; image: string; status: boolean }) =>
    api.put(`/categories/${id}`, data),
  delete: (id: string) => api.delete(`/categories/${id}`),
};

// Subcategory API
export const subcategoryAPI = {
  getAll: () => api.get('/subcategories'),
  getById: (id: string) => api.get(`/subcategories/${id}`),
  create: (data: { name: string; category: string; image: string; status: boolean }) =>
    api.post('/subcategories', data),
  update: (id: string, data: { name: string; category: string; image: string; status: boolean }) =>
    api.put(`/subcategories/${id}`, data),
  delete: (id: string) => api.delete(`/subcategories/${id}`),
};

// Product API
export const productAPI = {
  getAll: () => api.get('/products'),
  getById: (id: string) => api.get(`/products/${id}`),
  create: (data: {
    name: string;
    category: string;
    subcategory: string;
    image: string;
    status: boolean;
  }) => api.post('/products', data),
  update: (id: string, data: {
    name: string;
    category: string;
    subcategory: string;
    image: string;
    status: boolean;
  }) => api.put(`/products/${id}`, data),
  delete: (id: string) => api.delete(`/products/${id}`),
};

export default api;

