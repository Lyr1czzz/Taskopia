import React, { useState, useEffect } from 'react';
import { Box, Button, Heading, Text, VStack, Input } from '@chakra-ui/react';

const TimerPage = () => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  useEffect(() => {
    let timerInterval = null;
    if (isTimerActive && timerSeconds > 0) {
      timerInterval = setInterval(() => {
        setTimerSeconds(timerSeconds => timerSeconds - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      clearInterval(timerInterval);
      if (isTimerActive) {
        showNotification();
        setIsTimerActive(false);
      }
    }
    return () => clearInterval(timerInterval);
  }, [isTimerActive, timerSeconds]);

  const toggleStopwatch = () => {
    setIsActive(!isActive);
  };

  const resetStopwatch = () => {
    setSeconds(0);
    setIsActive(false);
  };

  const startTimer = () => {
    setIsTimerActive(true);
  };

  const resetTimer = () => {
    setTimerSeconds(0);
    setIsTimerActive(false);
  };

  const showNotification = () => {
    if (Notification.permission === 'granted') {
      new Notification('Таймер завершен!', {
        body: `Ваш таймер на ${timerSeconds} секунд завершен.`,
      });
    }
  };

  useEffect(() => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, []);

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
        <Heading as="h1" size="2xl">
          Секундомер ⏱️
        </Heading>
        <Text fontSize="4xl">{seconds}s</Text>
        <Button onClick={toggleStopwatch} size="lg">
          {isActive ? 'Пауза' : 'Старт'}
        </Button>
        <Button onClick={resetStopwatch} size="lg">
          Сброс
        </Button>
        <Heading as="h1" size="2xl" marginTop={10}>
          Таймер ⏲️
        </Heading>
        <Input
          type="number"
          placeholder="Введите время в секундах"
          value={timerSeconds}
          onChange={(e) => setTimerSeconds(e.target.value)}
        />
        <Button onClick={startTimer} size="lg">
          Старт
        </Button>
        <Button onClick={resetTimer} size="lg">
          Сброс
        </Button>
      </VStack>
    </Box>
  );
};

export default TimerPage;