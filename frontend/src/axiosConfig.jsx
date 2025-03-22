import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '13.239.53.81', // local
  //baseURL: 'http://3.26.96.188:5001', // live
  headers: { 'Content-Type': 'application/json' },
});

export default axiosInstance;
