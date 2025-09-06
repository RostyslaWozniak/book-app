import { eachDayOfInterval, format, getWeek, isSameDay } from "date-fns";
import type { DayInfo, Override, ProviderAvailability } from "./types";
import { WeekType, type ScheduleDayOfWeek } from "@prisma/client";
import { timeToMinutes } from "@/lib/utils/date";

export class AvailabilityProcessor {
  private startDate: Date;
  private endDate: Date;
  private providerAvailabilities: ProviderAvailability[];
  private serviceDurationInMinutes: number;
  private daysMap: Map<string, DayInfo>;

  constructor({
    startDate,
    endDate,
    providerAvailabilities,
    serviceDurationInMinutes,
  }: {
    startDate: Date;
    endDate: Date;
    providerAvailabilities: ProviderAvailability[];
    serviceDurationInMinutes: number;
  }) {
    this.startDate = startDate;
    this.endDate = endDate;
    this.providerAvailabilities = providerAvailabilities;
    this.serviceDurationInMinutes = serviceDurationInMinutes;

    const days = eachDayOfInterval({ start: startDate, end: endDate });
    this.daysMap = this.initializeDaysMap(days);
  }

  /**
   * Main entry point to get processed availability
   */
  public getAvailableDays(): DayInfo[] {
    const days = eachDayOfInterval({
      start: this.startDate,
      end: this.endDate,
    });

    for (const day of days) {
      const dayKey = format(day, "yyyy-MM-dd");
      const dayInfo = this.daysMap.get(dayKey)!;

      for (const provider of this.providerAvailabilities) {
        this.evaluateProviderForDay(dayInfo, provider, day);
      }
    }

    return Array.from(this.daysMap.values())
      .filter((day) => day.hasAvailableSlots)
      .sort((a, b) => a.date.getTime() - b.date.getTime());
  }

  // -----------------------------
  // Private Helpers
  // -----------------------------

  private evaluateProviderForDay(
    dayInfo: DayInfo,
    provider: ProviderAvailability,
    day: Date,
  ): boolean {
    const weekType = this.getWeekType(day);
    const dayOfWeek = format(day, "EEEE").toUpperCase() as ScheduleDayOfWeek;

    // Check overrides first
    const override = this.getDayOverride(provider.overrides, day);
    if (override && !override.isAvailable) return false;

    // Check recurring availabilities
    const hasMatchingAvailability = provider.availabilities.some(
      (availability) =>
        availability.dayOfWeek === dayOfWeek &&
        (availability.weekType === "ALL" ||
          availability.weekType === weekType) &&
        this.isDurationSufficient(
          availability.startTime,
          availability.endTime,
          this.serviceDurationInMinutes,
        ),
    );

    // If positive override exists with specific times, it counts
    const isAvailable =
      hasMatchingAvailability ||
      (override?.isAvailable === true && override.hasTimeOverride);

    if (isAvailable) {
      dayInfo.hasAvailableSlots = true;
      dayInfo.providerCount++;
      dayInfo.availableProviders.push({
        providerId: provider.providerId,
        providerName: provider.providerName,
      });
    }

    return isAvailable;
  }

  private getWeekType(date: Date): WeekType {
    const weekNumber = getWeek(date);
    return weekNumber % 2 === 0 ? WeekType.EVEN : WeekType.ODD;
  }

  private getDayOverride(
    overrides: Override[],
    day: Date,
  ): { isAvailable: boolean; hasTimeOverride: boolean } | null {
    const override = overrides.find((o) => isSameDay(o.date, day));
    if (!override) return null;

    return {
      isAvailable: override.isAvailable,
      hasTimeOverride: Boolean(override.startTime && override.endTime),
    };
  }

  private isDurationSufficient(
    startTime: string,
    endTime: string,
    requiredMinutes: number,
  ): boolean {
    return timeToMinutes(endTime) - timeToMinutes(startTime) >= requiredMinutes;
  }

  private initializeDaysMap(days: Date[]): Map<string, DayInfo> {
    const daysMap = new Map<string, DayInfo>();
    days.forEach((day) => {
      daysMap.set(format(day, "yyyy-MM-dd"), {
        date: day,
        dayOfWeek: format(day, "EEEE"),
        weekNumber: getWeek(day),
        hasAvailableSlots: false,
        providerCount: 0,
        availableProviders: [],
      });
    });
    return daysMap;
  }
}
