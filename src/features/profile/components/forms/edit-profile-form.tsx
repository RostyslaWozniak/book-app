"use client";

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
import { LoadingButton } from "@/components/ui/loading-button";
import { useRouter, useSearchParams } from "next/navigation";
import type { ClientProfile } from "../../types/client-profile.type";
import {
  editProfileSchema,
  type EditProfileSchema,
} from "../../lib/config/validation/edit-profile-schema";
import { api } from "@/trpc/react";
import { toast } from "sonner";

export function EditProfileForm({ profile }: { profile: ClientProfile }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const phoneSeachParams = searchParams.get("phoneNumber");

  const form = useForm<EditProfileSchema>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      firstName: profile.firstName,
      lastName: profile.lastName,
      phoneNumber: profile.phoneNumber ?? "",
    },
  });

  const { mutate: updateProfile, isPending: isUpdating } =
    api.private.user.updateProfile.useMutation({
      onSuccess: () => {
        router.push("/profile");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });

  function onSubmit(values: EditProfileSchema) {
    updateProfile(values);
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
            name="firstName"
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
          loading={isUpdating}
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
