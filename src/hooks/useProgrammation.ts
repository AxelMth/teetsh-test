import { useQuery } from '@tanstack/react-query';
import { ProgrammationResponse } from '../intefaces/programmation';

const fetchProgrammation = async (
  documentId: string
): Promise<ProgrammationResponse> => {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const bearerToken = process.env.REACT_APP_BEARER_TOKEN;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (bearerToken) {
    headers['Authorization'] = `Bearer ${bearerToken}`;
  }

  const response = await fetch(`${baseUrl}/api/programmations/${documentId}`, {
    headers,
  });

  if (!response.ok) {
    throw new Error('Failed to fetch programmation');
  }

  return response.json();
};

export const useProgrammation = (documentId: string) => {
  return useQuery({
    queryKey: ['programmation', documentId],
    queryFn: () => fetchProgrammation(documentId),
    enabled: !!documentId,
  });
};
