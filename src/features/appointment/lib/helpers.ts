import { setHours, setMinutes } from "date-fns";

export function timeStringToDate(time: string, day: Date) {
  return setMinutes(
    setHours(day, parseInt(time.split(":")[0]!)),
    parseInt(time.split(":")[1]!),
  );
}
