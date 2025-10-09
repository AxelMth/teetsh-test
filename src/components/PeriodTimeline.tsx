import { Badge, Box, Heading, Stack, Text, Card } from "@chakra-ui/react";
import { Periode } from "../intefaces/programmation";

type PeriodCardProps = {
    periode : Periode;
  };

export const PeriodCard = ({ periode }: PeriodCardProps) => {
  return (
    <Card.Root key={periode.id} shadow="md" borderRadius="lg">
      <Card.Body>
        <Stack gap="3">
          <Box display="flex" alignItems="center" gap="2">
            <Badge
              colorPalette="blue"
              style={{ backgroundColor: periode.color }}
              paddingX="3"
              paddingY="1"
              borderRadius="md"
            >
              {' '}
            </Badge>
            <Heading size="md">{periode.name}</Heading>
          </Box>
          <Stack gap="2">
            <Box>
              <Text fontSize="sm" color="gray.600" fontWeight="semibold">
                Date de début
              </Text>
              <Text fontSize="md">
                {new Date(periode.startDate).toLocaleDateString('fr-FR')}
              </Text>
            </Box>
            <Box>
              <Text fontSize="sm" color="gray.600" fontWeight="semibold">
                Date de fin
              </Text>
              <Text fontSize="md">
                {new Date(periode.endDate).toLocaleDateString('fr-FR')}
              </Text>
            </Box>
          </Stack>
        </Stack>
      </Card.Body>
    </Card.Root>
  );
};