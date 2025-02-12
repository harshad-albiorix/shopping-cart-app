import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    const currentUser = request.cookies.get("token")?.value;
    const { pathname } = request.nextUrl;

    if (currentUser && (pathname === "/login" || pathname === "/register")) {
        return Response.redirect(new URL("/dashboard", request.url));
    }

    if (!currentUser && !pathname.startsWith("/login") && !pathname.startsWith("/register")) {
        return Response.redirect(new URL("/login", request.url));
    }

    return;
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
