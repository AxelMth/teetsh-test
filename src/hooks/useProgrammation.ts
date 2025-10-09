import { useQuery } from '@tanstack/react-query';
import { ProgrammationResponse } from '../intefaces/programmation';

const fetchProgrammation = async (documentId: string): Promise<ProgrammationResponse> => {
  const response = await fetch(
    `https://strapi.teetsh.com/api/programmations/${documentId}`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch programmation');
  }
  
  return response.json();
};

export const useProgrammation = (documentId: string) => {
  return useQuery({
    queryKey: ['programmation', documentId],
    queryFn: () => fetchProgrammation(documentId),
    enabled: !!documentId, // Only run query if documentId exists
  });
};