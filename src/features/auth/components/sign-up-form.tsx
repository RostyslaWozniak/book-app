"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/shadcn-ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/shadcn-ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@/components/ui/loading-button";
import { useState, useTransition } from "react";
import { signUpSchema, type SignUpSchema } from "../schemas/sign-up-schema";
import { signUpAction } from "../actions/sign-up-action";

export function SignUpForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
  });

  async function onSubmit(formData: SignUpSchema) {
    setError(null);
    startTransition(async () => {
      const error = await signUpAction(formData);
      if (error) {
        startTransition(() => {
          setError(error);
        });
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center justify-between">
                Twoje imie *
                {form.formState.errors.firstName && (
                  <p className="text-destructive text-xs">
                    {form.formState.errors.firstName.message}
                  </p>
                )}
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  autoComplete="first name"
                  placeholder="Jan"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center justify-between">
                Twoje nazwisko *
                {form.formState.errors.lastName && (
                  <p className="text-destructive text-xs">
                    {form.formState.errors.lastName.message}
                  </p>
                )}
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  autoComplete="last name"
                  placeholder="Kowalski"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center justify-between">
                Twój E-mail *
                {form.formState.errors.email && (
                  <p className="text-destructive text-xs">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  autoComplete="email"
                  placeholder="twój-email@mail.com"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {error && <div className="text-destructive text-sm">{error}</div>}
        <LoadingButton loading={isPending} type="submit" className="w-full">
          Zarejestruj się
        </LoadingButton>
      </form>
    </Form>
  );
}
