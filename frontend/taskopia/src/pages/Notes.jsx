import React, { useEffect, useState } from 'react';
import { removeNote, createNote, fetchNotes, updateNote } from '../services/notes';
import { Box, Flex, VStack, Heading, Container, useColorModeValue, IconButton } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import NoteForm from "../components/NoteForm";
import Filters from "../components/Filters";
import Note from "../components/Note";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [filter, setFilter] = useState({
    search: "",
    sortItem: "date",
    sortOrder: "desc",
  });
  const [editNote, setEditNote] = useState(null);
  const [error, setError] = useState(null); // Новый state для ошибок

  useEffect(() => {
    const fetchData = async () => {
      try {
        let fetchedNotes = await fetchNotes(filter);
        if (fetchedNotes) {
          setNotes(fetchedNotes);
        } else {
          setError("Failed to fetch notes");
        }
      } catch (e) {
        setError("Error fetching notes");
        console.error(e);
      }
    };
    fetchData();
  }, [filter]);

  const onSave = async (note) => {
    try {
      if (editNote) {
        await updateNote(note);
        setEditNote(null);
      } else {
        await createNote(note);
      }

      let notes = await fetchNotes(filter);
      setNotes(notes);
    } catch (e) {
      setError("Error saving note");
      console.error(e);
    }
  };

  const onCancelEdit = () => {
    setEditNote(null);
  };

  const onDelete = async (id) => {
    try {
      await removeNote(id);
      let updatedNotes = await fetchNotes(filter);
      setNotes(updatedNotes);
    } catch (e) {
      setError("Error deleting note");
      console.error(e);
    }
  };

  const onEdit = (note) => {
    setEditNote(note);
  };

  return (
    <Container maxW="container.xl" py={8}>
      {error && <Box color="red.500" mb={4}>{error}</Box>}
      <Flex direction={{ base: 'column', md: 'row' }} gap={12}>
        <VStack spacing={10} w={{ base: "100%", md: "35%" }}>
          <NoteForm onSave={onSave} note={editNote} onCancelEdit={onCancelEdit} />
          <Filters filter={filter} setFilter={setFilter} />
        </VStack>

        <Box w={{ base: "100%", md: "65%" }} maxH="80vh" overflowY="auto">
          <VStack spacing={5}>
            {notes && notes.length > 0 ? (
              notes.map((n) => (
                <Note
                  key={n.id}
                  note={n}
                  onDeleteSuccess={onDelete}
                  onEdit={onEdit}
                />
              ))
            ) : (
              <Heading>Заметок не найдено</Heading>
            )}
          </VStack>
        </Box>
      </Flex>
    </Container>
  );
}