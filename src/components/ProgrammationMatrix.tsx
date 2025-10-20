import { Box, Grid, Text } from '@chakra-ui/react';
import { Domaine, Item, Matiere, Periode } from '../intefaces/programmation';
import { Header } from './Header';
import { ProgrammationCell } from './ProgrammationCell';
import { ProgrammationViewMode } from '../constants/programmation.const';
import { useMemo } from 'react';
import { getMatrix } from '../helpers/matrix';

type ProgrammationMatrixProps = {
  viewMode: ProgrammationViewMode;
  periods: Periode[];
  domains: Domaine[];
};

export const ProgrammationMatrix = ({
  viewMode,
  periods,
  domains,
}: ProgrammationMatrixProps) => {
  const { rows, columns } = getMatrix(
    viewMode,
    periods,
    domains
  )
  const items = domains.flatMap((domain) => domain.items)
  
  const getItemsForCell = (rowId: string, columnId: string) => {
    const domainId =
      viewMode === ProgrammationViewMode.DOMAINES ? columnId : rowId;
    const periodId =
      viewMode === ProgrammationViewMode.PERIODES ? columnId : rowId;
    // TODO: Optimize by using maps
    return items.filter(
      (item) => item.domaineId === domainId && item.periodeId === periodId
    );
  };

  return (
    <Box overflowX="auto" pb="4">
      <Box minWidth="fit-content">
        {/* Header row with periods */}
        <Grid
          templateColumns={`200px repeat(${columns.length}, 250px)`}
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

          {columns.map((c) => (
            <Header key={c.id} title={c.title} color={c.color} />
          ))}
        </Grid>

        {/* Data rows */}
        {rows.map((row) => {
          return (
            <Grid
              key={row.id}
              templateColumns={`200px repeat(${columns.length}, 250px)`}
              gap="0"
              borderLeft="2px solid"
              borderColor="gray.300"
            >
              <Header title={row.title} color={row.color} />

              {columns.map((column) => {
                const items = getItemsForCell(row.id, column.id);
                return (
                  <ProgrammationCell
                    key={`${row.id}-${column.id}`}
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
