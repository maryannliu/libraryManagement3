import axios from 'axios';

const axiosInstance = axios.create({
  //baseURL: '/api' ,

  baseURL: 'http://13.239.53.81:5001', // live
  headers: { 'Content-Type': 'application/json' },
});

export default axiosInstance;
