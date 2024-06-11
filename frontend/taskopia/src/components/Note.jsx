import { useState, useRef } from "react";
import { Box, Button, Card, CardBody, CardFooter, CardHeader, Divider, Heading, Text, VStack, Flex, HStack, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay } from "@chakra-ui/react";
import moment from "moment";

export default function Note({
  note,
  onDeleteSuccess,
  onEdit,
}) {
  const { id, title, description, createdAt } = note;
  
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();

  const handleDelete = async () => {
    setIsOpen(false);
    try {
      await onDeleteSuccess(id);
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const handleEdit = () => {
    onEdit(note);
  };

  const openDeleteConfirmation = () => {
    setIsOpen(true);
  };

  return (
    <Card width="full" boxShadow="lg" p={4}>
      <CardHeader>
        <Heading size="md">{title}</Heading>
      </CardHeader>
      <CardBody>
        <Text>{description}</Text>
      </CardBody>
      <Divider my={3} />
      <CardFooter>
        <Flex direction="column" align="start">
          <Text fontSize="sm" color="gray.500">{moment(createdAt).format("DD/MM/YYYY hh:mm:ss")}</Text>
          <HStack mt={3} spacing={3}>
            <Button size="sm" colorScheme="blue" onClick={handleEdit}>
              Редактировать
            </Button>
            <Button size="sm" colorScheme="red" onClick={openDeleteConfirmation}>
              Удалить
            </Button>
          </HStack>
        </Flex>
      </CardFooter>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Удаление заметки
            </AlertDialogHeader>

            <AlertDialogBody>
              Вы уверены что хотите удалить эту заметку? Вернуть её будет невозможно.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Отмена
              </Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>
                Удалить
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Card>
  );
}