import { env } from "@/lib/env/server";
import { Resend } from "resend";

export const resend = new Resend(env.RESEND_API_KEY);

export async function sendTextEmail({
  email,
  subject,
  text,
}: {
  email: string;
  subject: string;
  text: string;
}) {
  const { data, error } = await resend.emails.send({
    from: `Book App <no-reply@${env.RESEND_DOMAIN}>`,
    to: email,
    subject,
    text,
  });

  if (error) {
    console.log({ error });
    return error;
  }
  return data;
}

export async function sendReactEmail({
  email,
  subject,
  emailTemplate: EmailTemplate,
}: {
  email: string;
  subject: string;
  emailTemplate: React.ReactNode;
  name?: string;
}) {
  const { data, error } = await resend.emails.send({
    from: `Web Join <no-reply@${env.RESEND_DOMAIN}>`,
    to: email,
    subject,
    react: EmailTemplate,
  });

  if (error) {
    console.log({ error });
    return error;
  }
  return data;
}

export async function sendHtmlEmail({
  email,
  subject,
  html,
}: {
  email: string;
  subject: string;
  html: string;
  name?: string;
}) {
  const { data, error } = await resend.emails.send({
    from: `Web Join <no-reply@${env.RESEND_DOMAIN}>`,
    to: email,
    subject,
    html,
  });

  if (error) {
    console.log({ error });
    return error;
  }
  return data;
}
