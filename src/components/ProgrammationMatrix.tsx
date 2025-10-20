import { Box, Grid, Text } from '@chakra-ui/react';
import { Domaine, Matiere, Periode } from '../intefaces/programmation';
import { Header } from './Header';
import { DomainHeader } from './DomainHeader';
import { ProgrammationCell } from './ProgrammationCell';
import { ProgrammationViewMode } from '../constants/programmation.const';

type ProgrammationMatrixProps = {
  viewMode: ProgrammationViewMode
  periods: Periode[];
  domains: Domaine[];
  matieres: Matiere[];
};

export const ProgrammationMatrix = ({
  viewMode,
  periods,
  domains,
  matieres,
}: ProgrammationMatrixProps) => {
  // Get items for a specific domain and period
  const getItemsForCell = (domaineId: string, periodeId: string) => {
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
            <Header key={period.id} title={period.name} color={period.color} />
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
              <DomainHeader domain={domain} matiere={matiere} />

              {/* Cells for each period */}
              {periods.map((period) => {
                const items = getItemsForCell(domain.id, period.id);
                return (
                  <ProgrammationCell
                    key={`${domain.id}-${period.id}`}
                    items={items}
                  />
                );
              })}
            </Grid>
          );
        })}
      </Box>
    </Box>
  );
};
