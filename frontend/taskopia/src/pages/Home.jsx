import React, { useState, useEffect } from 'react';
import { Box, Heading, VStack, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import CardSelector from '../components/CardSelector';

const initialCards = [
  { id: 1, title: 'Заметки', link: '/notes' },
  { id: 2, title: 'Таймер', link: '/timer' },
  { id: 3, title: 'Чет другое', link: '/notes' },
];

export default function Home() {
  const [selectedCards, setSelectedCards] = useState([]);
  const [isSelecting, setIsSelecting] = useState(false);

  useEffect(() => {
    const savedCards = JSON.parse(localStorage.getItem('selectedCards')) || [];
    setSelectedCards(savedCards);
  }, []);

  const handleSave = (cards) => {
    setSelectedCards(cards);
    localStorage.setItem('selectedCards', JSON.stringify(cards));
    setIsSelecting(false);
  };

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
        <Button onClick={() => setIsSelecting(!isSelecting)}>
          {isSelecting ? 'Отмена' : 'Выбрать карточки'}
        </Button>
        {isSelecting ? (
          <CardSelector cards={initialCards} onSave={handleSave} />
        ) : (
          selectedCards.map((card) => (
            <Link key={card.id} to={card.link}>
              <Button size="lg">{card.title}</Button>
            </Link>
          ))
        )}
      </VStack>
    </Box>
  );
}