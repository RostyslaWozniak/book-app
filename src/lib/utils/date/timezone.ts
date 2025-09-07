import { availabilityTimeToInt } from "@/features/availability/lib/dates";

const TIME_ZONE = "Europe/Warsaw";

export function getTimezoneOffset(timezone: string) {
  return new Intl.DateTimeFormat("pl-PL", {
    timeZone: timezone,
    timeZoneName: "shortOffset",
  })
    .formatToParts(new Date())
    .find((part) => part.type === "timeZoneName")?.value;
}

export function calculteAvailabilityTimeToUTCTimezone(time: string) {
  const timeNumber = availabilityTimeToInt(time);

  const timezoneOffsetString = getTimezoneOffset(TIME_ZONE);

  if (!timezoneOffsetString) {
    throw new Error("Invalid timezone");
  }

  const timezoneOffsetNumb = Number(timezoneOffsetString.slice(4));
  const timezoneOffsetOperator = timezoneOffsetString.slice(3, 4);

  let result: number;

  switch (timezoneOffsetOperator) {
    case "+":
      result = timeNumber - timezoneOffsetNumb;
      return result;
    case "-":
      result = timeNumber + timezoneOffsetNumb;
      return result;
    default:
      throw new Error("Invalid timezone offset operator");
  }
}
export function calculteAvailabilityTimeToCurrentTimezone(time: string) {
  const timeNumber = availabilityTimeToInt(time);

  const timezoneOffsetString = getTimezoneOffset(TIME_ZONE);

  if (!timezoneOffsetString) {
    throw new Error("Invalid timezone");
  }

  const timezoneOffsetNumb = Number(timezoneOffsetString.slice(4));
  const timezoneOffsetOperator = timezoneOffsetString.slice(3, 4);

  let result: number;

  switch (timezoneOffsetOperator) {
    case "+":
      result = timeNumber + timezoneOffsetNumb;
      return result;
    case "-":
      result = timeNumber - timezoneOffsetNumb;
      return result;
    default:
      throw new Error("Invalid timezone offset operator");
  }
}
