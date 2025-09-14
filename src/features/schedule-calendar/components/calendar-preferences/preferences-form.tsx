"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn-ui/form";
import { useScheduleCalendarContext } from "../../context/schedule-calendar-context";
import { WheelPicker, WheelPickerWrapper } from "@/components/wheel-picker";
import { CALENDAR_CONFIG } from "../../configs/config";
import { LoadingButton } from "@/components/ui/loading-button";
import { useCalendarPreferencesContext } from "./context/calendar-preferences-context";
import { setLocalStorageItem } from "@/lib/utils/local-storage";
import type { CalendarPreferences } from "../../types";

const formSchema = z.object({
  celSize: z.number(),
  calendarStartHour: z.number(),
  calendarRangeHours: z.number(),
});

export function PreferencesForm() {
  const {
    cellSize,
    startHour,
    visibleHours,
    setVisibleHours,
    setCellSize,
    setStartHour,
  } = useScheduleCalendarContext();

  const { setIsOpen } = useCalendarPreferencesContext();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      celSize: cellSize,
      calendarStartHour: startHour,
      calendarRangeHours: visibleHours,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setCellSize(values.celSize);
    setStartHour(values.calendarStartHour);
    setVisibleHours(values.calendarRangeHours);
    setIsOpen(false);
    setLocalStorageItem<CalendarPreferences>("calendar_preferences", {
      cellSize: values.celSize,
      startHour: values.calendarStartHour,
      visibleHours: values.calendarRangeHours,
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid w-200 grid-cols-3 items-start gap-x-4">
          <FormField
            control={form.control}
            name="celSize"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rozmiar komórki:</FormLabel>
                <FormControl>
                  <WheelPickerWrapper>
                    <WheelPicker
                      options={CALENDAR_CONFIG.CELL_SIZES.map(
                        ({ label, value }) => ({
                          label: label,
                          value: String(value),
                        }),
                      )}
                      defaultValue={cellSize.toString()}
                      onValueChange={(v) => {
                        setLocalStorageItem("cell_size", v);
                        field.onChange(Number(v));
                      }}
                      visibleCount={14}
                    />
                  </WheelPickerWrapper>
                </FormControl>
                <FormDescription>
                  Wybierz odpowiedni rozmiar komórek w kalendarzu.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="calendarStartHour"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-nowrap">
                  Godzina początkowa:
                </FormLabel>
                <FormControl>
                  <WheelPickerWrapper>
                    <WheelPicker
                      options={Array.from({ length: 24 }).map((_, i) => ({
                        label: String(i),
                        value: String(i),
                      }))}
                      defaultValue={startHour.toString()}
                      onValueChange={(v) => field.onChange(Number(v))}
                      visibleCount={14}
                    />
                  </WheelPickerWrapper>
                </FormControl>
                <FormDescription>
                  Zaznacz od której godziny kalendarz powinien pokazywać
                  komórki.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="calendarRangeHours"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Zakres godzin:</FormLabel>
                <FormControl>
                  <WheelPickerWrapper>
                    <WheelPicker
                      options={Array.from({ length: 25 }).map((_, i) => ({
                        label: String(i),
                        value: String(i),
                      }))}
                      defaultValue={visibleHours.toString()}
                      onValueChange={(v) => field.onChange(Number(v))}
                      visibleCount={14}
                    />
                  </WheelPickerWrapper>
                </FormControl>
                <FormDescription>
                  Wybierz zakres godzin w kalendarzu.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <LoadingButton
          className="ml-auto"
          loading={form.formState.isLoading}
          disabled={!form.formState.isDirty}
          type="submit"
        >
          Zapisz
        </LoadingButton>
      </form>
    </Form>
  );
}
