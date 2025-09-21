"use client";

import { DialogWrapper } from "@/components/ui/dialog-wrapper";
import { OverrideForm } from "./override-form";
import { useState } from "react";
import { Button } from "@/components/shadcn-ui/button";
import { PlusIcon } from "lucide-react";

export function OverrideDialog() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        <PlusIcon /> Dodaj
      </Button>
      <DialogWrapper
        title="Zmiana godzin pracy"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        <OverrideForm closeDialog={() => setIsOpen(false)} />
      </DialogWrapper>
    </>
  );
}
