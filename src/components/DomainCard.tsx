import { Badge, Box, Heading, Stack, Text, Card } from "@chakra-ui/react";
import { Domaine } from "../intefaces/programmation";

type DomainCardProps = {
    domaine: Domaine;
  };

export const DomainCard = ({ domaine }: DomainCardProps) => {
  return (
    <Card.Root key={domaine.id} shadow="md" borderRadius="lg">
      <Card.Body>
        <Stack gap="3">
          <Box display="flex" alignItems="center" gap="2">
            <Badge
              colorPalette="blue"
              style={{ backgroundColor: domaine.color }}
              paddingX="3"
              paddingY="1"
              borderRadius="md"
            >
              {' '}
            </Badge>
            <Heading size="md">{domaine.name}</Heading>
          </Box>
          <Box>
            <Text fontSize="sm" color="gray.600" fontWeight="semibold">
              Nombre d&apos;items
            </Text>
            <Text fontSize="xl" fontWeight="bold" color="blue.600">
              {domaine.items.length}
            </Text>
          </Box>
        </Stack>
      </Card.Body>
    </Card.Root>
  );
};