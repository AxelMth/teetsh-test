import './App.css';
import { useMemo, useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Card,
  Spinner,
  Stack,
  Badge,
  Grid,
  Button,
  Flex,
} from '@chakra-ui/react';

import { useProgrammation } from './hooks/useProgrammation';
import { Domaine, Periode } from './intefaces/programmation';
import { Matiere } from './intefaces/programmation';

function App() {
  const [activeTab, setActiveTab] = useState<'periodes' | 'domaines'>(
    'periodes'
  );
  const { data, isLoading, error } = useProgrammation(
    'd7tfhdcchm1bom0df2z6s8zv'
  );

  const domains = useMemo(() => {
    if (!data) return [];
    const allDomains = data.data.matieres.flatMap(
      (matiere: Matiere) => matiere.domaines
    );
    // Sort by position
    return allDomains.sort((a, b) => a.position - b.position);
  }, [data]);

  const sortedPeriodes = useMemo(() => {
    if (!data) return [];
    // Sort by position
    return [...data.data.periodes].sort((a, b) => a.position - b.position);
  }, [data]);

  if (isLoading) {
    return (
      <Container centerContent padding="8">
        <Spinner size="xl" color="blue.500" />
        <Text marginTop="4">Loading...</Text>
      </Container>
    );
  }

  if (error) {
    return (
      <Container centerContent padding="8">
        <Text color="red.500" fontSize="xl">
          Error: {error.message}
        </Text>
      </Container>
    );
  }

  return (
    <Box minHeight="100vh" bg="gray.50" padding="8">
      <Container maxWidth="1200px">
        <Stack gap="6">
          <Box textAlign="center">
            <Heading size="2xl" marginBottom="2">
              {data?.data.name}
            </Heading>
            <Text fontSize="lg" color="gray.600">
              {data?.data.shortDescription}
            </Text>
          </Box>

          <Box>
            <Flex
              gap="2"
              borderBottom="2px solid"
              borderColor="gray.200"
              mb="6"
            >
              <Button
                variant={activeTab === 'periodes' ? 'solid' : 'ghost'}
                colorPalette="blue"
                onClick={() => setActiveTab('periodes')}
                borderRadius="0"
                borderBottom={activeTab === 'periodes' ? '3px solid' : 'none'}
                borderColor={
                  activeTab === 'periodes' ? 'blue.500' : 'transparent'
                }
                pb="3"
              >
                Périodes ({sortedPeriodes.length})
              </Button>
              <Button
                variant={activeTab === 'domaines' ? 'solid' : 'ghost'}
                colorPalette="blue"
                onClick={() => setActiveTab('domaines')}
                borderRadius="0"
                borderBottom={activeTab === 'domaines' ? '3px solid' : 'none'}
                borderColor={
                  activeTab === 'domaines' ? 'blue.500' : 'transparent'
                }
                pb="3"
              >
                Domaines ({domains.length})
              </Button>
            </Flex>

            {activeTab === 'periodes' && (
              <Grid
                templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
                gap="6"
                padding="6"
              >
                {sortedPeriodes.map((periode: Periode) => (
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
                            <Text
                              fontSize="sm"
                              color="gray.600"
                              fontWeight="semibold"
                            >
                              Date de début
                            </Text>
                            <Text fontSize="md">
                              {new Date(periode.startDate).toLocaleDateString(
                                'fr-FR'
                              )}
                            </Text>
                          </Box>
                          <Box>
                            <Text
                              fontSize="sm"
                              color="gray.600"
                              fontWeight="semibold"
                            >
                              Date de fin
                            </Text>
                            <Text fontSize="md">
                              {new Date(periode.endDate).toLocaleDateString(
                                'fr-FR'
                              )}
                            </Text>
                          </Box>
                        </Stack>
                      </Stack>
                    </Card.Body>
                  </Card.Root>
                ))}
              </Grid>
            )}

            {activeTab === 'domaines' && (
              <Grid
                templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
                gap="6"
                padding="6"
              >
                {domains.map((domaine: Domaine) => (
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
                          <Text
                            fontSize="sm"
                            color="gray.600"
                            fontWeight="semibold"
                          >
                            Nombre d&apos;items
                          </Text>
                          <Text
                            fontSize="xl"
                            fontWeight="bold"
                            color="blue.600"
                          >
                            {domaine.items.length}
                          </Text>
                        </Box>
                      </Stack>
                    </Card.Body>
                  </Card.Root>
                ))}
              </Grid>
            )}
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}

export default App;
