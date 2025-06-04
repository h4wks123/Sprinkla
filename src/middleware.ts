import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const path = request.nextUrl.pathname;
  const isEmployeePage =
    path.startsWith("/users") ||
    path.startsWith("/orders") ||
    path.startsWith("/products");

  // 1. Block customer or unauthenticated users from accessing Employee pages
  if ((!token || token.role === "customer") && isEmployeePage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 2. If Employee visits home, redirect to Employee dashboard
  if (token?.role === "employee" && path === "/") {
    return NextResponse.redirect(new URL("/users", request.url));
  }

  // 3. Let everything else through
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|static|favicon.ico).*)"],
};
