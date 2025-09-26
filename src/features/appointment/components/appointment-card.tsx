"use client";

import { Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/shadcn-ui/badge";
import { format } from "date-fns";
// import { CancelAppointmentButton } from "./cancel-appointment-button";
import { pl } from "date-fns/locale";

import { mapAppointmentStatus } from "../lib/utils/map-appointment-status";
import type { $Enums } from "@prisma/client";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/shadcn-ui/card";
import Link from "next/link";
import type { ProfileAppointemnt } from "../types/appointment.type";
import { dateToTimeString } from "@/lib/utils/date";
import { Button } from "@/components/shadcn-ui/button";

export function AppointmentCard({
  appointment,
}: {
  appointment: ProfileAppointemnt;
}) {
  const startDate = new Date(appointment.startTime);
  const endDate = new Date(appointment.endTime);
  const isPastAppointment = new Date() > endDate;
  const canCancel =
    !isPastAppointment &&
    (appointment.status === "PENDING" || appointment.status === "CONFIRMED");
  return (
    <Card>
      <CardContent className="flex">
        <div className="flex-grow">
          <CardTitle className="flex-grow text-xl">
            {appointment.service.name}
          </CardTitle>
          <div className="text-foreground text-sm">
            Specjalista:{" "}
            <span className="font-semibold">
              {appointment.provider.firstName} {appointment.provider.lastName}
            </span>
          </div>
        </div>
        <div>{getStatusBadge(appointment.status)}</div>
      </CardContent>
      <CardFooter className="items-end">
        <div className="flex-grow space-y-1">
          <div className="flex items-center">
            <Calendar className="mr-2 h-4 w-4" />
            {format(startDate, "eee d MMMM", { locale: pl })}
          </div>
          <div className="flex items-center">
            <Clock className="mr-2 h-4 w-4" />

            {`${dateToTimeString(new Date(appointment.startTime))} -
              ${dateToTimeString(new Date(appointment.endTime))}`}
          </div>
        </div>
        <div className="h-full">
          {canCancel ? (
            // <CancelAppointmentButton appointmentId={appointment.id} />
            <Button variant="destructive" size="sm">
              Anuluj
            </Button>
          ) : (
            <div className="text-muted-foreground text-center text-xs">
              {isPastAppointment ? (
                <Link
                  href={`/appointments/new/${appointment.service.id}`}
                  className="w-full"
                >
                  <Button size="sm">Umów ponownie</Button>
                </Link>
              ) : null}
            </div>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}

const getStatusBadge = (status: $Enums.AppointmentStatus) => {
  const { color, label } = mapAppointmentStatus(status);
  return (
    <Badge variant="outline" className={cn("", color.secondary)}>
      {label}
    </Badge>
  );
};
