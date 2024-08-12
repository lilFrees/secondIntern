import { auth } from "@/app/_lib/auth";

export const middleware = auth;

export const config = {
  matcher: [
    "/account",
    "/cart",
    "/favorite",
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
