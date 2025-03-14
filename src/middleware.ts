import { NextResponse, NextRequest } from "next/server";
import users from "@/data/users";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Read the authentication token from the cookie using Next.js cookies
  const authToken = request.cookies.get("auth-token")?.value;

  // Find the user based on the token
  const user = users.find((u: { token: string }) => u.token === authToken);

  console.log("user", user);

  // Public routes (accessible without authentication)
  const publicRoutes = ["/", "/auth/register"];

  // Protected routes (require authentication)
  const protectedRoutes = ["/library", "/library/:path*"];

  // Check if the current route is public
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Check if the current route is protected
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Redirect unauthenticated users from protected routes
  if (isProtectedRoute && !user) {
    console.log("⛔ Unauthorized access. Redirecting to login.");
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Redirect authenticated users away from public routes and enure they are not redirected to the library if already there
  if (isPublicRoute && user && !pathname.startsWith("/library")) {
    console.log("✅ Authenticated user detected. Redirecting to /library.");
    return NextResponse.redirect(new URL("/library", request.url));
  }

  // Block "Reader" users from accessing /library/users
  if (pathname.startsWith("/library/users") && user?.role === "Reader") {
    console.log("⛔ Reader detected. Redirecting to /library.");
    return NextResponse.redirect(new URL("/library", request.url));
  }

  // Allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/auth/:path*", "/library/:path*"], // Apply middleware to specific routes
};
