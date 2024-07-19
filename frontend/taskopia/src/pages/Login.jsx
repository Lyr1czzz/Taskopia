import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  useColorModeValue,
  useToast,
  Text,
  Link
} from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

export default function Login() {
  const toast = useToast();
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const success = await login(formData.email, formData.password);
      
      if (success) {
        toast({
          position: "top-left",
          status: "success",
          duration: 5000,
          description: "Вход выполнен успешно!"
        });
        navigate('/'); // Перенаправление на главную страницу
      } else {
        toast({
          position: "top-left",
          status: "error",
          duration: 5000,
          description: "Неверный email или пароль!"
        });
      }
    } catch (error) {
      console.error("Error caught in handleSubmit:", error);
      toast({
        position: "top-left",
        status: "error",
        duration: 5000,
        description: "Произошла ошибка при входе!"
      });
    }
  };

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        bg={useColorModeValue('white', 'gray.700')}
        p={8}
        rounded="lg"
        shadow="lg"
        width="full"
        maxW="md"
      >
        <Heading mb={6} textAlign="center">
          Вход
        </Heading>
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Input 
                type="email" 
                value={formData.email} 
                onChange={handleChange} 
                required
              />
            </FormControl>

            <FormControl id="password">
              <FormLabel>Пароль</FormLabel>
              <Input 
                type="password" 
                value={formData.password} 
                onChange={handleChange} 
                required
              />
            </FormControl>

            <Button mt={4} size="lg" type="submit" colorScheme="blue">
              Войти
            </Button>
            <Text textAlign="center">
              Нет аккаунта? <Link as={RouterLink} to="/register" color="teal.500">Зарегистрироваться</Link>
            </Text>
          </Stack>
        </form>
      </Box>
    </Box>
  );
}