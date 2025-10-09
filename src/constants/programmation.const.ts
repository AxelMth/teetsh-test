export const ProgrammationTabs = {
  PERIODES: 'periodes',
  DOMAINES: 'domaines',
} as const;

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type ProgrammationTabs =
  (typeof ProgrammationTabs)[keyof typeof ProgrammationTabs];
