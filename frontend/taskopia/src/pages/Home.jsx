import React from 'react';
import { Box, Heading, Text, Button, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      padding="4"
    >
      <VStack spacing={6}>
        <Heading as="h1" size="2xl" textAlign="center">
          Добро пожаловать на Taskopia! 🎉
        </Heading>
        <Text fontSize="xl" textAlign="center">
          Хотите начать вести свои заметки?
        </Text>
        <Link to="/notes">
          <Button size="lg">
            Начать
          </Button>
        </Link>
      </VStack>
    </Box>
  );
}