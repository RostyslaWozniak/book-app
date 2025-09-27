"use client";

import { Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/shadcn-ui/badge";
import { format } from "date-fns";
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
import { Avatar } from "@/components/ui/avatar";

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
      <CardContent className="flex px-4 md:px-6">
        <div className="flex-grow">
          <CardTitle className="flex-grow text-xl">
            {appointment.service.name}
          </CardTitle>
          <Link
            href={`/specjalisci/${appointment.provider.slug}`}
            className="font-semibold hover:underline"
          >
            <div className="mt-2 flex items-center gap-x-2">
              <Avatar
                className="h-6 w-6 text-xs md:h-8 md:w-8 md:text-sm"
                photo={appointment.provider.photo}
                name={`${appointment.provider.firstName} ${appointment.provider.lastName}`}
              />
              <p className="text-sm">
                {appointment.provider.firstName} {appointment.provider.lastName}
              </p>
            </div>
          </Link>
        </div>
        <div>{getStatusBadge(appointment.status)}</div>
      </CardContent>
      <CardFooter className="items-end px-4 md:px-6">
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
