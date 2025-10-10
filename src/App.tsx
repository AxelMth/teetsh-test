import { useMemo, useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Spinner,
  Stack,
  Grid,
  Button,
  Flex,
} from '@chakra-ui/react';

import { useProgrammation } from './hooks/useProgrammation';
import { Domaine } from './intefaces/programmation';
import { Matiere } from './intefaces/programmation';
import { DomainCard } from './components/DomainCard';
import { ProgrammationTabs } from './constants/programmation.const';
import { PeriodTimeline } from './components/PeriodTimeline';

function App() {
  const [activeTab, setActiveTab] = useState<ProgrammationTabs>(
    ProgrammationTabs.PERIODES
  );

  const PROGRAMMATION_ID = process.env.REACT_APP_PROGRAMMATION_ID || '';
  const { data, isLoading, error } = useProgrammation(PROGRAMMATION_ID);

  const domains = useMemo(() => {
    if (!data) return [];
    const allDomains = data.data.matieres.flatMap(
      (matiere: Matiere) => matiere.domaines
    );
    return allDomains.sort((a, b) => a.position - b.position);
  }, [data]);

  const sortedPeriodes = useMemo(() => {
    if (!data) return [];
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
          <Box>
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
                variant={
                  activeTab === ProgrammationTabs.PERIODES ? 'solid' : 'ghost'
                }
                colorPalette="blue"
                onClick={() => setActiveTab(ProgrammationTabs.PERIODES)}
                borderRadius="0"
                borderBottom={
                  activeTab === ProgrammationTabs.PERIODES
                    ? '3px solid'
                    : 'none'
                }
                borderColor={
                  activeTab === ProgrammationTabs.PERIODES
                    ? 'blue.500'
                    : 'transparent'
                }
                pb="3"
              >
                Périodes ({sortedPeriodes.length})
              </Button>
              <Button
                variant={
                  activeTab === ProgrammationTabs.DOMAINES ? 'solid' : 'ghost'
                }
                colorPalette="blue"
                onClick={() => setActiveTab('domaines')}
                borderRadius="0"
                borderBottom={
                  activeTab === ProgrammationTabs.DOMAINES
                    ? '3px solid'
                    : 'none'
                }
                borderColor={
                  activeTab === 'domaines' ? 'blue.500' : 'transparent'
                }
                pb="3"
              >
                Domaines ({domains.length})
              </Button>
            </Flex>

            {activeTab === ProgrammationTabs.PERIODES && (
              <PeriodTimeline periods={sortedPeriodes} />
            )}

            {activeTab === ProgrammationTabs.DOMAINES && (
              <Grid
                templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
                gap="6"
                padding="6"
              >
                {domains.map((domaine: Domaine) => (
                  <DomainCard
                    key={domaine.id}
                    domaine={domaine}
                    matiere={
                      data?.data.matieres.find(
                        (matiere: Matiere) => matiere.id === domaine.matiereId
                      )!
                    }
                  />
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
