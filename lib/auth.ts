import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { admin } from "better-auth/plugins/admin";
import { username } from "better-auth/plugins/username";
// If your Prisma file is located elsewhere, you can change the path
import prisma from "@/lib/prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  plugins: [
    username(),
    nextCookies(),
    admin({
      // adminUserIds: ["6C8cmIgnYj9mUAhso0fBq46iXkkAkRdR"],
    }),
  ],
  user: {
    additionalFields: {
      active: {
        type: "boolean",
        default: false,
        input: false,
      },
      surname: {
        type: "string",
      },
    },
  },
});
