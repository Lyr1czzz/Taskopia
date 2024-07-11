// src/components/UserTable.jsx
import React, { useEffect, useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Box, Text, IconButton } from '@chakra-ui/react';
import { fetchUsers, deleteUser, updateUser } from '../services/notes';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import EditUserModal from '../components/EditUserModal';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await fetchUsers();
        console.log("Fetched users:", data); // Логируем данные
        setUsers(data);
      } catch (e) {
        console.error("Error fetching users:", e);
      }
    };

    getUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers(users.filter(user => user.id !== userId));
    } catch (e) {
      console.error("Error deleting user:", e);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleSave = async (updatedUser) => {
    try {
      await updateUser(updatedUser);
      setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
      setIsEditModalOpen(false);
      setSelectedUser(null);
    } catch (e) {
      console.error("Error updating user:", e);
    }
  };

  return (
    <Box>
      {users.length === 0 ? (
        <Text>No users found.</Text>
      ) : (
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>Имя</Th>
              <Th>Email</Th>
              <Th>Phone number</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user) => (
              <Tr key={user.id}> {/* Используем id как ключ */}
                <Td>{user.id}</Td>
                <Td>{user.userName}</Td>
                <Td>{user.email}</Td>
                <Td>{user.phoneNumber}</Td>
                <Td>
                  <IconButton
                    aria-label="Edit user"
                    icon={<EditIcon />}
                    onClick={() => handleEdit(user)}
                    mr={2}
                  />
                  <IconButton
                    aria-label="Delete user"
                    icon={<DeleteIcon />}
                    onClick={() => handleDelete(user.id)}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
      {selectedUser && (
        <EditUserModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          user={selectedUser}
          onSave={handleSave}
        />
      )}
    </Box>
  );
};

export default UserTable;