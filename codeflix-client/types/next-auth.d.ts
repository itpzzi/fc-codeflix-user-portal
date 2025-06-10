import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      isChild: boolean
    }
  }

  interface User {
    isChild: boolean
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    isChild: boolean
  }
}