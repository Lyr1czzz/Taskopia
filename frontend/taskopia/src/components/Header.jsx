import { Box, Button, Flex, Heading, Spacer, IconButton, useColorMode } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
     p={1}
    >
      <Flex alignItems="center">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Heading size="md" m={4}>
            Taskopia📋
          </Heading>
        </Link>
        <Spacer />
        <Link to="/notes">
          <Button  m={2}>
            Карточки
          </Button>
        </Link>
        <Link to="/login">
          <Button m={2}>
            Вход
          </Button>
        </Link>
        <Link to="/register">
          <Button m={2}>
            Регистрация
          </Button>
        </Link>
        <IconButton
          ml={2}
          icon={colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
          isRound="true"
          size="md"
          onClick={toggleColorMode}
          aria-label={`Switch to ${colorMode === 'dark' ? 'light' : 'dark'} mode`}
        />
      </Flex>
    </Box>
  );
}