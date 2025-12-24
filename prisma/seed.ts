import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

async function main() {
  const adminUser = await auth.api.createUser({
    body: {
      email: "admin@example.com",
      password: "admin",
      name: "Admin",
      role: "admin",
      data: {
        active: true,
        username: "admin",
        emailVerified: true,
        displayUsername: "admin",
        patronymic: "Adminovich",
        surname: "Adminov",
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
