import NextAuth from "next-auth";
import { authOptions } from "@/backend/authentication/auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };