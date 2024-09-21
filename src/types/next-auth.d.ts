import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    _id: string; // Make this required if you always want it to be present
    isVerified: boolean; // Make this required
    isAcceptingMessages: boolean; // Make this required
    username: string; // Make this required
  }

  interface Session {
    user: User & DefaultSession["user"]; // Extend DefaultSession's user with your User interface
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    _id: string; // Make this required
    isVerified: boolean; // Make this required
    isAcceptingMessages: boolean; // Make this required
    username: string; // Make this required
  }
}
