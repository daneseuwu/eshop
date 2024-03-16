import authConfig from "./auth.config";
import NextAuth from "next-auth";

export const publics = ["/", "product", "/product/:path*", "/cart", "/empty"];
export const auths = ["/auth/signin", "/auth/signup"];
export const apiauthprefix = "/api/auth/providers";
export const default_redirect = "/";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isloggedIn = !!req.auth;

  const isapiauth = nextUrl.pathname.startsWith(apiauthprefix);
  const ispublics = publics.includes(nextUrl.pathname);
  const isauths = auths.includes(nextUrl.pathname);

  if (isapiauth) {
    return null;
  }

  if (isauths) {
    if (isloggedIn) {
      return Response.redirect(new URL(default_redirect, nextUrl));
    }
    return null;
  }

  if (!isloggedIn && !ispublics) {
    return Response.redirect(new URL("/auth/signin", nextUrl));
  }
  return null;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
