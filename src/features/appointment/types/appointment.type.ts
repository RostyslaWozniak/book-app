import type {
  Appointment,
  ProviderProfile,
  Service,
  User,
} from "@prisma/client";

export type ProfileAppointemnt = Pick<
  Appointment,
  "id" | "startTime" | "endTime" | "status"
> & {
  service: Pick<Service, "id" | "slug" | "name">;
  provider: Pick<ProviderProfile, "slug"> &
    Pick<User, "firstName" | "lastName" | "phoneNumber" | "photo">;
};
