import { authMiddleware } from "@clerk/nextjs";
 
export default authMiddleware({});
 
export const config = {
  publicRoutes: ["/api/webhooks/clerk"],
  
 
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};