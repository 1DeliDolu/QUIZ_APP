import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

async function main() {
  const { PrismaClient } = await import("@prisma/client");
  const prisma = new PrismaClient();

  const app = express();
  app.use(cors());
  app.use(express.json());

  app.get("/api/sections", async (req: Request, res: Response) => {
    const s = await prisma.section.findMany();
    res.json(s);
  });

  app.get("/api/topics", async (req: Request, res: Response) => {
    const { sectionId } = req.query as { sectionId?: string };
    const where = sectionId ? { where: { sectionId: Number(sectionId) } } : {};
    const t = await prisma.topic.findMany(where);
    res.json(t);
  });

  app.get("/api/questions", async (req: Request, res: Response) => {
    const { topicId } = req.query as { topicId?: string };
    const where = topicId ? { where: { topicId: Number(topicId) } } : {};
    const q = await prisma.question.findMany(where);
    // choices stored as JSON string; parse before returning
    const parsed = q.map((item: any) => ({
      ...item,
      choices: JSON.parse(item.choices),
    }));
    res.json(parsed);
  });

  app.get("/api/wrong", async (req: Request, res: Response) => {
    const w = await prisma.wrongAnswer.findMany({
      include: { question: true },
    });
    res.json(w);
  });

  app.post("/api/wrong", async (req: Request, res: Response) => {
    const { questionId, chosenIndex, correctIndex } = req.body as {
      questionId: number;
      chosenIndex: number;
      correctIndex: number;
    };
    const existing = await prisma.wrongAnswer.findFirst({
      where: { questionId },
    });
    if (existing) {
      const updated = await prisma.wrongAnswer.update({
        where: { id: existing.id },
        data: {
          timesWrong: existing.timesWrong + 1,
          lastSeenAt: new Date(),
          chosenIndex,
        },
      });
      res.json(updated);
      return;
    }
    const created = await prisma.wrongAnswer.create({
      data: { questionId, chosenIndex, correctIndex },
    });
    res.json(created);
  });

  const port = Number(process.env.PORT || 4000);
  app.listen(port, () =>
    console.log(`Server running on http://localhost:${port}`)
  );
}

main().catch((err) => {
  console.error("Failed to start server", err);
  process.exit(1);
});
