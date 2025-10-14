import { useMemo } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Spinner,
  Stack,
} from '@chakra-ui/react';

import { useProgrammation } from './hooks/useProgrammation';
import { Matiere } from './intefaces/programmation';
import { ProgrammationMatrix } from './components/ProgrammationMatrix';

function App() {
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
      <Container maxWidth="1600px">
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
            <ProgrammationMatrix
              periods={sortedPeriodes}
              domains={domains}
              matieres={data?.data.matieres || []}
            />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}

export default App;