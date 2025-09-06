import type { RouterOutputs } from "@/trpc/react";

export type Service = RouterOutputs["public"]["service"]["getAll"][number];

export type AdminService = RouterOutputs["admin"]["service"]["getAll"][number];
