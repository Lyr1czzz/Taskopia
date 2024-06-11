import { Box, Input, Select, VStack, Heading } from "@chakra-ui/react";

export default function Filters({ filter, setFilter }) {
  const handleInputChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  return (
    <Box w="full">
      <VStack spacing={3}>
        <Heading size="md">Фильтры</Heading>
        <Input
          name="search"
          placeholder="Поиск"
          value={filter.search}
          onChange={handleInputChange}
        />
        <Select name="sortItem" value={filter.sortItem} onChange={handleInputChange}>
          <option value="date">По дате</option>
          <option value="title">По заголовку</option>
        </Select>
        <Select name="sortOrder" value={filter.sortOrder} onChange={handleInputChange}>
          <option value="asc">По возрастанию</option>
          <option value="desc">По убыванию</option>
        </Select>
      </VStack>
    </Box>
  );
}