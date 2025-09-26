import type { RouterOutputs } from "@/trpc/react";

export type ProfileAppointemnt = Pick<
  RouterOutputs["profile"]["appointment"]["getAllOwn"][number],
  "id" | "startTime" | "endTime" | "status" | "service" | "provider"
>;
