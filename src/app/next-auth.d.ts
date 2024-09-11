import NextAuth from "next-auth"; // eslint-disable-line @typescript-eslint/no-unused-vars

declare module "next-auth" {
  interface Session {
    user: {
      name: string;
      email: string;
      role: "admin" | "user";
    };
  }
}
