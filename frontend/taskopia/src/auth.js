import api from './api';

export const login = async (email, password) => {
  const response = await api.post('/Authentication/Login', { email, password });
  return response.data;
};

export const logout = async () => {
  await api.post('/Authentication/Logout');
};

export const refreshTokens = async () => {
  const response = await api.post('/Authentication/RefreshTokens');
  return response.data;
};

export const isAuthenticated = () => {
    console.log(!!document.cookie.match(/JWT/))
  return !!document.cookie.match(/JWT/);
};