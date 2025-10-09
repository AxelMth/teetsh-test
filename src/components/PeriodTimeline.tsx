import { Box, Heading, Stack, Text, Card, Flex } from '@chakra-ui/react';
import { Periode } from '../intefaces/programmation';
import { getColor } from '../helpers/colors';
import { getDurationInDays } from '../helpers/date';

type PeriodTimelineProps = {
  periods: Periode[];
};

export const PeriodTimeline = ({ periods }: PeriodTimelineProps) => {
  return (
    <Stack gap="0" position="relative">
      {periods.map((periode, index) => (
        <Flex
          key={periode.id}
          position="relative"
          gap="6"
          pb={index !== periods.length - 1 ? '8' : '0'}
        >
          {/* Timeline column */}
          <Box
            position="relative"
            display="flex"
            flexDirection="column"
            alignItems="center"
            width="40px"
          >
            {/* Vertical line - continuous from top to bottom */}
            {index !== periods.length - 1 && (
              <Box
                position="absolute"
                top="0"
                width="2px"
                height="calc(100% + 32px)"
                bg="gray.300"
                zIndex="1"
              />
            )}
            {index !== 0 && index === periods.length - 1 && (
              <Box
                position="absolute"
                top="0"
                width="2px"
                height="16px"
                bg="gray.300"
                zIndex="1"
              />
            )}

            {/* Date on left */}
            {
              <Text
                position="absolute"
                right="calc(50% + 20px)"
                top="10px"
                fontSize="sm"
                fontWeight="semibold"
                color="gray.700"
                whiteSpace="nowrap"
              >
                {new Date(periode.startDate).toLocaleDateString('fr-FR')}
              </Text>
            }

            {/* Timeline point */}
            <Box
              width="12px"
              height="12px"
              borderRadius="full"
              bg="black"
              zIndex="2"
              mt="4"
            />
          </Box>

          {/* Period card */}
          <Box flex="1" mt="0">
            <Card.Root
              shadow="md"
              borderRadius="lg"
              borderLeft="4px solid"
              style={{ borderLeftColor: getColor(periode.color) }}
            >
              <Card.Body>
                <Stack gap="3">
                  <Box display="flex" alignItems="center" gap="2">
                    <Heading size="md">{periode.name}</Heading>
                  </Box>
                  <Stack gap="2">
                    <Box>
                      <Text
                        fontSize="sm"
                        color="gray.600"
                        fontWeight="semibold"
                      >
                        Date de fin
                      </Text>
                      <Text fontSize="md">
                        {new Date(periode.endDate).toLocaleDateString('fr-FR')}
                      </Text>
                    </Box>
                    <Box>
                      <Text
                        fontSize="sm"
                        color="gray.600"
                        fontWeight="semibold"
                      >
                        Durée de la période (en jours)
                      </Text>
                      <Text fontSize="md">
                        {getDurationInDays(periode.startDate, periode.endDate)}
                      </Text>
                    </Box>
                  </Stack>
                </Stack>
              </Card.Body>
            </Card.Root>
          </Box>
        </Flex>
      ))}
    </Stack>
  );
};
