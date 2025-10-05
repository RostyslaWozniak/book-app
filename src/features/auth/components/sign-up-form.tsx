"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/shadcn-ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoadingButton } from "@/components/ui/loading-button";
import { useState, useTransition } from "react";
import { signUpSchema, type SignUpSchema } from "../schemas/sign-up-schema";
import { signUpAction } from "../actions/sign-up-action";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/shadcn-ui/input-group";
import { MailIcon, UserIcon } from "lucide-react";

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
                <div>
                  Imie <span className="text-destructive ml-1">*</span>
                </div>
                {form.formState.errors.firstName && (
                  <p className="text-destructive text-xs">
                    {form.formState.errors.firstName.message}
                  </p>
                )}
              </FormLabel>
              <FormControl>
                <InputGroup>
                  <InputGroupInput
                    type="text"
                    autoComplete="first name"
                    placeholder="Jan"
                    {...field}
                  />
                  <InputGroupAddon>
                    <UserIcon />
                  </InputGroupAddon>
                </InputGroup>
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
                <div>
                  Nazwisko <span className="text-destructive ml-1">*</span>
                </div>
                {form.formState.errors.lastName && (
                  <p className="text-destructive text-xs">
                    {form.formState.errors.lastName.message}
                  </p>
                )}
              </FormLabel>
              <FormControl>
                <InputGroup>
                  <InputGroupInput
                    type="text"
                    autoComplete="last name"
                    placeholder="Kowalski"
                    {...field}
                  />
                  <InputGroupAddon>
                    <UserIcon />
                  </InputGroupAddon>
                </InputGroup>
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
                <div>
                  E-mail <span className="text-destructive ml-1">*</span>
                </div>
                {form.formState.errors.email && (
                  <p className="text-destructive text-xs">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </FormLabel>
              <FormControl>
                <InputGroup>
                  <InputGroupInput
                    type="email"
                    autoComplete="email"
                    placeholder="twój-email@mail.com"
                    {...field}
                  />
                  <InputGroupAddon>
                    <MailIcon />
                  </InputGroupAddon>
                </InputGroup>
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
