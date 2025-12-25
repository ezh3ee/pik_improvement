import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { z } from "zod";

interface IAdminUser {
  email: string;
  password: string;
  name: string;
  username: string;
  displayUsername: string;
  patronymic: string;
  surname: string;
}

const adminUserEnvSchema = z
  .object({
    ADMIN_EMAIL: z.string(),
    ADMIN_PASSWORD: z.string(),
    ADMIN_NAME: z.string(),
    ADMIN_USERNAME: z.string(),
    ADMIN_DISPLAY_USERNAME: z.string(),
    ADMIN_PATRONYMIC: z.string(),
    ADMIN_SURNAME: z.string(),
  })
  .transform((env) => ({
    email: env.ADMIN_EMAIL,
    password: env.ADMIN_PASSWORD,
    name: env.ADMIN_NAME,
    username: env.ADMIN_USERNAME,
    displayUsername: env.ADMIN_DISPLAY_USERNAME,
    patronymic: env.ADMIN_PATRONYMIC,
    surname: env.ADMIN_SURNAME,
  }));

async function main() {
  const adminData: IAdminUser = adminUserEnvSchema.parse(process.env);

  const adminUser = await auth.api.createUser({
    body: {
      email: adminData.email,
      password: adminData.password,
      name: adminData.name,
      role: "admin",
      data: {
        active: true,
        username: adminData.username,
        emailVerified: true,
        displayUsername: adminData.displayUsername,
        patronymic: adminData.patronymic,
        surname: adminData.surname,
      },
    },
  });

  console.log("adminUser successfully created", adminUser);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
