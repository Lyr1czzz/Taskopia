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

  useEffect(() => {
    const fetchData = async () => {
      let notes = await fetchNotes(filter);
      setNotes(notes);
    };
    fetchData();
  }, [filter]);

  const onSave = async (note) => {
    if (editNote) {
      await updateNote(note);
      setEditNote(null);
    } else {
      await createNote(note);
    }

    let notes = await fetchNotes(filter);
    setNotes(notes);
  };

  const onCancelEdit = () => {
    setEditNote(null);
  };

  const onDelete = async (id) => {
    await removeNote(id);
    let updatedNotes = await fetchNotes(filter);
    setNotes(updatedNotes);
  };

  const onEdit = (note) => {
    setEditNote(note);
  };

  return (
    <Container maxW="container.xl" py={8}>
      <Flex direction={{ base: 'column', md: 'row' }} gap={12}>
        <VStack spacing={10} w={{ base: "100%", md: "35%" }}>
          <NoteForm onSave={onSave} note={editNote} onCancelEdit={onCancelEdit} />
          <Filters filter={filter} setFilter={setFilter} />
        </VStack>

        <Box w={{ base: "100%", md: "65%" }} maxH="80vh" overflowY="auto">
          <VStack spacing={5}>
            {notes.map((n) => (
              <Note
                key={n.id}
                note={n}
                onDeleteSuccess={onDelete}
                onEdit={onEdit}
              />
            ))}
          </VStack>
        </Box>
      </Flex>
    </Container>
  );
}