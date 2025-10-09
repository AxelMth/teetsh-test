import { Box, Heading, Stack, Text, Card, Badge } from '@chakra-ui/react';
import { Domaine, Matiere } from '../intefaces/programmation';
import { getColor, getBackgroundColor } from '../helpers/colors';

type DomainCardProps = {
  domaine: Domaine;
  matiere: Matiere;
};

export const DomainCard = ({ domaine, matiere }: DomainCardProps) => {
  const todoItems = domaine.items.filter((item) => item.status === 'todo');
  const inProgressItems = domaine.items.filter(
    (item) => item.status === 'inProgress'
  );
  const doneItems = domaine.items.filter((item) => item.status === 'done');
  return (
    <Card.Root
      key={domaine.id}
      shadow="md"
      borderRadius="lg"
      borderLeft="4px solid"
      style={{ borderLeftColor: getColor(domaine.color) }}
    >
      <Card.Body>
        <Stack gap="3">
          <Box
            display="flex"
            alignItems="center"
            gap="2"
            justifyContent="space-between"
          >
            <Heading size="md">{domaine.name}</Heading>
            <Badge
              colorPalette="blue"
              variant="subtle"
              color={getColor(matiere.color)}
              backgroundColor={getBackgroundColor(matiere.color)}
            >
              {matiere.name}
            </Badge>
          </Box>
          <Box>
            <Text fontSize="sm" color="gray.600" fontWeight="semibold">
              Liste des tâches
            </Text>
            <Badge
              colorPalette="blue"
              variant="subtle"
              color="gray.600"
              backgroundColor="gray.100"
            >
              {todoItems.length} à faire
            </Badge>
            &nbsp;
            <Badge
              colorPalette="blue"
              variant="subtle"
              color="blue.600"
              backgroundColor="blue.100"
            >
              {inProgressItems.length} en cours
            </Badge>
            &nbsp;
            <Badge
              colorPalette="blue"
              variant="subtle"
              color="green.600"
              backgroundColor="green.100"
            >
              {doneItems.length} terminé
            </Badge>
          </Box>
        </Stack>
      </Card.Body>
    </Card.Root>
  );
};
