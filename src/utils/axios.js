import axios from 'axios';

const backendURL = import.meta.env.VITE_API_BACKEND;

const axiosInstance = axios.create({
  baseURL: backendURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // You can add any custom headers here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle 401 error - could redirect to login or refresh token
      console.log('Unauthorized access, redirecting to login...');
      // You might want to dispatch a logout action here
    }
    return Promise.reject(error);
  }
);

export default axiosInstance; 