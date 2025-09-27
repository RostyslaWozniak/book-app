"use client";

import { useRef, useState } from "react";
import { BookAppointmentFormContext } from "../../../context/book-appointment-form-context";
import { useForm } from "react-hook-form";
import {
  appointmentFromSchema,
  type AppointmentFormSchema,
} from "@/features/appointment/lib/validation/book-appointment-form-schema";
import { LoadingButton } from "@/components/ui/loading-button";

import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn-ui/form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { DateSelectDialog } from "./date-select-dialog";
import { TimeSelectDialog } from "./time-select-dialog";
import { Input } from "@/components/shadcn-ui/input";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils/cn";

export function BookAppointmentForm({
  serviceId,
  providerSlug,
  user,
}: {
  serviceId: string;
  providerSlug?: string;
  user?: {
    email: string;
    name: string;
    phone: string | null;
  };
}) {
  const [isDateDialogOpen, setIsDateDialogOpen] = useState(true);
  const [isTimeDialogOpen, setIsTimeDialogOpen] = useState(false);
  const nameInputRef = useRef<HTMLInputElement | null>(null);

  const router = useRouter();

  const form = useForm<AppointmentFormSchema>({
    resolver: zodResolver(appointmentFromSchema),
    defaultValues: {
      contactEmail: user ? user.email : "",
      contactName: user ? user.name : "",
      contactPhone: user ? (user.phone ?? "") : "",
    },
  });

  const { mutate: bookAppointment, isPending } =
    api.public.appointment.book.useMutation({
      onSuccess: () => {
        toast.success("Wizutę zarezerwowano");
        router.push(user ? "/profile" : "/");
      },
      onError: ({ message }) => {
        toast.error(message);
      },
    });
  async function onSubmit(values: AppointmentFormSchema) {
    bookAppointment({ ...values, serviceId });
  }

  const watchDate = form.watch("date");
  const resetTimeField = () => form.setValue("startTime", undefined!);

  return (
    <BookAppointmentFormContext.Provider
      value={{
        serviceId,
        providerSlug,
        resetTimeField,
        isDateDialogOpen,
        setIsDateDialogOpen,
        isTimeDialogOpen,
        setIsTimeDialogOpen,
        watchDate,
        nameInputRef,
      }}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-6"
        >
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel>Data *</FormLabel>
                <FormControl>
                  <DateSelectDialog field={field} />
                </FormControl>
                <FormMessage className="absolute top-0 right-0 w-min rounded-full bg-red-600 px-2 text-xs font-semibold text-nowrap text-white" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="startTime"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel className={cn({ "opacity-50": !watchDate })}>
                  Czas *
                </FormLabel>
                <FormControl>
                  <TimeSelectDialog field={field} />
                </FormControl>
                <FormMessage className="absolute top-0 right-0 w-min rounded-full bg-red-600 px-2 text-xs font-semibold text-nowrap text-white" />
              </FormItem>
            )}
          />
          {!user && (
            <>
              <FormField
                control={form.control}
                name="contactName"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel>Imię *</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="text-foreground"
                        placeholder="Jan Kowalski"
                        autoComplete="name"
                        type="text"
                        ref={nameInputRef}
                      />
                    </FormControl>

                    <FormMessage className="absolute top-0 right-0 w-min rounded-full bg-red-600 px-2 text-xs font-semibold text-nowrap text-white" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contactEmail"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel className="">Email * </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="text-foreground"
                        placeholder="twój-email@mail.com"
                        autoComplete="email"
                        type="email"
                      />
                    </FormControl>

                    <FormMessage className="absolute top-0 right-0 w-min rounded-full bg-red-600 px-2 text-xs font-semibold text-nowrap text-white" />
                  </FormItem>
                )}
              />
            </>
          )}
          <div className="flex gap-2 sm:justify-end md:col-span-2">
            <LoadingButton
              loading={isPending}
              type="submit"
              className="sm:auto w-full md:w-min"
            >
              Zarezerwuj wizytę
            </LoadingButton>
          </div>
        </form>
      </Form>
    </BookAppointmentFormContext.Provider>
  );
}
