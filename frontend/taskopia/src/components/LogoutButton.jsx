import React from 'react';
import { Button } from '@chakra-ui/react';
import { useAuth } from './AuthContext';
import { Navigate } from 'react-router-dom';

const LogoutButton = () => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      setIsAuthenticated(false); // Обновляем состояние аутентификации
      navigate('/'); // Перенаправляем на главную страницу после выхода
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <Button onClick={handleLogout} colorScheme="red">
      Logout
    </Button>
  );
};

export default LogoutButton;