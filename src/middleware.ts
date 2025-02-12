import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    const currentUser = request.cookies.get("token")?.value;
    const { pathname } = request.nextUrl;

    if (currentUser && pathname === "/login") {
        return Response.redirect(new URL("/dashboard", request.url));
    }
    if (!currentUser && !pathname.startsWith("/login")) {
        return Response.redirect(new URL("/login", request.url));
    }

    return;
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
