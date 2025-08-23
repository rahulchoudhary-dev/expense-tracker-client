import { ACCESS_TOKEN_KEY, PUBLIC_ROUTES } from "@/constant";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const authMiddleware = (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get(ACCESS_TOKEN_KEY)?.value;

  if (!PUBLIC_ROUTES.includes(pathname) && !token) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  return NextResponse.next();
};

export default authMiddleware;
