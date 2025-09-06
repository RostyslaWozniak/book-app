import type { RouterOutputs } from "@/trpc/react";

export type ProviderService =
  RouterOutputs["provider"]["service"]["getAllOwn"][number];
