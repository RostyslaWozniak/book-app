export function availabilityTimeToInt(time: string) {
  return parseFloat(time.replace(":", "."));
}
