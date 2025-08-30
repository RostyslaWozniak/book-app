import { cache } from "react";
import { getUserFromSession } from "./core/session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/server/db";
import { logOut } from "./actions/logout-action";

export type FullUser = Exclude<
  Awaited<ReturnType<typeof getUserFromDb>>,
  undefined | null
>;

export type User = Exclude<
  Awaited<ReturnType<typeof getUserFromSession>>,
  undefined | null
>;

function _getCurrentUser(options: {
  withFullUser: true;
  redirectIfNotFound: true;
}): Promise<FullUser>;
function _getCurrentUser(options: {
  withFullUser: true;
  redirectIfNotFound?: false;
}): Promise<FullUser | null>;
function _getCurrentUser(options: {
  withFullUser?: false;
  redirectIfNotFound: true;
}): Promise<User>;
function _getCurrentUser(options?: {
  withFullUser?: false;
  redirectIfNotFound?: false;
}): Promise<User | null>;

async function _getCurrentUser({
  withFullUser = false,
  redirectIfNotFound = false,
} = {}) {
  const user = await getUserFromSession(await cookies());

  if (user == null) {
    if (redirectIfNotFound) return redirect("/login");
    return null;
  }

  if (withFullUser) {
    const fullUser = await getUserFromDb(user.id);
    // This should never happen
    if (fullUser == null) {
      await logOut();
      return redirect("/login");
    }
    return fullUser;
  }

  return user;
}

export const getCurrentUser = cache(_getCurrentUser);

const getUserFromDb = (id: string) => {
  return db.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      roles: true,
      firstName: true,
      lastName: true,
      phoneNumber: true,
      photo: true,
    },
  });
};
