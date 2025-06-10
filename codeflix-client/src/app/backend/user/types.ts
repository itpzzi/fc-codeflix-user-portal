import { type DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
    interface Session extends DefaultSession {
        user: SessionUser;
    }
}

export type SessionUser = {
    id: string;
    isChild: boolean;
} & DefaultSession["user"];

export type UserToken = JWT & { user?: SessionUser }

export type UserProps = {
    id: string;
    name: string;
    email: string;
    passwordHash: string;
    isChild: boolean;
};