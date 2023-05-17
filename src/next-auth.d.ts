import NextAuth from "next-auth";
import NextAuth1 from "next-auth/jwt";
declare module "next-auth" {
  interface Session {
    user_creator: string;
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    user_creator: string;
  }
}
