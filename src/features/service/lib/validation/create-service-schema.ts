import z from "zod";

export const createServiceSchema = z.object({
  name: z.string().min(1, "Pole jest wymagane"),
  description: z.string().optional(),
  durationInMinutes: z.coerce.number().int().positive("Czas musi być dodatni"),
  isActive: z.boolean().default(true).optional(),
});

export type CreateServiceSchema = z.infer<typeof createServiceSchema>;
