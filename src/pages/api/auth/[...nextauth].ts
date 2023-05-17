import NextAuth, { NextAuthOptions } from "next-auth";
import { useSession, signIn, signOut } from "next-auth/react";
import CredentialsProvider from "next-auth/providers/credentials";
import clientProimise from "@/lib/mongodb";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientProimise),
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth1",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "jsmith",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials, req) {
        const { username, password } = credentials as any;
        // const res = await fetch("http://localhost:8000/auth/login", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({
        //     username,
        //     password,
        //   }),
        // });

        // const user = await res.json();

        // console.log({ user });

        // if (res.ok && user) {
        //   return user;
        // } else return null;
        //  console.log({ username, password });
        return username;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 5,
  },
  callbacks: {
    async session({ session, user, token }) {
      //@ts-ignore
      session.user_creator = token.user_creator;
      console.log("sessionnnnnnnnnn", { session, user, token });
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      console.log("jwttttttttttttttt", {
        token,
        user,
        account,
        profile,
        isNewUser,
      });
      token.user_creator = "HJZ";
      return token;
    },
  },
};

export default NextAuth(authOptions);
