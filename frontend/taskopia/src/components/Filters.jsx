import React from "react";
import { Box, Input, Select, FormControl, FormLabel, HStack } from "@chakra-ui/react";

export default function Filters({ filter, setFilter }) {
  const handleSearchChange = (e) => {
    setFilter({ ...filter, search: e.target.value });
  };

  const handleSortItemChange = (e) => {
    setFilter({ ...filter, sortItem: e.target.value });
  };

  const handleSortOrderChange = (e) => {
    setFilter({ ...filter, sortOrder: e.target.value });
  };

  return (
    <Box w="full">
      <FormControl id="search">
        <FormLabel>Поиск</FormLabel>
        <Input value={filter.search} onChange={handleSearchChange} />
      </FormControl>
      <HStack spacing={4} mt={4}>
        <FormControl id="sortItem">
          <FormLabel>Сортировать по</FormLabel>
          <Select value={filter.sortItem} onChange={handleSortItemChange}>
            <option value="date">Дате</option>
            <option value="title">Заголовку</option>
          </Select>
        </FormControl>
        <FormControl id="sortOrder">
          <FormLabel>Сортировать по</FormLabel>
          <Select value={filter.sortOrder} onChange={handleSortOrderChange}>
            <option value="asc">Возрастанию</option>
            <option value="desc">Убыванию</option>
          </Select>
        </FormControl>
      </HStack>
    </Box>
  );
}