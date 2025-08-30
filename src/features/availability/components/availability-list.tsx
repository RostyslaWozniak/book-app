"use client";

import { useState } from "react";
import { type ScheduleDayOfWeek } from "@prisma/client";
import { Button } from "@/components/shadcn-ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcn-ui/table";
import { AvailabilityForm } from "./availability-form";
import { PencilIcon, TrashIcon } from "lucide-react";
import { getWeekTypeLabel } from "../lib/dates";
import { api, type RouterOutputs } from "@/trpc/react";
import { EmptyResult } from "@/components/ui/empty-result";
import { DialogWrapper } from "@/components/ui/dialog-wrapper";
import { LoadingButton } from "@/components/ui/loading-button";
import { toast } from "sonner";

type AvailabilityListProps = {
  availabilities: RouterOutputs["provider"]["availability"]["getOwnAvailabilities"];
};

const dayOrder: Record<ScheduleDayOfWeek, number> = {
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
  SUNDAY: 7,
};

export function AvailabilityList({ availabilities }: AvailabilityListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const utils = api.useUtils();

  const { mutate: deleteAvailability, isPending: isDeleting } =
    api.provider.availability.delete.useMutation({
      onError: ({ message }) => {
        toast.error(message);
      },
      onSuccess: () => {
        void utils.provider.availability.getOwnAvailabilities.invalidate();
        setDeletingId(null);
      },
    });

  const sortedAvailabilities = [...availabilities].sort((a, b) => {
    return dayOrder[a.dayOfWeek] - dayOrder[b.dayOfWeek];
  });

  if (sortedAvailabilities.length === 0) {
    return (
      <EmptyResult
        title="Brak ustawionych dostępności"
        titleClassName="text-base"
        iconClassName="h-10 w-10 mb-2"
      />
    );
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Rodzaj tygodnia</TableHead>
            <TableHead>Start</TableHead>
            <TableHead>Koniec</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedAvailabilities.map((availability) => (
            <TableRow key={availability.id}>
              <>
                <TableCell>{getWeekTypeLabel(availability.weekType)}</TableCell>
                <TableCell>{availability.startTime}</TableCell>
                <TableCell>{availability.endTime}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setEditingId(availability.id)}
                    >
                      <PencilIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDeletingId(availability.id)}
                    >
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </>

              <DialogWrapper
                isOpen={editingId === availability.id}
                title={"Dodaj nową dostępność"}
                setIsOpen={() => setEditingId(null)}
              >
                <AvailabilityForm
                  initialData={availability}
                  closeForm={() => setEditingId(null)}
                  submitLabel="Zapisz"
                />
              </DialogWrapper>
              <DialogWrapper
                isOpen={deletingId === availability.id}
                title={"Usuń dostępność"}
                description={
                  "Czy na pewno chcesz usunąć ten dostępny termin? Tej czynności nie można cofnąć."
                }
                setIsOpen={() => setDeletingId(null)}
                closeButton="Cofnij"
                className="flex justify-end"
              >
                <LoadingButton
                  loading={isDeleting}
                  onClick={() => deleteAvailability(availability.id)}
                >
                  Usuń
                </LoadingButton>
              </DialogWrapper>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
