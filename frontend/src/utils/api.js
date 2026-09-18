import axios from 'axios';

const API_BASE_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api`;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getProfile: () => api.get('/auth/profile'),
};

export const quizAPI = {
  getQuestions: () => api.get('/quiz/questions'),
  submitQuiz: (answers) => api.post('/quiz/submit', { answers }),
  getResults: () => api.get('/quiz/results'),
};

export const collegeAPI = {
  getColleges: (params) => api.get('/colleges', { params }),
  getCollege: (id) => api.get(`/colleges/${id}`),
  getDistricts: () => api.get('/colleges/meta/districts'),
  bookmarkCollege: (collegeId) => api.post('/colleges/bookmark', { college_id: collegeId }),
  removeBookmark: (collegeId) => api.delete(`/colleges/bookmark/${collegeId}`),
  getBookmarks: () => api.get('/colleges/bookmarks/list'),
};

export const roadmapAPI = {
  getRoadmap: (courseId) => api.get(`/roadmaps/course/${courseId}`),
};

export default api;
