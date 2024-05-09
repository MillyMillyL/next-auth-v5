import { auth } from "@/auth";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  console.log(isLoggedIn);
  console.log("Route:", req.nextUrl.pathname);
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
