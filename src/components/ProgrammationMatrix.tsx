import { Box, Grid, Heading, Text, Card, Badge, Stack } from '@chakra-ui/react';
import { Domaine, Matiere, Periode, Item } from '../intefaces/programmation';
import { getColor, getBackgroundColor } from '../helpers/colors';

type ProgrammationMatrixProps = {
  periods: Periode[];
  domains: Domaine[];
  matieres: Matiere[];
};

const ItemCard = ({ item }: { item: Item }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'done':
        return { bg: 'green.100', color: 'green.700' };
      case 'inProgress':
        return { bg: 'blue.100', color: 'blue.700' };
      case 'todo':
        return { bg: 'gray.100', color: 'gray.700' };
      default:
        return { bg: 'gray.100', color: 'gray.700' };
    }
  };

  const statusColors = getStatusColor(item.status);

  return (
    <Card.Root
      size="sm"
      shadow="sm"
      borderRadius="md"
      bg={statusColors.bg}
      mb="2"
    >
      <Card.Body p="2">
        <Text fontSize="xs" color={statusColors.color} fontWeight="medium">
          {item.value}
        </Text>
      </Card.Body>
    </Card.Root>
  );
};

export const ProgrammationMatrix = ({
  periods,
  domains,
  matieres,
}: ProgrammationMatrixProps) => {
  // Get items for a specific domain and period
  const getItemsForCell = (domaineId: string, periodeId: string): Item[] => {
    const domain = domains.find((d) => d.id === domaineId);
    if (!domain) return [];
    return domain.items.filter((item) => item.periodeId === periodeId);
  };

  const getMatiereForDomain = (domaineId: string): Matiere | undefined => {
    return matieres.find((m) => m.domaines.some((d) => d.id === domaineId));
  };

  return (
    <Box overflowX="auto" pb="4">
      <Box minWidth="fit-content">
        {/* Header row with periods */}
        <Grid
          templateColumns={`200px repeat(${periods.length}, 250px)`}
          gap="0"
          borderTop="2px solid"
          borderLeft="2px solid"
          borderColor="gray.300"
        >
          {/* Top-left corner cell */}
          <Box
            borderRight="2px solid"
            borderBottom="2px solid"
            borderColor="gray.300"
            p="4"
            bg="gray.100"
            fontWeight="bold"
          >
            <Text fontSize="sm" fontWeight="bold" color="gray.700">
              Domaines / Périodes
            </Text>
          </Box>

          {/* Period headers */}
          {periods.map((period) => (
            <Box
              key={period.id}
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
          ))}
        </Grid>

        {/* Data rows */}
        {domains.map((domain) => {
          const matiere = getMatiereForDomain(domain.id);
          return (
            <Grid
              key={domain.id}
              templateColumns={`200px repeat(${periods.length}, 250px)`}
              gap="0"
              borderLeft="2px solid"
              borderColor="gray.300"
            >
              {/* Domain header cell */}
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

              {/* Cells for each period */}
              {periods.map((period) => {
                const items = getItemsForCell(domain.id, period.id);
                return (
                  <Box
                    key={`${domain.id}-${period.id}`}
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
              })}
            </Grid>
          );
        })}
      </Box>
    </Box>
  );
};