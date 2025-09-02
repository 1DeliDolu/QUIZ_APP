import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seed verisi ekleniyor...");

  // Test kullanıcıları
  const testUsers = [
    {
      email: "admin@quiz.com",
      name: "Admin User",
      password: "admin123",
      role: "ADMIN" as const,
    },
    {
      email: "user@quiz.com",
      name: "Test User",
      password: "user123",
      role: "USER" as const,
    },
    {
      email: "john@example.com",
      name: "John Doe",
      password: "john123",
      role: "USER" as const,
    },
  ];

  // Kullanıcıları ekle
  for (const userData of testUsers) {
    const existingUser = await prisma.user.findUnique({
      where: { email: userData.email },
    });

    if (!existingUser) {
      await prisma.user.create({
        data: userData,
      });
      console.log(`✅ Kullanıcı eklendi: ${userData.email}`);
    } else {
      console.log(`⏭️ Kullanıcı zaten mevcut: ${userData.email}`);
    }
  }

  console.log("🎉 Seed işlemi tamamlandı!");
}

main()
  .catch((e) => {
    console.error("❌ Seed hatası:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
