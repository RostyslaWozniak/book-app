import z from "zod";

export const phoneNumberValidation = z
  .string()

  .transform((input, ctx) => {
    if (typeof input !== "string") return input;

    // Remove everything except digits
    const digits = input.replace(/\D/g, "");

    // Check if the number starts with 48 or not, and format accordingly
    if (digits.startsWith("48") && digits.length === 11) {
      // Already has country code
      return `+48 ${digits.slice(2, 5)} ${digits.slice(5, 8)} ${digits.slice(8)}`;
    } else if (digits.length === 9) {
      // No country code, add +48
      return `+48 ${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
    }

    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message:
        "Numer telefonu jest niepoprawny. Przykład poprawnego formatu: +48 XXX XXX XXX",
    });
    return input;
  });
