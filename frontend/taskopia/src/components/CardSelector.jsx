import React, { useState } from 'react';
import { Box, Checkbox, VStack, Button } from '@chakra-ui/react';

const CardSelector = ({ cards, onSave }) => {
  const [selectedCards, setSelectedCards] = useState([]);

  const handleCheckboxChange = (card) => {
    setSelectedCards((prevSelectedCards) => {
      if (prevSelectedCards.includes(card)) {
        return prevSelectedCards.filter((c) => c !== card);
      } else {
        return [...prevSelectedCards, card];
      }
    });
  };

  const handleSave = () => {
    onSave(selectedCards);
  };

  return (
    <Box>
      <VStack spacing={4}>
        {cards.map((card) => (
          <Checkbox
            key={card.id}
            isChecked={selectedCards.includes(card)}
            onChange={() => handleCheckboxChange(card)}
          >
            {card.title}
          </Checkbox>
        ))}
        <Button onClick={handleSave}>Сохранить</Button>
      </VStack>
    </Box>
  );
};

export default CardSelector;