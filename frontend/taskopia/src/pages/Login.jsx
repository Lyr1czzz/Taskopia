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
import axios from 'axios';

export default function Login() {
  const toast = useToast();
  const navigate = useNavigate();
  
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
      const response = await axios.post(`https://localhost:7102/Authentication/Login`, formData, { withCredentials: true });
      console.log('User logged in:', response.data);
      toast({
        position: "top-left",
        status: "success",
        duration: 5000,
        description: "Вход выполнен успешно!"
      });
      navigate('/');  // Перенаправление на домашнюю страницу при успешном логине
    } catch (error) {
      console.error('Error logging user:', error.response.data);
      toast({
        position: "top-left",
        status: "error",
        duration: 5000,
        description: "Ошибка при входе!"
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
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input type="email" value={formData.email} onChange={handleChange} />
            </FormControl>

            <FormControl id="password" isRequired>
              <FormLabel>Пароль</FormLabel>
              <Input type="password" value={formData.password} onChange={handleChange} />
            </FormControl>

            <Button mt={4} size="lg" type="submit">
              Войти
            </Button>
            <Text textAlign="center">
              Еще нет аккаунта? <Link as={RouterLink} to="/register" color="teal.500">Зарегистрироваться</Link>
            </Text>
          </Stack>
        </form>
      </Box>
    </Box>
  );
}