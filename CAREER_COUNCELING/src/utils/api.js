import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
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
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', credentials),
  getCurrentUser: () => api.get('/auth/me')
};

// Quiz API
export const quizAPI = {
  submitQuiz: (quizData) => api.post('/quiz/submit', quizData),
  getHistory: () => api.get('/quiz/history')
};

// Skills API
export const skillsAPI = {
  submitAssessment: (skillData) => api.post('/skills/submit', skillData),
  getHistory: () => api.get('/skills/history')
};

// Careers API
export const careersAPI = {
  saveCareer: (careerData) => api.post('/careers/save', careerData),
  unsaveCareer: (careerId) => api.delete(`/careers/save/${careerId}`),
  getSavedCareers: () => api.get('/careers/saved')
};

export default api;
