import { withAuth } from "next-auth/middleware";

export const config = { matcher: ["/", "/calendar", "/rating"] };

export default withAuth({
  // Matches the pages config in `[...nextauth]`
  pages: {
    signIn: "/login",
    signOut: "/logout",
    error: "/error",
  },
});
