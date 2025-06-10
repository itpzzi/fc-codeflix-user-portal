import { SessionUser } from "@/backend/user/types"
import { getToken, JWT } from "next-auth/jwt"
import { NextRequest, NextResponse } from "next/server"

type UserToken = JWT & { user?: SessionUser }

export async function middleware(request: NextRequest) {
  const token: UserToken | null = await getToken({ req: request })

  const url = request.nextUrl.clone()

  if (!token) {
    url.pathname = "/auth/login"
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/", "/home", "/search", "/watch", "/profile", "/settings"]
}
