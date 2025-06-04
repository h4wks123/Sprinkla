import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      role: string;
      toaster: {
        status: number;
        message: string;
      };
    };
  }

  interface User {
    id: string;
    email: string | null;
    role: string | null;
    toaster: {
      status: number;
      message: string;
    };
  }

  interface JWT {
    id: string;
    email: string;
    role: string;
    toaster?: {
      status: number;
      message: string;
    };
  }
}
