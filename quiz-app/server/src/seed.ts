import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.wrongAnswer.deleteMany();
  await prisma.question.deleteMany();
  await prisma.topic.deleteMany();
  await prisma.section.deleteMany();

  const s = await prisma.section.create({ data: { name: "Temel" } });
  const t = await prisma.topic.create({
    data: { name: "Sınav Bilgisi", sectionId: s.id },
  });

  await prisma.question.createMany({
    data: [
      {
        sectionId: s.id,
        topicId: t.id,
        text: "Yazılım testi nedir?",
        choices: JSON.stringify([
          "Hata bulma",
          "Kalite güvencesi",
          "Dokümantasyon",
          "Derleme",
        ]),
        answerIndex: 1,
      },
      {
        sectionId: s.id,
        topicId: t.id,
        text: "Black box testing hangi türdür?",
        choices: JSON.stringify([
          "Beyaz kutu",
          "Kara kutu",
          "Performans",
          "Güvenlik",
        ]),
        answerIndex: 1,
      },
    ],
  });
}

main()
  .then(() => {
    console.log("Seed done");
    process.exit(0);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
