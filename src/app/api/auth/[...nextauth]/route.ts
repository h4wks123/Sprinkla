import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import loginUser from "@/libs/database/queries/users/loginUsers";

export type User = {
  id: string;
  email: string | null;
  role: string | null;
};

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials, req): Promise<User | null> => {
        const user = await loginUser(credentials!.email, credentials!.password);
        if (user.status === 200) {
          return {
            id: `${user.id}`,
            email: user.email,
            role: user.role,
          };
        }
        return null;
      },
    }),
  ],
  strategy: "jwt",
  callbacks: {
    jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }: { session: any; token: any }) {
      session.user.role = token.role;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
