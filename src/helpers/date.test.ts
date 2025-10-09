import { getDurationInDays } from './date';

describe('getDurationInDays', () => {
  test('should return 0 when the start date is the same as the end date', () => {
    expect(getDurationInDays('2025-01-01', '2025-01-01')).toBe(0);
  });

  test('should return 0 when the start date is after the end date', () => {
    expect(getDurationInDays('2025-01-05', '2025-01-01')).toBe(0);
  });

  test('should return the correct duration for a few days', () => {
    expect(getDurationInDays('2025-01-01', '2025-01-05')).toBe(4);
  });

  test('should return correct duration for one day difference', () => {
    expect(getDurationInDays('2025-01-01', '2025-01-02')).toBe(1);
  });

  test('should return correct duration for a month', () => {
    expect(getDurationInDays('2025-01-01', '2025-02-01')).toBe(31);
  });

  test('should return correct duration for a year', () => {
    expect(getDurationInDays('2025-01-01', '2026-01-01')).toBe(365);
  });

  test('should handle leap year correctly', () => {
    expect(getDurationInDays('2024-01-01', '2025-01-01')).toBe(366);
  });

  test('should handle dates across months correctly', () => {
    expect(getDurationInDays('2025-01-15', '2025-03-15')).toBe(59);
  });

  test('should handle ISO date format with time', () => {
    expect(getDurationInDays('2025-01-01T00:00:00', '2025-01-05T00:00:00')).toBe(
      4
    );
  });

  test('should handle dates with different formats', () => {
    expect(getDurationInDays('2025/01/01', '2025/01/10')).toBe(9);
  });
});
