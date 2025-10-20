import { Badge, Card, Text } from '@chakra-ui/react';
import { Item } from '../intefaces/programmation';

type ItemCardProps = {
  item: Item;
};

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

export const ItemCard = ({ item }: ItemCardProps) => {
  const statusColors = getStatusColor(item.status);

  return (
    <Card.Root size="sm" shadow="sm" borderRadius="md" mb="2">
      <Card.Body p="2" pr="5">
        <Text
          fontSize="xs"
          fontWeight="medium"
          dangerouslySetInnerHTML={{ __html: item.value }}
        />
        <Badge
          top="0"
          right="0"
          position="absolute"
          borderBottomLeftRadius="md"
          backgroundColor={statusColors.bg}
          height="4px"
          colorScheme={statusColors.color}
        >
          {item.status}
        </Badge>
      </Card.Body>
    </Card.Root>
  );
};
