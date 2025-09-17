// prisma/seed.ts
import { prisma } from "../src/lib/prisma";
import bcrypt from "bcrypt";

async function main() {
  const adminExists = await prisma.user.findUnique({
    where: { email: "Admin@gmail.com" },
  });

  const categoriesExists = await prisma.category.findFirst({
    where: {
      name: "Instalação e atualização de softwares",
    },
  });

  const categories = [
    { name: "Instalação e atualização de softwares", basePrice: 150 },
    { name: "Instalação e atualização de hardwares", basePrice: 250 },
    { name: "Diagnóstico e remoção de vírus", basePrice: 170 },
    { name: "Suporte a impressoras", basePrice: 100 },
    { name: "Suporte a periféricos", basePrice: 120 },
    {
      name: "Solução de problemas de conectividade de internet",
      basePrice: 140,
    },
    { name: "Backup e recuperação de dados", basePrice: 220 },
    { name: "Otimização de desempenho do sistema operacional", basePrice: 230 },
    { name: "Configuração de VPN e Acesso Remoto", basePrice: 120 },
  ];

  if (!categoriesExists) {
    await prisma.category.createMany({
      data: categories,
      skipDuplicates: true,
    });
  }

  if (!adminExists) {
    await prisma.user.create({
      data: {
        username: "Admin",
        email: "Admin@gmail.com",
        password: await bcrypt.hash("AdminPassword", 10),
        role: "ADMIN",
      },
    });
    console.log("Created admin!!");
  } else {
    console.log("Admin already exists!");
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
