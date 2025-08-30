import { db } from "@/server/db";
import {
  createServiceSchema,
  type CreateServiceSchema,
} from "../../lib/validation/create-service-schema";
import { TRPCError } from "@trpc/server";
import {
  updateServiceSchema,
  type UpdateServiceSchema,
} from "../../lib/validation/update-service-schema";
import z from "zod";

export class ServiceService {
  public static async getAll() {
    return await db.service.findMany();
  }

  public static async getById(id: string) {
    return await db.service.findUnique({ where: { id } });
  }

  public static async create(unsafeData: CreateServiceSchema) {
    const { data, success } = createServiceSchema.safeParse(unsafeData);
    if (!success)
      throw new TRPCError({ code: "BAD_REQUEST", message: "Błąd walidacji" });
    return await db.service.create({ data });
  }

  public static async update(unsafeData: UpdateServiceSchema) {
    const { data, success } = updateServiceSchema.safeParse(unsafeData);
    if (!success)
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Błąd walidacji",
      });
    return await db.service.update({ where: { id: data.id }, data });
  }

  public static async delete(id: string) {
    const { data: safeUuId, success } = z.string().uuid().safeParse(id);
    if (!success)
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Błąd walidacji",
      });
    return await db.service.delete({ where: { id: safeUuId } });
  }
}
