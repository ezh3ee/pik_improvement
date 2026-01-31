import { auth } from "@/lib/auth";
import { Prisma } from "@/lib/generated/prisma/client";
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
  await createAdmin();
  await createPosition();
}

async function createAdmin() {
  const adminUserExists = await prisma.user.findUnique({
    where: {
      email: adminUserEnvSchema.parse(process.env).email,
    },
  });

  if (adminUserExists) {
    return console.log("Admin user already exists");
  }

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

async function createPosition() {
  const isPositionExists = await prisma.userPosition.findMany();

  if (isPositionExists.length > 0) {
    return console.log("Position already exists");
  }

  const positionToCreate: Prisma.UserPositionCreateInput = {
    name: "Инженер",
  };

  try {
    await prisma.userPosition.create({
      data: positionToCreate,
    });
  } catch (e) {
    console.log("ERROR from createPosition action ", e);
  }

  console.log("Position successfully created");
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
