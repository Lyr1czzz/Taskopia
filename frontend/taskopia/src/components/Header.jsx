import { Box, Button, Flex, Heading, Spacer, IconButton, useColorMode } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  useEffect(() => {
    const checkAuthentication = () => {
      // Проверьте, авторизован ли пользователь
      // Например, проверьте наличие куки с токеном
      const token = getCookie('token');
      const isLoggedIn = !!token;
      setIsLoggedIn(isLoggedIn);
    };
  
    checkAuthentication();
  }, []);

  const getCookie = (name) => {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    console.log()
    return cookieValue ? cookieValue.pop() : '';
  };

  return (
    <Box p={1}>
      <Flex alignItems="center">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Heading size="md" m={4}>
            Taskopia📋
          </Heading>
        </Link>
        <Spacer />
        <Link to="/users">
          <Button m={2}>
            Пользователи
          </Button>
        </Link>
        <Link to="/notes">
          <Button m={2}>
            Карточки
          </Button>
        </Link>
        <Link to="/timer">
          <Button m={2}>
            Таймер
          </Button>
        </Link>
          <Link to={isLoggedIn ? '/logout' : '/login'}>
          <Button m={2}>
            {isLoggedIn ? 'Выход' : 'Вход'}
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