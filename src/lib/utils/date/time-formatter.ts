export const timeFormatter = new Intl.DateTimeFormat("pl-PL", {
  hour: "numeric",
  minute: "numeric",
  timeZone: "Europe/Warsaw",
});

export function dateToTimeString(date?: Date) {
  if (!date) return null;
  return timeFormatter.format(date);
}
