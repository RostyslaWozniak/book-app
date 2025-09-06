"use client";

import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from "@/components/shadcn-ui/multi-select";
import { Skeleton } from "@/components/shadcn-ui/skeleton";
import { EmptyResult } from "@/components/ui/empty-result";
import { api } from "@/trpc/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/shadcn-ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import type { ProviderService } from "../../types/provider-service";
import { LoadingButton } from "@/components/ui/loading-button";

const providerServicesSelectSchema = z.object({
  services: z.array(z.string()),
});

export type ProviderServicesSelectSchema = z.infer<
  typeof providerServicesSelectSchema
>;

export function ProviderServicesSelectForm({
  providersOwnServices,
  closeDialog,
}: {
  providersOwnServices: ProviderService[];
  closeDialog: () => void;
}) {
  const {
    data: services,
    isLoading,
    error,
  } = api.provider.service.getAll.useQuery();

  const router = useRouter();

  const form = useForm<ProviderServicesSelectSchema>({
    resolver: zodResolver(providerServicesSelectSchema),
    defaultValues: {
      services: providersOwnServices?.map((service) => service.name) ?? [],
    },
  });

  const { mutate: mutateList, isPending: isMutating } =
    api.provider.service.mutateList.useMutation({
      onSuccess: () => {
        toast.success("Usługi zaktualizowano");
        router.refresh();
        closeDialog();
      },
      onError: ({ message }) => {
        toast.error(message);
      },
    });

  if (isLoading) return <Skeleton className="h-9 w-full" />;

  if (error)
    return (
      <EmptyResult title="Coś poczło nie tak. Odswierz stronę i spróbuj ponownie" />
    );
  if (!services)
    return <EmptyResult title="Nie dodano jeszcze żadnych usług" />;

  function onSubmit(data: ProviderServicesSelectSchema) {
    const serviceIds =
      data.services
        ?.map((s) => services?.find((service) => s === service.name)?.id)
        .filter((s) => s !== undefined) ?? [];
    mutateList(serviceIds);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-end gap-2"
      >
        <FormField
          control={form.control}
          name="services"
          render={({ field }) => (
            <FormItem className="flex-grow">
              <MultiSelect onValuesChange={field.onChange} values={field.value}>
                <FormControl>
                  <MultiSelectTrigger className="w-full max-w-120">
                    <MultiSelectValue
                      clickToRemove={false}
                      overflowBehavior="wrap"
                      placeholder="Wybierz usługi..."
                    />
                  </MultiSelectTrigger>
                </FormControl>
                <MultiSelectContent
                  search={{
                    placeholder: "",
                    emptyMessage: "Nie znaleziono usług",
                  }}
                >
                  <MultiSelectGroup>
                    {services.map(({ id, name }) => (
                      <MultiSelectItem key={id} value={name}>
                        {name}
                      </MultiSelectItem>
                    ))}
                  </MultiSelectGroup>
                </MultiSelectContent>
              </MultiSelect>

              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton
          loading={isMutating}
          disabled={!form.formState.isDirty}
          type="submit"
        >
          Zapisz
        </LoadingButton>
      </form>
    </Form>
  );
}

import { Button } from "@/components/shadcn-ui/button";
import { DialogWrapper } from "@/components/ui/dialog-wrapper";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import z from "zod";
import { useRouter } from "next/navigation";

export function ServiceSelectionDialog({
  providersOwnServices,
}: {
  providersOwnServices: ProviderService[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        <PlusIcon />{" "}
        {providersOwnServices.length > 0 ? "Wybierz usługi" : "Dodaj usługi"}
      </Button>
      <DialogWrapper
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        title="Wybierz usługi które chcesz swiadczyć"
        className="w-full md:min-w-120"
      >
        <ProviderServicesSelectForm
          providersOwnServices={providersOwnServices}
          closeDialog={() => setIsOpen(false)}
        />
      </DialogWrapper>
    </>
  );
}
