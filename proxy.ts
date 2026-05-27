import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const REALM = "Kawaguchitenrei SEO Dashboard";

function unauthorized(): NextResponse {
  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": `Basic realm="${REALM}", charset="UTF-8"`,
    },
  });
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

export function proxy(request: NextRequest): NextResponse {
  const expectedUser = process.env.SEO_DASHBOARD_USER;
  const expectedPassword = process.env.SEO_DASHBOARD_PASSWORD;

  if (!expectedUser || !expectedPassword) {
    return new NextResponse("Server configuration error", { status: 500 });
  }

  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.toLowerCase().startsWith("basic ")) {
    return unauthorized();
  }

  let decoded: string;
  try {
    decoded = atob(authHeader.slice(6).trim());
  } catch {
    return unauthorized();
  }

  const sep = decoded.indexOf(":");
  if (sep === -1) return unauthorized();
  const user = decoded.slice(0, sep);
  const password = decoded.slice(sep + 1);

  const userOk = timingSafeEqual(user, expectedUser);
  const passOk = timingSafeEqual(password, expectedPassword);
  if (!userOk || !passOk) return unauthorized();

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
