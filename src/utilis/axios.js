// axiosInstance.js
import axios from 'axios';

const baseURL = 'https://api.chucknorris.io/jokes';

const axiosInstance = axios.create({
  baseURL,
  timeout: 10000
});

axiosInstance.interceptors.request.use(
  (config) => {

    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }

    return config
  },
  (error) => 
     Promise.reject(error)
  
);

axiosInstance.interceptors.response.use(
  (response) => 
     response
  ,
  (error) => {
    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 400:
          console.error('Bad Request:', data);
          // Handle 400 error
          break;
        case 401:
          console.error('Unauthorized:', data);
          // Redirect to the login page
          localStorage.clear()
          break;
        case 404:
          console.error('Not Found:', data);
          // Handle 404 error
          break;
        case 500:
          console.error('Internal Server Error:', data);
          // Handle 500 error
          break;
        default:
          console.error(`Unhandled Status Code: ${status}`, data);
      }
    } else if (error.request) {
      console.error('Request error:', error.request);
    } else {
      console.error('General error:', error.message);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
