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
import { api } from "@/trpc/react";
import { LoadingButton } from "@/components/ui/loading-button";
import { useRouter } from "next/navigation";
import { Switch } from "@/components/shadcn-ui/switch";
import {
  createServiceSchema,
  type CreateServiceSchema,
} from "../../lib/validation/create-service-schema";
import type { AdminService } from "../../types/services.type";
import { toast } from "sonner";
import { useEffect } from "react";
import { slugify } from "@/lib/utils/slugify";

export function CreateUpdateServiceForm({
  service,
  setIsEditOpen,
}: {
  service?: AdminService;
  setIsEditOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const router = useRouter();

  const form = useForm<CreateServiceSchema>({
    resolver: zodResolver(createServiceSchema),
    defaultValues: {
      name: service ? service.name : "",
      description: service ? (service.description ?? undefined) : undefined,
      durationInMinutes: service ? service.durationInMinutes : 15,
      isActive: service ? service.isActive : true,
      slug: service ? service.slug : "",
    },
  });

  const { mutate: createService, isPending: isCreatePending } =
    api.admin.service.create.useMutation({
      onSuccess: () => {
        router.push("/admin/services");
      },
      onError: ({ message }) => {
        toast.error(message);
      },
    });

  const { mutate: updateService, isPending: isUpdatePending } =
    api.admin.service.update.useMutation({
      onSuccess: () => {
        router.refresh();
        if (setIsEditOpen) setIsEditOpen(false);
      },
      onError: ({ message }) => {
        toast.error(message);
      },
    });

  function onSubmit(values: CreateServiceSchema) {
    if (service) {
      updateService({ id: service.id, ...values });
    } else {
      createService(values);
    }
  }

  const watchServiceName = form.watch("name");

  useEffect(() => {
    console.log("HELLO");
    form.setValue("slug", slugify(watchServiceName));
  }, [watchServiceName, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid items-start gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nazwa usługi*</FormLabel>
                <FormControl>
                  <Input placeholder="Wpisz nazwę usługi" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="durationInMinutes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Czas trwania*</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Wpisz czas trwania usługi w minutach"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Publiczny url</FormLabel>
              <FormControl>
                <Input
                  placeholder="Wpisz widoczne dla użytkowników url"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Opis usługi (opcjonalne)</FormLabel>
              <FormControl>
                <Textarea placeholder="Wpisz opis usługi" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Czy usługa jest aktywna </FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <LoadingButton
          loading={isCreatePending || isUpdatePending}
          disabled={!form.formState.isDirty}
          className="float-right"
        >
          {service ? "Zapisz" : "Dodaj"}
        </LoadingButton>
      </form>
    </Form>
  );
}
