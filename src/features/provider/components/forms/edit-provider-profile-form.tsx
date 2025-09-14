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
import { Textarea } from "@/components/shadcn-ui/textarea";
import { LoadingButton } from "@/components/ui/loading-button";
import { useRouter, useSearchParams } from "next/navigation";
import type { ProviderProfile } from "@/features/profile/types/provider-profile.type";
import {
  providerProfileSchema,
  type ProviderProfileSchema,
} from "../../lib/validation/provider-profile-schema";
import { api } from "@/trpc/react";
import { toast } from "sonner";

export function EditProviderProfileForm({
  profile,
}: {
  profile: ProviderProfile;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const phoneSeachParams = searchParams.get("phoneNumber");

  const form = useForm<ProviderProfileSchema>({
    resolver: zodResolver(providerProfileSchema),
    defaultValues: {
      fistName: profile.firstName,
      lastName: profile.lastName,
      phoneNumber: profile.phoneNumber ?? "",
      slug: profile.slug,
      description: profile.description ?? undefined,
    },
  });

  const { mutate: updateProfile, isPending } =
    api.provider.profile.update.useMutation({
      onSuccess: () => {
        router.push("/provider/profile");
      },
      onError: ({ message }) => {
        toast.error(message);
      },
    });

  function onSubmit(values: ProviderProfileSchema) {
    updateProfile(values);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="@container max-w-4xl space-y-8"
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
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Url</FormLabel>
                <FormControl>
                  <Input placeholder="jan-kowalski" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="@min-xl:col-span-2">
                <FormLabel>Opis</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="..."
                    className="min-h-50 resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <LoadingButton
          loading={isPending}
          type="submit"
          disabled={!form.formState.isDirty}
          className="w-full sm:ml-auto sm:w-auto"
        >
          Zapisz zmiany
        </LoadingButton>
      </form>
    </Form>
  );
}
