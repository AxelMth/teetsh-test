import { Box, Heading, Badge } from '@chakra-ui/react';
import { Domaine, Matiere } from '../intefaces/programmation';
import { getColor, getBackgroundColor } from '../helpers/colors';

type DomainHeaderProps = {
  domain: Domaine;
  matiere?: Matiere;
};

export const DomainHeader = ({ domain, matiere }: DomainHeaderProps) => {
  return (
    <Box
      borderRight="2px solid"
      borderBottom="2px solid"
      borderColor="gray.300"
      p="3"
      bg="white"
      borderLeft="3px solid"
      style={{ borderLeftColor: getColor(domain.color) }}
    >
      <Heading size="sm" mb="1">
        {domain.name}
      </Heading>
      {matiere && (
        <Badge
          size="sm"
          variant="subtle"
          color={getColor(matiere.color)}
          backgroundColor={getBackgroundColor(matiere.color)}
        >
          {matiere.name}
        </Badge>
      )}
    </Box>
  );
};

