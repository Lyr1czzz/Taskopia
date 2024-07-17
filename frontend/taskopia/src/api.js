import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7102', // Укажите URL вашего API
  withCredentials: true, // Включает отправку и получение cookies
});

export default api;