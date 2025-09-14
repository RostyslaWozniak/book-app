import {
  createContext,
  use,
  useEffect,
  useMemo,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { CALENDAR_CONFIG } from "../configs/config";
import {
  filterAppointmentsForWeek,
  generateTimeSlots,
  generateWeekDays,
  getDateFromWeekAndYear,
} from "../lib/utils";
import { $Enums } from "@prisma/client";
import { getWeekDateRange } from "../lib/utils/get-month-date-range";
import { api } from "@/trpc/react";
import { useQueryState, type Options } from "nuqs";
import type { AvailabilityType } from "../types/availability";
import type { AppointmentType, WeekDayInfo } from "../types/appointment";
import { getWeek } from "@/lib/utils/date";
import { getLocalStorageItem } from "@/lib/utils/local-storage";
import type { CalendarPreferences } from "../types";

type ScheduleCalendarContextType = {
  cellSize: number;
  isAppointmentsLoading: boolean;
  setCellSize: Dispatch<SetStateAction<number>>;
  startHour: number;
  setStartHour: Dispatch<SetStateAction<number>>;
  visibleHours: number;
  setVisibleHours: Dispatch<SetStateAction<number>>;
  timeSlots: string[];
  week: number;
  todayWeek: number;
  year: number;
  todayYear: number;
  setWeek: (
    value: number | ((old: number) => number | null) | null,
    options?: Options,
  ) => Promise<URLSearchParams>;
  setYear: (
    value: number | ((old: number) => number | null) | null,
    options?: Options,
  ) => Promise<URLSearchParams>;

  statuses: $Enums.AppointmentStatus[];
  setStatuses: Dispatch<SetStateAction<$Enums.AppointmentStatus[]>>;
  weekDays: WeekDayInfo[];
  visibleAppointments: AppointmentType[];
};

export const ScheduleCalendarContext =
  createContext<ScheduleCalendarContextType | null>(null);

export const ScheduleCalendarContextProvider = ({
  children,
  values,
}: {
  children: React.ReactNode;
  values: {
    providerId: string | undefined;
    availabilities: AvailabilityType[];
  };
}) => {
  const todayDate = new Date();
  const todayWeek = getWeek(todayDate);
  const todayYear = todayDate.getFullYear();

  const [week, setWeek] = useQueryState("week", {
    defaultValue: todayWeek,
    parse: parseInt,
  });
  const [year, setYear] = useQueryState("year", {
    defaultValue: todayYear,
    parse: parseInt,
  });

  // CALENDAR VIEW
  const [cellSize, setCellSize] = useState(CALENDAR_CONFIG.DEFAULT_CELL_SIZE);
  const [startHour, setStartHour] = useState<number>(
    CALENDAR_CONFIG.DEFAULT_START_HOURS,
  );
  const [visibleHours, setVisibleHours] = useState<number>(
    CALENDAR_CONFIG.DEFAULT_VISIBLE_HOURS,
  );

  const [statuses, setStatuses] = useState<$Enums.AppointmentStatus[]>(
    Object.values($Enums.AppointmentStatus),
  );

  // Generate time slots
  const timeSlots = useMemo(
    () => generateTimeSlots(visibleHours, startHour),
    [visibleHours, startHour],
  );

  const currentDate = useMemo(
    () => getDateFromWeekAndYear(week, year),
    [week, year],
  );
  // Generate week days data
  const weekDays = useMemo(
    () => generateWeekDays(currentDate, values.availabilities),
    [currentDate, values.availabilities],
  );

  const { start, end } = getWeekDateRange(year.toString(), week.toString());

  const { data: appointments, isLoading: isAppointmentsLoading } =
    values.providerId
      ? api.admin.provider.getAppointmentsByProviderId.useQuery({
          providerId: values.providerId,
          startDate: start,
          endDate: end,
        })
      : api.provider.appointment.getAllOwn.useQuery({
          startDate: start,
          endDate: end,
        });

  // Filter appointments for the current week view
  const visibleAppointments = useMemo(
    () => filterAppointmentsForWeek(appointments, weekDays, statuses),
    [weekDays, appointments, statuses],
  );

  useEffect(() => {
    console.log({ start, end });
  }, [start, end]);

  useEffect(() => {
    const calendarPreferences = getLocalStorageItem<CalendarPreferences>(
      "calendar_preferences",
    );
    if (calendarPreferences) {
      setCellSize(calendarPreferences.cellSize);
      setStartHour(calendarPreferences.startHour);
      setVisibleHours(calendarPreferences.visibleHours);
    }
  }, []);

  return (
    <ScheduleCalendarContext.Provider
      value={{
        cellSize,
        isAppointmentsLoading,
        setCellSize,
        startHour,
        setStartHour,
        visibleHours,
        setVisibleHours,
        timeSlots,
        week,
        todayWeek,
        year,
        todayYear,
        setWeek,
        setYear,
        statuses,
        setStatuses,
        weekDays,
        visibleAppointments,
      }}
    >
      {children}
    </ScheduleCalendarContext.Provider>
  );
};

export const useScheduleCalendarContext = () => {
  const context = use(ScheduleCalendarContext);

  if (context === null) {
    throw new Error(
      "ScheduleCalendarContext must be used within a ScheduleCalendarContextProvider",
    );
  }

  return context;
};
