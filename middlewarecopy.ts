
// import authConfig from "./auth.config";
// import NextAuth from "next-auth";
// import {
//   publicroute,
//   authroute,
//   apiauthprefix,
//   default_login_redirect,
// } from "@/routes";

// const { auth } = NextAuth(authConfig);

// export default auth((req) => {

//   const { nextUrl } = req;
//   const isloggedIn = !!req.auth;

//   const isapiauthroute = nextUrl.pathname.startsWith(apiauthprefix);
//   const ispublicroute = publicroute.includes(nextUrl.pathname);
//   const isauthroute = authroute.includes(nextUrl.pathname);

//   if (isapiauthroute) {
//     return null;
//   }

//   if (isauthroute) {
//     if (isloggedIn) {
//       return Response.redirect(new URL(default_login_redirect, nextUrl));
//     }
//     return null;
//   }

//   if (!isloggedIn && !ispublicroute) {
//     return Response.redirect(new URL("/auth/signin", nextUrl));
//   }
//   return null
// });

// export const config = {
//   matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
// };
