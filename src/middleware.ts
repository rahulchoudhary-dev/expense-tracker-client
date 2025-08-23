import type { NextRequest } from "next/server";
import authMiddleware from "./middlewares/auth.middleware";

export function middleware(request: NextRequest) {
  return authMiddleware(request); // 🔑 must return
}
export const config = {
  matcher: ["/((?!_next/static|_next/image|_next/webpack-hmr|favicon.ico).*)"],
};
