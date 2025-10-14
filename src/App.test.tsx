import App from './App';

import { render, screen } from '@testing-library/react';
import { useProgrammation } from './hooks/useProgrammation';
import { ProgrammationResponse } from './intefaces/programmation';

// Mock the useProgrammation hook
jest.mock('./hooks/useProgrammation');

// Mock the ProgrammationMatrix component to simplify testing
jest.mock('./components/ProgrammationMatrix', () => ({
  ProgrammationMatrix: ({ periods, domains, matieres }: any) => (
    <div data-testid="programmation-matrix">
      <div data-testid="periods-count">{periods.length}</div>
      <div data-testid="domains-count">{domains.length}</div>
      <div data-testid="matieres-count">{matieres.length}</div>
    </div>
  ),
}));

const mockUseProgrammation = useProgrammation as jest.MockedFunction<
  typeof useProgrammation
>;

describe('App', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Set default env var
    process.env.REACT_APP_PROGRAMMATION_ID = 'test-id';
  });

  it('should render loading state', () => {
    mockUseProgrammation.mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
      isError: false,
      isSuccess: false,
      refetch: jest.fn(),
    } as any);

    render(<App />);

    expect(screen.getByTestId('chakra-spinner')).toBeInTheDocument();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should render error state', () => {
    const errorMessage = 'Failed to fetch programmation';
    mockUseProgrammation.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error(errorMessage),
      isError: true,
      isSuccess: false,
      refetch: jest.fn(),
    } as any);

    render(<App />);

    expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
  });

  it('should render programmation data successfully', () => {
    const mockData: ProgrammationResponse = {
      data: {
        id: 1,
        name: 'Test Programmation',
        shortDescription: 'Test Description',
        date: '2024-01-01',
        userId: 'user-1',
        nbOfUseLanding: 0,
        nbOfUseInApp: 0,
        schoolyearId: 'sy-1',
        schoolId: 'school-1',
        programmationId: 'prog-1',
        periodes: [
          {
            id: 'p1',
            name: 'Period 1',
            color: '#FF0000',
            endDate: '2024-03-01',
            position: 1,
            startDate: '2024-01-01',
            programmationId: 'prog-1',
          },
          {
            id: 'p2',
            name: 'Period 2',
            color: '#00FF00',
            endDate: '2024-06-01',
            position: 2,
            startDate: '2024-03-01',
            programmationId: 'prog-1',
          },
        ],
        matieres: [
          {
            id: 'm1',
            name: 'Math',
            color: '#0000FF',
            position: 1,
            programmationId: 'prog-1',
            domaines: [
              {
                id: 'd1',
                name: 'Domain 1',
                color: '#FF00FF',
                position: 2,
                matiereId: 'm1',
                items: [],
              },
              {
                id: 'd2',
                name: 'Domain 2',
                color: '#00FFFF',
                position: 1,
                matiereId: 'm1',
                items: [],
              },
            ],
          },
        ],
        columnWidth: 250,
        fontSize: 'md',
        view: 'grid',
        invertedRowCol: false,
        niveau: 'CE2',
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
        publishedAt: '2024-01-01',
        onePageMatiere: false,
        slug: 'test-programmation',
        documentId: 'doc-1',
      },
      meta: {},
    };

    mockUseProgrammation.mockReturnValue({
      data: mockData,
      isLoading: false,
      error: null,
      isError: false,
      isSuccess: true,
      refetch: jest.fn(),
    } as any);

    render(<App />);

    // Check that title and description are displayed
    expect(screen.getByText('Test Programmation')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();

    // Check that ProgrammationMatrix is rendered
    expect(screen.getByTestId('programmation-matrix')).toBeInTheDocument();
  });

  it('should sort domains by position', () => {
    const mockData: ProgrammationResponse = {
      data: {
        id: 1,
        name: 'Test Programmation',
        shortDescription: 'Test Description',
        date: '2024-01-01',
        userId: 'user-1',
        nbOfUseLanding: 0,
        nbOfUseInApp: 0,
        schoolyearId: 'sy-1',
        schoolId: 'school-1',
        programmationId: 'prog-1',
        periodes: [],
        matieres: [
          {
            id: 'm1',
            name: 'Math',
            color: '#0000FF',
            position: 1,
            programmationId: 'prog-1',
            domaines: [
              {
                id: 'd3',
                name: 'Domain 3',
                color: '#FF00FF',
                position: 3,
                matiereId: 'm1',
                items: [],
              },
              {
                id: 'd1',
                name: 'Domain 1',
                color: '#00FFFF',
                position: 1,
                matiereId: 'm1',
                items: [],
              },
              {
                id: 'd2',
                name: 'Domain 2',
                color: '#FFFF00',
                position: 2,
                matiereId: 'm1',
                items: [],
              },
            ],
          },
        ],
        columnWidth: 250,
        fontSize: 'md',
        view: 'grid',
        invertedRowCol: false,
        niveau: 'CE2',
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
        publishedAt: '2024-01-01',
        onePageMatiere: false,
        slug: 'test-programmation',
        documentId: 'doc-1',
      },
      meta: {},
    };

    mockUseProgrammation.mockReturnValue({
      data: mockData,
      isLoading: false,
      error: null,
      isError: false,
      isSuccess: true,
      refetch: jest.fn(),
    } as any);

    render(<App />);

    // Domains should be sorted by position (1, 2, 3)
    expect(screen.getByTestId('domains-count')).toHaveTextContent('3');
  });

  it('should sort periods by position', () => {
    const mockData: ProgrammationResponse = {
      data: {
        id: 1,
        name: 'Test Programmation',
        shortDescription: 'Test Description',
        date: '2024-01-01',
        userId: 'user-1',
        nbOfUseLanding: 0,
        nbOfUseInApp: 0,
        schoolyearId: 'sy-1',
        schoolId: 'school-1',
        programmationId: 'prog-1',
        periodes: [
          {
            id: 'p3',
            name: 'Period 3',
            color: '#FF0000',
            endDate: '2024-09-01',
            position: 3,
            startDate: '2024-06-01',
            programmationId: 'prog-1',
          },
          {
            id: 'p1',
            name: 'Period 1',
            color: '#00FF00',
            endDate: '2024-03-01',
            position: 1,
            startDate: '2024-01-01',
            programmationId: 'prog-1',
          },
          {
            id: 'p2',
            name: 'Period 2',
            color: '#0000FF',
            endDate: '2024-06-01',
            position: 2,
            startDate: '2024-03-01',
            programmationId: 'prog-1',
          },
        ],
        matieres: [],
        columnWidth: 250,
        fontSize: 'md',
        view: 'grid',
        invertedRowCol: false,
        niveau: 'CE2',
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
        publishedAt: '2024-01-01',
        onePageMatiere: false,
        slug: 'test-programmation',
        documentId: 'doc-1',
      },
      meta: {},
    };

    mockUseProgrammation.mockReturnValue({
      data: mockData,
      isLoading: false,
      error: null,
      isError: false,
      isSuccess: true,
      refetch: jest.fn(),
    } as any);

    render(<App />);

    // Periods should be sorted by position (1, 2, 3)
    expect(screen.getByTestId('periods-count')).toHaveTextContent('3');
  });

  it('should handle empty data gracefully', () => {
    const mockData: ProgrammationResponse = {
      data: {
        id: 1,
        name: 'Empty Programmation',
        shortDescription: 'No content',
        date: '2024-01-01',
        userId: 'user-1',
        nbOfUseLanding: 0,
        nbOfUseInApp: 0,
        schoolyearId: 'sy-1',
        schoolId: 'school-1',
        programmationId: 'prog-1',
        periodes: [],
        matieres: [],
        columnWidth: 250,
        fontSize: 'md',
        view: 'grid',
        invertedRowCol: false,
        niveau: 'CE2',
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
        publishedAt: '2024-01-01',
        onePageMatiere: false,
        slug: 'empty-programmation',
        documentId: 'doc-1',
      },
      meta: {},
    };

    mockUseProgrammation.mockReturnValue({
      data: mockData,
      isLoading: false,
      error: null,
      isError: false,
      isSuccess: true,
      refetch: jest.fn(),
    } as any);

    render(<App />);

    expect(screen.getByText('Empty Programmation')).toBeInTheDocument();
    expect(screen.getByTestId('programmation-matrix')).toBeInTheDocument();
    expect(screen.getByTestId('periods-count')).toHaveTextContent('0');
    expect(screen.getByTestId('domains-count')).toHaveTextContent('0');
    expect(screen.getByTestId('matieres-count')).toHaveTextContent('0');
  });
});
