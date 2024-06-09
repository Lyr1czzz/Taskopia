import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
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
import { registerUser } from '../services/notes';

export default function Register() {
  const toast = useToast();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phoneNumber: ''
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
      const userToRegister = {
        UserName: formData.username,
        Email: formData.email,
        Password: formData.password,
        PhoneNumber: formData.phoneNumber
      };
      console.log("Registering user:", userToRegister); // отладочная информация
      
      const responseStatus = await registerUser(userToRegister);

      if (responseStatus === 200) {
        toast({
          position: "top-left",
          status: "success",
          duration: 5000,
          description: "Регистрация успешна!"
        });
        navigate('/login');
      } else {
        toast({
          position: "top-left",
          status: "error",
          duration: 5000,
          description: "Регистрация не удалась!"
        });
      }
    } catch (error) {
      console.error("Error caught in handleSubmit:", error);
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
          Регистрация
        </Heading>
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl id="username">
              <FormLabel>Имя пользователя</FormLabel>
              <Input type="text" value={formData.username} onChange={handleChange} />
            </FormControl>

            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Input type="email" value={formData.email} onChange={handleChange} />
            </FormControl>

            <FormControl id="password">
              <FormLabel>Пароль</FormLabel>
              <Input type="password" value={formData.password} onChange={handleChange} />
            </FormControl>
            
            <FormControl id="phoneNumber">
              <FormLabel>Номер телефона</FormLabel>
              <Input type="text" value={formData.phoneNumber} onChange={handleChange} />
            </FormControl>

            <Checkbox id="agreement" required>
              Я согласен с <Link as={RouterLink} to="/policy" color="teal.500">политикой конфиденциальности</Link>
            </Checkbox>

            <Button mt={4} size="lg" type="submit">
              Зарегистрироваться
            </Button>
            <Text textAlign="center">
              Уже есть аккаунт? <Link as={RouterLink} to="/login" color="teal.500">Войти</Link>
            </Text>
          </Stack>
        </form>
      </Box>
    </Box>
  );
}