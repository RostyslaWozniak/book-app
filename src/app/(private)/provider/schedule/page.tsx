import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { ScheduleCalendar } from "@/features/schedule-calendar";
import { getWeekDateRange } from "@/features/schedule-calendar/lib/utils/get-month-date-range";
import { api } from "@/trpc/server";

export default async function ProviderSchedulePage({
  searchParams,
}: {
  searchParams: Promise<{ year: string; week: string }>;
}) {
  const { year, week } = await searchParams;

  const { start: weekStartDate, end: weekEndDate } = getWeekDateRange(
    year,
    week,
  );

  const availabilities = await api.provider.availability.getOwnAvailabilities();

  return (
    <>
      <SectionWrapper paddingBlock="xs">
        <MaxWidthWrapper>
          <ScheduleCalendar
            availabilities={availabilities}
            weekStartDate={weekStartDate}
            weekEndDate={weekEndDate}
          />
        </MaxWidthWrapper>
      </SectionWrapper>
    </>
  );
}
