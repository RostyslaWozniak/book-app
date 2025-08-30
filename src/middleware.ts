import { NextResponse, type NextRequest } from "next/server";
import {
  getUserFromSession,
  updateUserSessionExpiration,
} from "@/features/auth/core/session";

const providerRoutes = "/provider";
const adminRoutes = "/admin";

const authRoutes = ["/login", "/registration", "/email-verification"];

export async function middleware(request: NextRequest) {
  console.log("RUN_MIDDLEWARE");
  const response = (await middlewareAuth(request)) ?? NextResponse.next();
  await updateUserSessionExpiration({
    set: (key, value, options) => {
      response.cookies.set({ ...options, name: key, value });
    },
    get: (key) => response.cookies.get(key),
  });
  return response;
}

async function middlewareAuth(request: NextRequest) {
  const user = await getUserFromSession(request.cookies);
  const pathname = request.nextUrl.pathname;

  if (user) {
    if (authRoutes.includes(pathname)) {
      if (user.roles.includes("ADMIN")) {
        return NextResponse.redirect(new URL("/admin", request.url));
      }
      if (user.roles.includes("PROVIDER")) {
        return NextResponse.redirect(new URL("/provider", request.url));
      }
      if (user.roles.includes("CLIENT")) {
        return NextResponse.redirect(new URL("/profile", request.url));
      }
    }
  }

  if (pathname.startsWith(providerRoutes)) {
    if (user == null) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    if (!user.roles.includes("PROVIDER")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (pathname.startsWith(adminRoutes)) {
    if (user == null) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (!user.roles.includes("ADMIN")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
  if (pathname.startsWith("/profile")) {
    if (user == null) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (!user.roles.includes("CLIENT")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
}

export const config = {
  matcher: [
    // Match specific protected paths AND authentication paths
    "/login",
    "/register",
    "/email-verification",
    "/admin/:path*",
    "/provider/:path*",
    "/profile/:path*",
  ],
};
