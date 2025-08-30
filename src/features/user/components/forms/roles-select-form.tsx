"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/shadcn-ui/form";
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from "@/components/shadcn-ui/multi-select";

import { $Enums } from "@prisma/client";

import { LoadingButton } from "@/components/ui/loading-button";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { mapRoles } from "../../lib/map-roles";
import {
  rolesSelectSchema,
  type RolesSelectSchema,
} from "../../lib/validation/roles-schema";

export function RolesSelectForm({
  user,
  setIsEditOpen,
}: {
  user: {
    id: string;
    roles: $Enums.Roles[];
  };
  setIsEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const { mutate: changeRoles, isPending } =
    api.admin.user.changeRoles.useMutation({
      onSuccess: () => {
        setIsEditOpen(false);
        router.refresh();
        toast.success("Rola została zmieniona.");
      },
      onError: () => {
        setIsEditOpen(false);
        toast.error("Coś poszło nie tak. Spróbuj ponownie.");
      },
    });

  const form = useForm<RolesSelectSchema>({
    resolver: zodResolver(rolesSelectSchema),
    defaultValues: {
      userId: user.id,
      roles: user.roles,
    },
  });

  async function onSubmit(data: RolesSelectSchema) {
    changeRoles(data);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full max-w-xl gap-x-2 p-5 sm:min-w-120"
      >
        <FormField
          control={form.control}
          name="roles"
          render={({ field }) => (
            <FormItem className="flex-grow">
              <FormControl>
                <MultiSelect
                  {...field}
                  defaultValues={user.roles}
                  onValuesChange={field.onChange}
                >
                  <MultiSelectTrigger className="w-full">
                    <MultiSelectValue placeholder="Wybierz role..." />
                  </MultiSelectTrigger>
                  <MultiSelectContent>
                    <MultiSelectGroup>
                      {Object.values($Enums.Roles).map((role) => (
                        <MultiSelectItem key={role} value={role}>
                          {mapRoles([role])}
                        </MultiSelectItem>
                      ))}
                    </MultiSelectGroup>
                  </MultiSelectContent>
                </MultiSelect>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton
          variant="default"
          type="submit"
          loading={isPending}
          disabled={!form.formState.isDirty}
        >
          Zapisz
        </LoadingButton>
      </form>
    </Form>
  );
}
