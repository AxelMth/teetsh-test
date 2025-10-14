import { Box, Heading, Text } from '@chakra-ui/react';
import { Periode } from '../intefaces/programmation';
import { getColor } from '../helpers/colors';

type PeriodHeaderProps = {
  period: Periode;
};

export const PeriodHeader = ({ period }: PeriodHeaderProps) => {
  return (
    <Box
      borderRight="2px solid"
      borderBottom="2px solid"
      borderColor="gray.300"
      p="3"
      bg="gray.50"
      borderTop="3px solid"
      style={{ borderTopColor: getColor(period.color) }}
    >
      <Heading size="sm" mb="1">
        {period.name}
      </Heading>
      <Text fontSize="xs" color="gray.600">
        {new Date(period.startDate).toLocaleDateString('fr-FR')} -{' '}
        {new Date(period.endDate).toLocaleDateString('fr-FR')}
      </Text>
    </Box>
  );
};
