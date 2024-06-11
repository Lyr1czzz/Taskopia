import { useState, useEffect } from "react";
import { Box, Button, FormControl, FormLabel, Input, Textarea, Tag, TagLabel, TagCloseButton, HStack } from "@chakra-ui/react";

export default function NoteForm({ note, onSave, onCancelEdit }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setDescription(note.description);
      setTags(note.tags);
    }
  }, [note]);

  const handleSave = () => {
    onSave({
      id: note?.id,
      title,
      description,
      tags
    });
    setTitle("");
    setDescription("");
    setTags([]);
    setTagInput("");
  };

  const handleAddTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <Box w="full">
      <FormControl id="title" isRequired>
        <FormLabel>Заголовок</FormLabel>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </FormControl>
      <FormControl id="description" mt={4} isRequired>
        <FormLabel>Описание</FormLabel>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </FormControl>
      <FormControl id="tags" mt={4}>
        <FormLabel>Теги</FormLabel>
        <HStack>
          <Input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
          />
          <Button onClick={handleAddTag}>Добавить</Button>
        </HStack>
        <HStack mt={2}>
          {tags.map(tag => (
            <Tag
              size="md"
              key={tag}
              borderRadius="full"
              variant="solid"
              colorScheme="blue"
            >
              <TagLabel>{tag}</TagLabel>
              <TagCloseButton onClick={() => handleRemoveTag(tag)} />
            </Tag>
          ))}
        </HStack>
      </FormControl>
      <Button mt={4} colorScheme="blue" onClick={handleSave}>
        {note ? "Обновить" : "Сохранить"}
      </Button>
      {note && (
        <Button mt={4} ml={2} onClick={onCancelEdit}>
          Отмена
        </Button>
      )}
    </Box>
  );
}