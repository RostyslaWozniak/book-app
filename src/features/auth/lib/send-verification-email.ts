import { sendHtmlEmail } from "@/lib/services/resend";
import { EMAIL_VERIFICATION_CODE_TTL_IN_MIN } from "../constants";

export async function sendVerificationCodeEmail(
  email: string,
  verificationCode: string,
) {
  await sendHtmlEmail({
    email,
    subject: "Kod weryfikacyjny",
    html: `<!doctype html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Kod weryfikacyjny</title>
  </head>
  <body style="background-color:#f5f7fb; font-family:Arial, Helvetica, sans-serif; margin:0; padding:20px;">
    <div style="max-width:600px; margin:0 auto; background:white; padding:24px; border-radius:8px;">
      <h1 style="font-size:20px; color:#111827; margin:0 0 12px 0;">Kod weryfikacyjny</h1>
      <p style="font-size:16px; color:#374151; margin:0 0 12px 0;">
      Oto Twój kod weryfikacyjny:
      </p>
      <div style="display:inline-block;
          font-size:28px;
          letter-spacing:6px;
          background:#f3f4f6;
          padding:12px 18px;
          border-radius:8px;
          font-family:monospace;
          color:#111827;
          user-select:all;">
        ${verificationCode}
      </div>
      <p style="color:#6b7280; font-size:14px; margin-top:16px;">
        Ten kod wygaśnie za ${EMAIL_VERIFICATION_CODE_TTL_IN_MIN} minut. Jeśli nie prosiłeś o niego, możesz bezpiecznie zignorować tę wiadomość e-mail.
      </p>
    </div>
  </body>
  </html>`,
  });
}
