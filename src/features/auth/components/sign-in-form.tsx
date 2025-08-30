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
import { signInSchema, type SignInSchema } from "../schemas/sign-in-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@/components/ui/loading-button";
import { useState, useTransition } from "react";
import { signInAction } from "../actions/sign-in-action";

export function SignInForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(formData: SignInSchema) {
    setError(null);
    startTransition(async () => {
      const error = await signInAction(formData);
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center justify-between">
                <span>
                  Twój E-mail <span className="text-destructive">*</span>
                </span>
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
          Zaloguje się
        </LoadingButton>
      </form>
    </Form>
  );
}
