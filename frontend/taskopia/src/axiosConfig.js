import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://localhost:7102', // Замените на URL вашего API
  withCredentials: true
});

export default instance;