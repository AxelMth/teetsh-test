export const ProgrammationTabs = {
  PERIODES: 'periodes',
  DOMAINES: 'domaines',
} as const;

export type ProgrammationTabs = (typeof ProgrammationTabs)[keyof typeof ProgrammationTabs];