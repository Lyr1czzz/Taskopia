import React from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  useColorModeValue,
} from '@chakra-ui/react';

export default function Register() {
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
        <form>
          <Stack spacing={4}>
            <FormControl id="username">
              <FormLabel>Имя пользователя</FormLabel>
              <Input type="text" />
            </FormControl>

            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Input type="email" />
            </FormControl>

            <FormControl id="password">
              <FormLabel>Пароль</FormLabel>
              <Input type="password" />
            </FormControl>

            <Button mt={4} size="lg" type="submit">
              Зарегистрироваться
            </Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
}