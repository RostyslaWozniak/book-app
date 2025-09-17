import { useState } from "react";
import type { HolidayRange } from "../../types/override.type";
import { DialogWrapper } from "@/components/ui/dialog-wrapper";
import { HolidaysForm } from "../holidays-form";
// import { Button } from "@/components/shadcn-ui/button";
import { DropdownWrapper } from "@/components/ui/dropdown-wrapper";
import { DropdownMenuItem } from "@/components/shadcn-ui/dropdown-menu";
import { IconMenu } from "@/components/ui/icon-menu";
import { TrashIcon } from "lucide-react";
import { DeleteHolidays } from "../delete-holidays";

export function HolidaysTableSettings({ data }: { data: HolidayRange }) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  return (
    <>
      <DialogWrapper
        title="Dodaj urlop"
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
      >
        <HolidaysForm
          closeDialog={() => setIsEditOpen(false)}
          initialData={data}
        />
      </DialogWrapper>
      <DialogWrapper
        title="Usuwanie urlopu"
        description="Czy na pewno chcesz usunąć urlop?"
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        closeButton="Anuluj"
        closeButtonVariant={{ variant: "outline", size: "default" }}
        className="flex w-[500px] justify-end gap-2"
      >
        <DeleteHolidays holidays={data} />
      </DialogWrapper>
      <DropdownWrapper vertical>
        {/* <DropdownMenuItem
          onClick={() => setIsEditOpen(true)}
          className="group bg-background mb-1 cursor-pointer"
        >
          <IconMenu
            icon={EditIcon}
            text="Edytuj"
            className="group-hover:[&>svg]:stroke-white"
          />
        </DropdownMenuItem> */}
        <DropdownMenuItem
          onClick={() => setIsDeleteOpen(true)}
          className="group bg-destructive/20 cursor-pointer"
        >
          <IconMenu
            icon={TrashIcon}
            text="Usuń"
            className="group-hover:[&>svg]:stroke-white"
          />
        </DropdownMenuItem>
      </DropdownWrapper>
    </>
  );
}
