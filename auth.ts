import NextAuth, { type DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/db";
import { getUserById } from "./data/user";
import authConfig from "./auth.config";

import { JWT } from "next-auth/jwt";
import { UserRole } from "@prisma/client";
import { getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmation";
import { getAccountByUserId } from "./data/account";

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    role?: UserRole;
  }
}

export type ExtendedUser = {
  /** The user's postal address. */
  // id: string;
  role: UserRole;
  isTwoFactorEnabled: boolean;
  isOAuth: boolean;
  /**
   * By default, TypeScript merges new interface properties and overwrites existing ones.
   * In this case, the default session user properties will be overwritten,
   * with the new ones defined above. To keep the default session user properties,
   * you need to add them back into the newly declared interface.
   */
} & DefaultSession["user"];

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: ExtendedUser;
  }
}

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
  unstable_update,
} = NextAuth({
  pages: { signIn: "/auth/login", error: "/auth/error" },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      //allow oauth without email verification
      if (account?.provider !== "credentials") return true;

      //prevent signIn without email verification
      const existingUser = await getUserById(user.id as string);
      if (!existingUser?.emailVerified) return false;

      // 2fa check
      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id
        );
        console.log(twoFactorConfirmation, "--twofactorconfirmation");
        if (!twoFactorConfirmation) return false;

        //check if token expired

        //delete two factor confirmation for next signin
        await db.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id },
        });
      }

      return true;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const user = await getUserById(token.sub);
      if (!user) return token;

      const existingAccount = await getAccountByUserId(user.id);

      token.isOAuth = !!existingAccount;
      token.name = user.name;
      token.email = user.email;
      token.role = user.role;
      token.isTwoFactorEnabled = user.isTwoFactorEnabled;

      return token;
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role;
      }
      if (token.isTwoFactorEnabled && session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email as string;
        session.user.isOAuth = token.isOAuth as boolean;
      }
      return session;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
