import { getServerSession } from "next-auth";
import { withAuth } from "next-auth/middleware";
import { NextURL } from "next/dist/server/web/next-url";
import { Truculenta } from "next/font/google";
import { NextRequest, NextResponse } from "next/server";
import { parse } from "url";
import { authOptions } from "./pages/api/auth/[...nextauth]";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    if (!req.nextauth.token) {
      return NextResponse.json({ error: "unauthenticated" });
    }
  },
  {
    pages: {
      signIn: "/auth1",
    },
    callbacks: {
      authorized: ({ req, token }) => {
        const parsedUrl = parse(req.url, false);
        if (!token) {
          if (parsedUrl.pathname?.startsWith("/api")) {
            return true;
          }
          return false;
        }
        return true;
      },
    },
  }
);
