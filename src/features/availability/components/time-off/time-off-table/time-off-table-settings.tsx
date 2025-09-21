import { useState } from "react";
import type { TimeOffRange } from "../../../types/override.type";
import { DialogWrapper } from "@/components/ui/dialog-wrapper";
import { TrashIcon } from "lucide-react";
import { DeleteTimeOff } from "./delete-time-off";
import { Button } from "@/components/shadcn-ui/button";

export function TimeOffTableSettings({ data }: { data: TimeOffRange }) {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  return (
    <>
      <DialogWrapper
        title="Usuwanie urlopu"
        description="Czy na pewno chcesz usunąć urlop?"
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        closeButton="Anuluj"
        closeButtonVariant={{ variant: "outline", size: "default" }}
        className="flex w-[500px] justify-end gap-2"
      >
        <DeleteTimeOff
          timeOff={data}
          closeDialog={() => setIsDeleteOpen(false)}
        />
      </DialogWrapper>

      <Button
        size="icon"
        variant="ghost"
        onClick={() => setIsDeleteOpen(true)}
        className="hover:bg-destructive dark:hover:bg-destructive/50 cursor-pointer"
      >
        <TrashIcon />
      </Button>
    </>
  );
}
