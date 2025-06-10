import {
    getServerSession,
    type NextAuthOptions
} from "next-auth";

import Credentials from "next-auth/providers/credentials";

import { UserToken } from "@/backend/user/types";
import { authService } from "./AuthService";
import { JWT } from "next-auth/jwt";
import Keycloak from "next-auth/providers/keycloak";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    callbacks: {
        jwt: async ({ token, user, profile, account }) => {
            if (user) {
                token.user = user;
            }

            if (account && profile) {
                token.isChild = (profile as any).isChild || false;
            }

            return token;
        },
        session({ session, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.sub as string,
                    isChild: (token as UserToken).user?.isChild || (token as JWT).isChild || false,
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
        Keycloak({
            clientId: process.env.KEYCLOAK_CLIENT_ID!,
            clientSecret: process.env.KEYCLOAK_CLIENT_SECRET!,
            issuer: process.env.KEYCLOAK_ISSUER!
        })
    ],
};

export const getServerAuthSession = () => getServerSession(authOptions);