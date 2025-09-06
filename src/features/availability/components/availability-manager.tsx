"use client";

import { Button } from "@/components/shadcn-ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcn-ui/card";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { AvailabilityForm } from "./availability-form";
import { AvailabilityList } from "./availability-list";
import { api } from "@/trpc/react";
import { ScheduleDayOfWeek } from "@prisma/client";
import { formatDayOfWeek } from "../lib/dates";
import { Skeleton } from "@/components/shadcn-ui/skeleton";
import { DialogWrapper } from "@/components/ui/dialog-wrapper";

export function AvailabilityManager() {
  const [dayOfNewAvailability, setDayOfNewAvailability] =
    useState<ScheduleDayOfWeek | null>(null);

  const { data: availabilities = [], isLoading: isAvalabilityLoading } =
    api.provider.availability.getOwnAvailabilities.useQuery();

  return (
    <div className="grid gap-8 @min-4xl:grid-cols-2 @min-7xl:grid-cols-3">
      {Object.values(ScheduleDayOfWeek).map((day) => (
        <Card key={day}>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{formatDayOfWeek(day)}</CardTitle>
            <Button onClick={() => setDayOfNewAvailability(day)} size="icon">
              <PlusIcon className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            {isAvalabilityLoading ? (
              <div className="grid w-full gap-2 [&>div]:h-11">
                <Skeleton />
                <Skeleton />
              </div>
            ) : (
              <AvailabilityList
                key={day}
                availabilities={availabilities.filter(
                  (a) => a.dayOfWeek === day,
                )}
              />
            )}
          </CardContent>
          <DialogWrapper
            isOpen={dayOfNewAvailability === day}
            title={"Dodaj nową dostępność"}
            setIsOpen={() => setDayOfNewAvailability(null)}
          >
            <AvailabilityForm
              closeForm={() => setDayOfNewAvailability(null)}
              submitLabel="Dodaj"
              dayOfWeek={day}
            />
          </DialogWrapper>
        </Card>
      ))}
    </div>
  );
}
