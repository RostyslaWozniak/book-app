import { EmptyResult } from "@/components/ui/empty-result";
import { MaxWidthWrapper } from "@/components/ui/max-width-wrapper";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { ScheduleCalendar } from "@/features/schedule-calendar";
import { getWeekDateRange } from "@/features/schedule-calendar/lib/utils/get-month-date-range";
import { api } from "@/trpc/server";
import { ClockIcon } from "lucide-react";
import { notFound } from "next/navigation";

export default async function AdminSchedulePage({
  params,
  searchParams,
}: {
  params: Promise<{ providerSlug: string }>;
  searchParams: Promise<{ year: string; week: string }>;
}) {
  const { providerSlug } = await params;

  const { year, week } = await searchParams;

  const { start: weekStartDate, end: weekEndDate } = getWeekDateRange(
    year,
    week,
  );

  const provider = await api.admin.provider.getProfileBySlug(providerSlug);

  if (provider == null) return notFound();

  const availabilities = await api.admin.provider.getAvailabilities({
    providerId: provider.id,
  });

  return (
    <>
      <SectionWrapper paddingBlock="xs">
        <MaxWidthWrapper>
          {availabilities.length > 0 ? (
            <ScheduleCalendar
              availabilities={availabilities}
              weekStartDate={weekStartDate}
              weekEndDate={weekEndDate}
              providerId={provider.id}
            />
          ) : (
            <EmptyResult
              title="Brak dostępności weterynarza"
              description={`Weterynarz ${provider.user.firstName} ${provider.user.firstName} nie dodał jeszcze swojej dostępności. Może to zrobić w swoim panelu w zakładce „Dostępność”.`}
              icon={ClockIcon}
              className="mt-8"
            />
          )}
        </MaxWidthWrapper>
      </SectionWrapper>
    </>
  );
}
