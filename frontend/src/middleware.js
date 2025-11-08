// middleware.js (project root)
import { NextResponse } from "next/server";

/**
 * Safer middleware: fetch /api/current (with incoming cookies) and only
 * redirect logged-in users away from auth pages if the server confirms a user.
 *
 * Note: keep matcher small to avoid overhead.
 */

const COOKIE_NAME = "loginToken"; // change if your cookie name differs
const REDIRECT_TO = "/";

export async function middleware(request) {
  try {
    console.log("middleware working");

    // Basic info
    const rawPath = request.nextUrl.pathname || "/";
    const pathname = rawPath !== "/" && rawPath.endsWith("/") ? rawPath.slice(0, -1) : rawPath;
    console.log("[middleware] pathname:", pathname);

    // Pages that we want to prevent logged-in users from seeing
    const authPages = ["/login", "/signup"];
    const isAuthPage = authPages.some((p) => pathname === p || pathname.startsWith(p + "/"));
    if (!isAuthPage) {
      return NextResponse.next();
    }

    // If there is no cookie at all, allow the request (not logged in)
    const cookiePresent = !!request.cookies.get(COOKIE_NAME)?.value;
    console.log(`[middleware] cookie "${COOKIE_NAME}" present:`, cookiePresent);
    if (!cookiePresent) return NextResponse.next();

    // Call internal /api/current to validate token & confirm user exists.
    // Forward the cookie header so /api/current sees the exact same cookies.
    const apiUrl = new URL("/api/current", request.url).toString();
    console.log("[middleware] verifying user by calling", apiUrl);

    // NOTE: use fetch with the cookie header forwarded explicitly.
    const fetchRes = await fetch(apiUrl, {
      method: "GET",
      headers: {
        // forward the incoming cookie header so the server can read it
        cookie: request.headers.get("cookie") || "",
        // preserve host/origin if necessary:
        // 'x-forwarded-host': request.headers.get('host') || '',
      },
    });

    // If API failed, allow the request (fail-open).
    if (!fetchRes.ok) {
      console.warn("[middleware] /api/current returned non-ok status:", fetchRes.status);
      return NextResponse.next();
    }

    const payload = await fetchRes.json().catch((e) => {
      console.warn("[middleware] failed to parse /api/current json", e);
      return null;
    });

    const serverUser = payload?.user ?? null;
    console.log("[middleware] /api/current returned user:", !!serverUser);

    // Only redirect if server confirms a user exists
    if (serverUser) {
      if (pathname !== REDIRECT_TO) {
        console.log("[middleware] server confirms user -> redirecting to", REDIRECT_TO);
        return NextResponse.redirect(new URL(REDIRECT_TO, request.url));
      }
    } else {
      // token exists but server says user not found; allow request so user can re-signup/login
      console.log("[middleware] token present but no user in DB; allowing auth page so user can fix account");
      return NextResponse.next();
    }

    return NextResponse.next();
  } catch (err) {
    console.error("middleware error:", err);
    // fail-open: don't block requests if middleware errors
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/", "/login", "/signup"],
};
