"use client";

import { DialogWrapper } from "@/components/ui/dialog-wrapper";
import { DropdownWrapper } from "@/components/ui/dropdown-wrapper";
import { DropdownMenuItem } from "@/components/shadcn-ui/dropdown-menu";
import { IconMenu } from "@/components/ui/icon-menu";
import { CalendarIcon, Edit, UserIcon } from "lucide-react";
import { useState } from "react";
import type { $Enums } from "@prisma/client";
import { RolesSelectForm } from "../forms/roles-select-form";
import Link from "next/link";

export function ClientsTableSetings({
  user,
}: {
  user: {
    id: string;
    slug?: string;
    roles: $Enums.Roles[];
  };
}) {
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
            <DropdownMenuItem>
              <Link href={`/admin/employees/${user.slug}`}>
                <IconMenu icon={UserIcon} text="Zobacz profil " />
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={`/admin/employees/${user.slug}/schedule`}>
                <IconMenu icon={CalendarIcon} text="Zobacz grifik " />
              </Link>
            </DropdownMenuItem>
          </>
        )}

        <DropdownMenuItem onClick={() => setIsEditOpen(true)}>
          <IconMenu icon={Edit} text="Zmień uprawnienia" />
        </DropdownMenuItem>
      </DropdownWrapper>
    </>
  );
}
