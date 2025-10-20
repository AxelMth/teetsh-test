import { Box, Heading, Text } from '@chakra-ui/react';
import { getColor } from '../helpers/colors';

type HeaderProps = {
  title: string
  color: string
};

export const Header = ({ title, color }: HeaderProps) => {
  return (
    <Box
      borderRight="2px solid"
      borderBottom="2px solid"
      borderColor="gray.300"
      p="3"
      bg="gray.50"
      borderTop="3px solid"
      style={{ borderTopColor: getColor(color) }}
    >
      <Heading size="sm" mb="1">
        {title}
      </Heading>
    </Box>
  );
};
