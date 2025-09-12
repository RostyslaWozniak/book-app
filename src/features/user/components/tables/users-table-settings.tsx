"use client";

import { DialogWrapper } from "@/components/ui/dialog-wrapper";
import { DropdownWrapper } from "@/components/ui/dropdown-wrapper";
import { DropdownMenuItem } from "@/components/shadcn-ui/dropdown-menu";
import { IconMenu } from "@/components/ui/icon-menu";
import { CalendarIcon, Edit, UserIcon } from "lucide-react";
import { useState } from "react";
import type { User } from "@prisma/client";
import { RolesSelectForm } from "../forms/roles-select-form";
import Link from "next/link";

type UserType = Pick<
  User,
  "id" | "firstName" | "lastName" | "email" | "roles"
> & {
  slug: string;
  description: string | null;
};

export function ClientsTableSetings({ user }: { user: UserType }) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  return (
    <>
      <DialogWrapper
        title="Zmienianie uprawnień"
        description="Zmień uprawnienia użytkownika i zapisz zmiany."
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        className="scrollbar-hide flex max-h-[90vh] flex-col justify-end gap-3"
      >
        <RolesSelectForm user={user} setIsEditOpen={setIsEditOpen} />
      </DialogWrapper>

      <DropdownWrapper vertical className="w-52">
        {user.slug && (
          <>
            <DropdownMenuItem className="group relative">
              <IconMenu
                icon={UserIcon}
                text="Zobacz profil"
                className="group-hover:[&>svg]:stroke-white"
              />
              <Link
                href={`/admin/employees/${user.slug}`}
                className="absolute inset-0"
                aria-label={`Zobacz profil specialisty ${user.firstName} ${user.lastName}`}
              />
            </DropdownMenuItem>
            <DropdownMenuItem className="group relative">
              <IconMenu
                icon={CalendarIcon}
                text="Zobacz grafik"
                className="group-hover:[&>svg]:stroke-white"
              />
              <Link
                href={`/admin/employees/${user.slug}/schedule`}
                className="absolute inset-0"
                aria-label={`Zobacz grafik specialisty ${user.firstName} ${user.lastName}`}
              />
            </DropdownMenuItem>
          </>
        )}

        <DropdownMenuItem onClick={() => setIsEditOpen(true)} className="group">
          <IconMenu
            icon={Edit}
            text="Zmień uprawnienia"
            className="group-hover:[&>svg]:stroke-white"
          />
        </DropdownMenuItem>
      </DropdownWrapper>
    </>
  );
}
