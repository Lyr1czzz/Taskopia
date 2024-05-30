import { Box, Flex, Heading, Spacer, Text, Link as ChakraLink } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <Box 
     p={4}
    >
      <Flex align="center">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Heading size="md" m={2}>
            Taskopia📋
          </Heading>
        </Link>
        <Spacer />
        <ChakraLink as={Link} to="/about" m={2}>
          О нас
        </ChakraLink>
        <ChakraLink as={Link} to="/contact" m={2}>
          Контакты
        </ChakraLink>
        <ChakraLink as={Link} to="/privacy"  m={2}>
          Политика конфиденциальности
        </ChakraLink>
      </Flex>
      <Text textAlign="center" mt={4}>
        © {new Date().getFullYear()} Taskopia. Все права защищены.
      </Text>
    </Box>
  );
}