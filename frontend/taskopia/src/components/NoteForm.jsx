import { Input, Button, Textarea, Box, Heading, VStack, HStack } from "@chakra-ui/react";
import { useState, useEffect } from "react";

export default function NoteForm({ note, onSave, onCancelEdit }) {
  const [currentNote, setCurrentNote] = useState(note || { title: '', description: '' });

  useEffect(() => {
    setCurrentNote(note || { title: '', description: '' });
  }, [note]);

  const onSubmit = (e) => {
    e.preventDefault();
    onSave(currentNote);
    setCurrentNote({ title: '', description: '' });
  };

  return (
    <Box as="form" onSubmit={onSubmit} w="full">
      <VStack spacing={3}>
        <Heading size="md">{note ? 'Редактирование заметки' : 'Создание заметки'}</Heading>
        <Input
          placeholder='Заголовок'
          value={currentNote?.title ?? ""}
          onChange={(e) => setCurrentNote({ ...currentNote, title: e.target.value })}
        />
        <Textarea
          placeholder='Описание'
          value={currentNote?.description ?? ""}
          onChange={(e) => setCurrentNote({ ...currentNote, description: e.target.value })}
        />
        <HStack spacing={3} w="full">
          <Button type="submit" colorScheme={note ? 'blue' : 'green'} w="full">
            {note ? 'Сохранить' : 'Создать'}
          </Button>
          {note && (
            <Button colorScheme="red" w="full" onClick={onCancelEdit}>
              Отмена
            </Button>
          )}
        </HStack>
      </VStack>
    </Box>
  );
}