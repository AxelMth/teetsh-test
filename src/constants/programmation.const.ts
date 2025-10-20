export const ProgrammationViewMode = {
  PERIODES: 'periodes',
  DOMAINES: 'domaines',
} as const;

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type ProgrammationViewMode =
  (typeof ProgrammationViewMode)[keyof typeof ProgrammationViewMode];
