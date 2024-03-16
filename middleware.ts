import { authMiddleware } from "@clerk/nextjs";
 
export default authMiddleware({});
 
export const config = {
  publicRoutes: ["/api/webhooks/clerk"],
  // Protects all routes, including api/trpc.
 
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};