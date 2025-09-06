export const dateFormatter = new Intl.DateTimeFormat("pl-PL", {
  dateStyle: "medium",
  // timeZone: "UTC",
});

export function dateToString(date?: Date): string | null {
  if (!date) return null;
  return dateFormatter.format(date);
}
