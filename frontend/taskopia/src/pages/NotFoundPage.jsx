import React from 'react';
import { Box, Heading, Text, Button, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
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
          Страница не найдена 😢
        </Heading>
        <Text fontSize="xl" textAlign="center">
          К сожалению, страница, которую вы пытаетесь просмотреть, не существует.
        </Text>
        <Link to="/">
          <Button size="lg">
            Вернуться на главную
          </Button>
        </Link>
      </VStack>
    </Box>
  );
}