import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const path = request.nextUrl.pathname;
  const isAdminPage = path.startsWith("/users") || path.startsWith("/orders");

  // 1. Block customer or unauthenticated users from accessing admin pages
  if ((!token || token.role === "customer") && isAdminPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 2. If admin visits home, redirect to admin dashboard
  if (token?.role === "admin" && path === "/") {
    return NextResponse.redirect(new URL("/users", request.url));
  }

  // 3. Let everything else through
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|static|favicon.ico).*)"],
};
