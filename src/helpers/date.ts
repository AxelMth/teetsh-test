export const getDurationInDays = (startDate: string, endDate: string): number => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  if (start > end) {
    return 0;
  }
  return Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
}
