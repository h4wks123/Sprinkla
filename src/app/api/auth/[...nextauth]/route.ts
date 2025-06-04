import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import loginUser from "@/libs/database/queries/users/loginUsers";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
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
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.role = user.role;
        token.toaster = user.toaster;
      }
      return token;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    session({ session, token }: { session: any; token: any }) {
      session.user.role = token.role;
      session.user.toaster = token.toaster;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
