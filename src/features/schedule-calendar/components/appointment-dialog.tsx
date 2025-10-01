"use client";

import { DialogWrapper } from "@/components/ui/dialog-wrapper";
import { useState, type ReactNode } from "react";
import { Separator } from "@/components/shadcn-ui/separator";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import {
  ArrowRightIcon,
  Calendar,
  Clock,
  Mail,
  PhoneIcon,
  User,
} from "lucide-react";
import { UpdateAppointmentStatusButton } from "./update-appointment-status-button";
import { CancelAppointmentDialog } from "./cancel-appointment-dialog";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/shadcn-ui/badge";
import { mapAppointmentStatus } from "@/features/appointment/lib/utils/map-appointment-status";
import { usePathname } from "next/navigation";
import type { CalendarAppointment } from "../types";
import Link from "next/link";
import { Button } from "@/components/shadcn-ui/button";

export function AppointmentDialog({
  children,
  appointment,
}: {
  children: ReactNode;
  appointment: CalendarAppointment;
}) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isAdmin = pathname.includes("admin") ?? false;
  const isProvider = pathname.includes("provider") ?? false;

  const status = mapAppointmentStatus(appointment.status);

  return (
    <>
      <DialogWrapper
        title={appointment.service.name}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        className="scrollbar-hide flex max-h-[90vh] w-180 gap-3"
      >
        <div className="w-full space-y-6 pt-4">
          <Badge
            className={cn(
              "absolute top-12 right-4 border-none px-3",
              status.color.default,
            )}
          >
            {status.label}
          </Badge>
          <div className="grid gap-4 md:grid-cols-2">
            {/* Date and Time Section */}
            <div className="bg-card flex flex-col space-y-3 rounded-lg p-4">
              <h4 className="text-card-foreground font-medium">Grafik</h4>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="text-card-foreground h-4 w-4" />
                <span className="font-medium">
                  {format(
                    new Date(appointment.startTime),
                    "EEEE, d MMMM , yyyy",
                    {
                      locale: pl,
                    },
                  )}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="text-card-foreground h-4 w-4" />
                <span>
                  {`${format(
                    new Date(appointment.startTime),
                    "HH:mm",
                  )} - ${format(new Date(appointment.endTime), "HH:mm")}`}
                </span>
              </div>
              <div className="flex flex-grow items-end">
                {isAdmin &&
                  appointment.status !== "CANCELLED" &&
                  appointment.status !== "COMPLETED" && (
                    <CancelAppointmentDialog
                      appointmentId={appointment.id}
                      setIsAppointmentDialogOpen={setIsOpen}
                    />
                  )}
                {isProvider &&
                  appointment.status !== "CANCELLED" &&
                  appointment.status !== "COMPLETED" && (
                    <UpdateAppointmentStatusButton
                      setIsAppointmentDialogOpen={setIsOpen}
                      appointmentId={appointment.id}
                      status={
                        appointment.status === "PENDING"
                          ? "CONFIRMED"
                          : "COMPLETED"
                      }
                    />
                  )}
              </div>
            </div>
            {/* Contact Information */}
            <div className="bg-card space-y-3 rounded-lg p-4">
              <h4 className="text-card-foreground font-medium">
                Informacje kontaktowe
              </h4>
              {appointment.contactName && (
                <div className="flex items-center gap-2 text-sm">
                  <User className="text-card-foreground h-4 w-4" />
                  <span>{appointment.contactName}</span>
                </div>
              )}
              {appointment.contactEmail && (
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="text-card-foreground h-4 w-4" />
                  <span>{appointment.contactEmail}</span>
                </div>
              )}
              {appointment.user ? (
                <div className="flex items-center gap-2 text-sm">
                  <PhoneIcon className="text-card-foreground h-4 w-4" />
                  <span>{appointment.user.phoneNumber}</span>
                </div>
              ) : (
                appointment.contactPhone && (
                  <div className="flex items-center gap-2 text-sm">
                    <PhoneIcon className="text-card-foreground h-4 w-4" />
                    <span>{appointment.contactPhone}</span>
                  </div>
                )
              )}

              {appointment.user && (
                <Link href={`/provider/appointments/${appointment.user.id}`}>
                  <Button variant="link">
                    Przejdź do klienta <ArrowRightIcon />
                  </Button>
                </Link>
              )}
            </div>
          </div>

          <Separator />

          {/* Footer with creation date */}
          <div className="text-muted-foreground text-center text-xs">
            <span>Stworzono: </span>
            {format(new Date(appointment.createdAt), "MMM d, yyyy", {
              locale: pl,
            })}
          </div>
        </div>
      </DialogWrapper>
      <div onClick={() => setIsOpen(true)}>{children}</div>
    </>
  );
}
