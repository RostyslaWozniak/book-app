"use client";

import { DialogWrapper } from "@/components/ui/dialog-wrapper";
import { HolidaysForm } from "./holidays-form";
import type { HolidayRange } from "../types/override.type";
import { useState } from "react";
import { Button } from "@/components/shadcn-ui/button";
import { PlusIcon } from "lucide-react";

type HolidaysDialogProps = {
  initialData?: HolidayRange;
};
export function HolidaysDialog({ initialData }: HolidaysDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        <PlusIcon /> Dodaj urlop
      </Button>
      <DialogWrapper title="Dodaj urlop" isOpen={isOpen} setIsOpen={setIsOpen}>
        <HolidaysForm
          closeDialog={() => setIsOpen(false)}
          initialData={initialData}
        />
      </DialogWrapper>
    </>
  );
}
