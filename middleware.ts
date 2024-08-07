import { NextResponse } from "next/server";
import { auth } from "./app/api/auth/[...nextauth]/route";

const loginPages = ["/login", "/register"];

export default auth((req) => {
  if (!req.auth && config.matcher.includes(`/${req.nextUrl.pathname}`)) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  } else if (req.auth && loginPages.includes(`/${req.nextUrl.pathname}`)) {
    return NextResponse.redirect(new URL("/account", req.nextUrl));
  }
  return NextResponse.next();
});

export const config = {
  matcher: ["/account", "/cart", "/favorite"],
};
