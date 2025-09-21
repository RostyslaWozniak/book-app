"use client";

import { DialogWrapper } from "@/components/ui/dialog-wrapper";
import { TimeOffForm } from "./time-off-form";
import { useState } from "react";
import { Button } from "@/components/shadcn-ui/button";
import { PlusIcon } from "lucide-react";

export function TimeOffDialog() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        <PlusIcon /> Dodaj
      </Button>
      <DialogWrapper
        title="Dodawanie dnia wolnego"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        <TimeOffForm closeDialog={() => setIsOpen(false)} />
      </DialogWrapper>
    </>
  );
}
