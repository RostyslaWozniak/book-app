"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn-ui/form";
import { Input } from "@/components/shadcn-ui/input";
import { phoneNumberValidation } from "@/lib/validation-common";
import { LoadingButton } from "@/components/ui/loading-button";
import { useSearchParams } from "next/navigation";
import type { ClientProfile } from "../../types/client-profile.type";

const formSchema = z.object({
  fistName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  phoneNumber: phoneNumberValidation,
});
export function EditProfileForm({ profile }: { profile: ClientProfile }) {
  const searchParams = useSearchParams();
  const phoneSeachParams = searchParams.get("phoneNumber");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fistName: profile.firstName,
      lastName: profile.lastName,
      phoneNumber: profile.phoneNumber ?? "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="@container max-w-2xl space-y-8"
      >
        <div className="grid items-start gap-4 @min-xl:grid-cols-2">
          <FormField
            control={form.control}
            name="fistName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Imię</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Jan"
                    type="text"
                    autoComplete="first name"
                    autoFocus={!phoneSeachParams}
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nazwisko</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Kowalski"
                    type="text"
                    autoComplete="last name"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Numer telefonu</FormLabel>
                <FormControl>
                  <Input
                    placeholder="+48 XXX XXX XXX"
                    autoFocus={!!phoneSeachParams}
                    autoComplete="tel"
                    type="tel"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <LoadingButton
          loading={false}
          type="submit"
          disabled={!form.formState.isDirty}
          className="w-full sm:ml-auto sm:w-auto"
        >
          Zapisz
        </LoadingButton>
      </form>
    </Form>
  );
}
