import { Box, Text, Stack } from '@chakra-ui/react';
import { Item } from '../intefaces/programmation';
import { ItemCard } from './ItemCard';

type ProgrammationCellProps = {
  items: Item[];
};

export const ProgrammationCell = ({ items }: ProgrammationCellProps) => {
  return (
    <Box
      borderRight="2px solid"
      borderBottom="2px solid"
      borderColor="gray.300"
      p="2"
      bg="white"
      minHeight="80px"
    >
      {items.length > 0 ? (
        <Stack gap="1">
          {items.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </Stack>
      ) : (
        <Box
          height="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Text fontSize="xs" color="gray.400">
            -
          </Text>
        </Box>
      )}
    </Box>
  );
};
