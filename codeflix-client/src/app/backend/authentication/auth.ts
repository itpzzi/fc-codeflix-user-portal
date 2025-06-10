; import {
    DefaultSession,
    getServerSession,
    type NextAuthOptions
} from "next-auth";

import Credentials from "next-auth/providers/credentials";

import { UserToken } from "@/backend/user/types";
import { authService } from "./AuthService";
import { JWT } from "next-auth/jwt";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    callbacks: {
        jwt: async ({ token, user }: { token: JWT; user: DefaultSession["user"] }) => {
            user && (token.user = user);
            return token;
        },
        session({ session, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.sub as string,
                    isChild: (token as UserToken).user?.isChild,
                }
            }
        },
    },
    pages: {
        signIn: "/auth/login"
    },
    providers: [
        Credentials({
            credentials: {
                email: { label: "E-mail", type: "email" },
                password: { label: "Senha", type: "password" }
            },
            authorize: async (credentials) => {

                if (!credentials?.email || !credentials.password) {
                    return null;
                }

                const user = await authService.login({
                    email: credentials.email,
                    password: credentials.password,
                })

                return user
            },

        }),
    ],
};

export const getServerAuthSession = () => getServerSession(authOptions);