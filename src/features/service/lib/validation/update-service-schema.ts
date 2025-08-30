import z from "zod";
import { createServiceSchema } from "./create-service-schema";

export const updateServiceSchema = createServiceSchema.extend({
  id: z.string().uuid(),
});

export type UpdateServiceSchema = z.infer<typeof updateServiceSchema>;
