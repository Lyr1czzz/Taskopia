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
import { loginUser } from '../services/notes';

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
      const data = await loginUser({
          Email: formData.email,
          Password: formData.password
      });

      if (data) {
        toast({
          position: "top-left",
          status: "success",
          duration: 5000,
          description: "Вход успешен!"
        });
        navigate('/');
      } else {
        toast({
          position: "top-left",
          status: "error",
          duration: 5000,
          description: "Ошибка входа!"
        });
      }
    } catch (error) {
      toast({
        position: "top-left",
        status: "error",
        duration: 5000,
        description: "Произошла ошибка!"
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
              <Input type="email" value={formData.email} onChange={handleChange} />
            </FormControl>

            <FormControl id="password">
              <FormLabel>Пароль</FormLabel>
              <Input type="password" value={formData.password} onChange={handleChange} />
            </FormControl>

            <Button size="lg" mt={4} type="submit">
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