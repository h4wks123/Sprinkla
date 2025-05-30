import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import loginUser from "@/libs/database/queries/users/loginUsers";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials, req) => {
        const user = await loginUser(credentials!.email, credentials!.password);

        if (user !== null) {
          return {
            id: `${user.id}`,
            email: user.email,
            role: user.role,
            toaster: {
              status: user.status,
              message: user.message,
            },
          };
        }
        return null;
      },
    }),
  ],
  strategy: "jwt",
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.role = user.role;
        token.toaster = user.toaster;
      }
      return token;
    },
    session({ session, token }: { session: any; token: any }) {
      session.user.role = token.role;
      session.user.toaster = token.toaster;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
