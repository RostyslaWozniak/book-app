import { getOAuthClient } from "@/features/auth/core/oauth/base";
import {
  oAuthProviders,
  type OAuthProvider,
} from "@/features/auth/core/oauth/providers";
import { createUserSession } from "@/features/auth/core/session";
import { db } from "@/server/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";
import { z } from "zod";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ provider: string }> },
) {
  const { provider: rawProvider } = await params;

  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");
  const provider = z.enum(oAuthProviders).parse(rawProvider);

  if (typeof code !== "string" || typeof state !== "string") {
    redirect(
      `/login?oauthError=${encodeURIComponent("Failed to connect. Please try again.")}`,
    );
  }
  const oAuthClient = getOAuthClient(provider);
  let afterLoginRedirectUrl = "/";
  try {
    const oAuthUser = await oAuthClient.fetchUser(code, state, await cookies());
    const user = await connectUserToAccount(oAuthUser, provider);

    afterLoginRedirectUrl = user.roles.includes("ADMIN")
      ? "/admin"
      : user.roles.includes("PROVIDER")
        ? "/provider"
        : "/profile";
    await createUserSession(user, await cookies());
  } catch (error) {
    console.error(error);
    redirect(
      `/login?oauthError=${encodeURIComponent(
        "Failed to connect. Please try again.",
      )}`,
    );
  }

  redirect(afterLoginRedirectUrl);
}

function connectUserToAccount(
  {
    id,
    email,
    name,
    photo,
  }: { id: string; email: string; name: string; photo?: string },
  provider: OAuthProvider,
) {
  return db.$transaction(async (tx) => {
    let user = await tx.user.findUnique({ where: { email } });
    if (user == null) {
      const [firstName, lastName] = name.split(" ").map((name) => name.trim());
      const newUser = await tx.user.create({
        data: {
          firstName: firstName ?? "",
          lastName: lastName ?? "",
          email,
          photo,
          isVerified: true,
        },
      });
      user = newUser;

      await tx.userOAuthAccount.create({
        data: {
          provider,
          providerAccountId: id,
          userId: user.id,
        },
      });
    }

    return user;
  });
}
