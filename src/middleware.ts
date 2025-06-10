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
  const isCustomerPage =
    path.startsWith("/cart") ||
    path.startsWith("/recent") ||
    path.startsWith("/history");

  // 1. Unauthenticated users cannot access protected pages
  if (!token && (isEmployeePage || isCustomerPage)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 2. Customer trying to access employee page: redirect to homepage
  if (token?.role === "customer" && isEmployeePage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 3. Employee trying to access customer page: redirect to dashboard
  if (token?.role === "employee" && isCustomerPage) {
    return NextResponse.redirect(new URL("/users", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|static|favicon.ico).*)"],
};
