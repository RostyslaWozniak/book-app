// import { endOfMonth, startOfMonth } from "date-fns";

// export function getMonthDateRange(
//   year: string = new Date().getFullYear().toString(),
//   month: string = new Date().getMonth().toString(),
// ) {
//   const yearNumber = parseInt(year);
//   const monthNumber = parseInt(month);

//   const start = new Date(yearNumber, monthNumber, 1);
//   const end = new Date(yearNumber, monthNumber + 1, 0, 23, 59, 59, 999); // last moment of the last day
//   return { start, end };
// }

export function getWeekDateRange(
  year: string = new Date().getFullYear().toString(),
  week: string = getCurrentISOWeek().toString(),
) {
  const yearNumber = parseInt(year, 10);
  const weekNumber = parseInt(week, 10);

  // ISO weeks always include Jan 4
  const jan4 = new Date(yearNumber, 0, 4);

  // Get the Monday of the first ISO week
  const dayOfWeek = jan4.getDay() || 7; // Sunday=0 → 7
  const firstMonday = new Date(jan4);
  firstMonday.setDate(jan4.getDate() - (dayOfWeek - 1));

  // Start of target week
  const start = new Date(firstMonday);
  start.setDate(firstMonday.getDate() + (weekNumber - 1) * 7);
  start.setHours(0, 0, 0, 0);

  // End of target week (Sunday)
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  end.setHours(23, 59, 59, 999);

  return { start, end };
}

// export function getMonthRange(month: string, year: string) {
//   const currentDate = new Date();
//   if (
//     month === currentDate.getMonth().toString() &&
//     year === currentDate.getFullYear().toString()
//   ) {
//     const baseDate = new Date();
//     return {
//       startDate: baseDate,
//       endDate: endOfMonth(baseDate),
//     };
//   }
//   const parsedMonth = parseInt(month, 10);
//   const parsedYear = parseInt(year, 10);

//   if (isNaN(parsedMonth) || isNaN(parsedYear)) {
//     throw new Error("Invalid month or year input");
//   }

//   const baseDate = new Date(parsedYear, parsedMonth); // month is 0-indexed
//   return {
//     startDate: startOfMonth(baseDate),
//     endDate: endOfMonth(baseDate),
//   };
// }

// Helper to get current ISO week number
function getCurrentISOWeek(): number {
  const date = new Date();
  const target = new Date(date.valueOf());
  const dayNumber = (date.getUTCDay() + 6) % 7; // convert Sunday from 0 to 6
  target.setUTCDate(target.getUTCDate() - dayNumber + 3); // move to Thursday of the current week
  const firstThursday = new Date(target.getUTCFullYear(), 0, 4);
  const diff = target.getTime() - firstThursday.getTime();
  return 1 + Math.round(diff / (7 * 24 * 60 * 60 * 1000));
}
