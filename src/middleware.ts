import { auth } from "@/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const session = await auth();
  // If the user is not authenticated, redirect to the sign-in page
  if (!session) {
    // Get the current path to redirect back after login
    const returnUrl = encodeURIComponent(request.nextUrl.pathname);

    // Redirect to the sign-in page
    return NextResponse.redirect(
      new URL(`/api/auth/signin?callbackUrl=${returnUrl}`, request.url),
    );
  }

  // Continue to the requested page if authenticated
  return NextResponse.next();
}

// Configure which paths this middleware applies to
export const config = {
  matcher: ["/"],
};
