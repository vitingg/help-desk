import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("AdminPassword", 10); // senha default

  await prisma.user.upsert({
    where: { email: "admin@system.com" }, // garante que não duplica
    update: {},
    create: {
      username: "Admin",
      email: "Admin@system.com",
      password: password,
      role: "ADMIN",
    },
  });

  console.log("✅ Usuário admin criado com sucesso");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
