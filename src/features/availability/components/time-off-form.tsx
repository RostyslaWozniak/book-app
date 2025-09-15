"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { eachDayOfInterval, format } from "date-fns";
import { Calendar } from "@/components/shadcn-ui/calendar";
import { Button } from "@/components/shadcn-ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn-ui/form";
import { Input } from "@/components/shadcn-ui/input";
import { Switch } from "@/components/shadcn-ui/switch";
import { Textarea } from "@/components/shadcn-ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcn-ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import type { DateRange } from "react-day-picker";
import {
  clientCreateProviderScheduleOverride,
  type ClientCreateProviderScheduleOverride,
} from "../lib/validation/provider-schedule-override";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import type { ProviderScheduleOverride } from "@prisma/client";

type TimeOffFormProps = {
  initialData?: ProviderScheduleOverride;
  mode: "holidays" | "overrides";
};

export function TimeOffForm({ initialData, mode }: TimeOffFormProps) {
  const router = useRouter();
  const { mutate: createOverride } =
    api.provider.availability.override.create.useMutation({
      onSuccess: () => {
        toast.success("Time off added successfully");
        router.push("/provider/availability/holidays");
      },
      onError: ({ message }) => {
        toast.error(message);
      },
    });
  const { mutate: updateOverride } =
    api.provider.availability.override.update.useMutation({
      onSuccess: () => {
        toast.success("Time off added successfully");
        router.push("/provider/availability/holidays");
      },
      onError: ({ message }) => {
        toast.error(message);
      },
    });
  const { mutate: deleteOverride } =
    api.provider.availability.override.delete.useMutation({
      onSuccess: () => {
        toast.success("Time off deleted successfully");
        router.refresh();
      },
      onError: ({ message }) => {
        toast.error(message);
      },
    });

  const [isRange, setIsRange] = useState(
    // initialData
    //   ? initialData.startDate.getTime() !== initialData.endDate.getTime()
    //   : false,
    false,
  );

  const form = useForm<ClientCreateProviderScheduleOverride>({
    resolver: zodResolver(clientCreateProviderScheduleOverride),
    defaultValues: {
      startDate: new Date(),
      endDate: new Date(),
      isAvailable: initialData?.isAvailable ?? mode === "overrides",
      startTime: initialData?.startTime ?? "09:00",
      endTime: initialData?.endTime ?? "17:00",
      reason: initialData?.reason ?? "",
    },
  });

  const handleRangeSelect = (range: DateRange | undefined) => {
    if (range?.from) {
      form.setValue("startDate", range.from);
      form.setValue("endDate", range.to ?? range.from);
      setIsRange(!!range.to && range.to.getTime() !== range.from.getTime());
    }
  };

  function onSubmit(data: ClientCreateProviderScheduleOverride) {
    const dates = eachDayOfInterval({
      start: data.startDate,
      end: data.endDate,
    });
    if (initialData) {
      updateOverride({ ...data, overrideId: initialData.id });
    } else {
      createOverride({
        isAvailable: mode === "overrides",
        dates,
        reason: data.reason,
        startTime: data.startTime,
        endTime: data.endTime,
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date Range</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          isRange ? (
                            <>
                              {format(field.value, "PPP")} -{" "}
                              {format(form.getValues("endDate"), "PPP")}
                            </>
                          ) : (
                            format(field.value, "PPP")
                          )
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="range"
                      selected={{
                        from: field.value,
                        to: form.getValues("endDate"),
                      }}
                      onSelect={handleRangeSelect}
                      disabled={(date) =>
                        date < new Date(new Date().setHours(0, 0, 0, 0))
                      }
                      autoFocus
                      numberOfMonths={2}
                      showOutsideDays
                      fixedWeeks
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          {mode === "overrides" && (
            <FormField
              control={form.control}
              name="isAvailable"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Partial Day</FormLabel>
                    <div className="text-muted-foreground text-sm">
                      Set specific hours for this day
                    </div>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          )}
        </div>

        {mode === "overrides" && form.watch("isAvailable") && (
          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="startTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Time</FormLabel>
                  <FormControl>
                    <Input type="time" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Time</FormLabel>
                  <FormControl>
                    <Input type="time" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        <FormField
          control={form.control}
          name="reason"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Przyczyna </FormLabel>
              <FormControl>
                <Textarea
                  placeholder={`Wpisz przyczynę ${mode === "holidays" ? "urlopu" : "zmiany godzin pracy"}`}
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">
          {initialData
            ? `Zapisz ${mode === "holidays" ? "urlop" : "zmianę godzin pracy"}`
            : `Dodaj ${mode === "holidays" ? "urlop" : "zmianę godzin pracy"}`}
        </Button>
      </form>
    </Form>
  );
}
