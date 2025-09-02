import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

async function main() {
  const { PrismaClient } = await import("@prisma/client");
  const prisma = new PrismaClient();

  const app = express();

  // CORS ayarları
  app.use(
    cors({
      origin: [
        "http://localhost:5174",
        "http://localhost:5175",
        "http://localhost:3000",
      ],
      credentials: true,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );

  app.use(express.json());

  app.get("/api/sections", async (req: Request, res: Response) => {
    const s = await prisma.section.findMany();
    res.json(s);
  });

  app.get("/api/topics", async (req: Request, res: Response) => {
    const { sectionId } = req.query as { sectionId?: string };
    const findManyArgs = sectionId
      ? { where: { sectionId: Number(sectionId) } }
      : undefined;
    const t = await prisma.topic.findMany(findManyArgs);
    res.json(t);
  });

  app.get("/api/questions", async (req: Request, res: Response) => {
    const { topicId } = req.query as { topicId?: string };
    const findManyArgs = topicId
      ? { where: { topicId: Number(topicId) } }
      : undefined;
    const q = await prisma.question.findMany(findManyArgs);
    // choices stored as JSON string; parse before returning
    const parsed = q.map((item: any) => ({
      ...item,
      choices: JSON.parse(item.choices),
    }));
    res.json(parsed);
  });

  // app.get("/api/wrong", async (req: Request, res: Response) => {
  //   const w = await prisma.wronganswer.findMany({
  //     include: { question: true },
  //   });
  //   res.json(w);
  // });

  // app.post("/api/wrong", async (req: Request, res: Response) => {
  //   const { questionId, chosenIndex, correctIndex } = req.body as {
  //     questionId: number;
  //     chosenIndex: number;
  //     correctIndex: number;
  //   };
  //   const existing = await prisma.wronganswer.findFirst({
  //     where: { questionId },
  //   });
  //   if (existing) {
  //     const updated = await prisma.wronganswer.update({
  //       where: { id: existing.id },
  //       data: {
  //         timesWrong: existing.timesWrong + 1,
  //         lastSeenAt: new Date(),
  //         chosenIndex,
  //       },
  //     });
  //     res.json(updated);
  //     return;
  //   }
  //   const created = await prisma.wronganswer.create({
  //     data: { questionId, chosenIndex, correctIndex },
  //   });
  //   res.json(created);
  // });

  // Admin CMS endpoints
  app.post("/api/sections", async (req: Request, res: Response) => {
    try {
      const { name } = req.body;
      if (!name || !name.trim()) {
        return res.status(400).json({ error: "Section name is required" });
      }

      const section = await prisma.section.create({
        data: { name: name.trim() },
      });

      res.json(section);
    } catch (error) {
      console.error("Create section error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/topics", async (req: Request, res: Response) => {
    try {
      const { name, sectionId } = req.body;
      if (!name || !name.trim()) {
        return res.status(400).json({ error: "Topic name is required" });
      }
      if (!sectionId) {
        return res.status(400).json({ error: "Section ID is required" });
      }

      const topic = await prisma.topic.create({
        data: {
          name: name.trim(),
          sectionId: Number(sectionId),
        },
      });

      res.json(topic);
    } catch (error) {
      console.error("Create topic error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/questions", async (req: Request, res: Response) => {
    try {
      const { text, choices, answerIndex, sectionId, topicId } = req.body;

      if (!text || !text.trim()) {
        return res.status(400).json({ error: "Question text is required" });
      }
      if (!Array.isArray(choices) || choices.length !== 4) {
        return res.status(400).json({ error: "4 choices are required" });
      }
      if (choices.some((c) => !c || !c.trim())) {
        return res.status(400).json({ error: "All choices must be filled" });
      }
      if (answerIndex < 0 || answerIndex > 3) {
        return res.status(400).json({ error: "Invalid answer index" });
      }
      if (!sectionId || !topicId) {
        return res
          .status(400)
          .json({ error: "Section ID and Topic ID are required" });
      }

      const question = await prisma.question.create({
        data: {
          text: text.trim(),
          choices: JSON.stringify(choices.map((c) => c.trim())),
          answerIndex: Number(answerIndex),
          sectionId: Number(sectionId),
          topicId: Number(topicId),
        },
      });

      res.json(question);
    } catch (error) {
      console.error("Create question error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Auth endpoints
  app.post("/api/auth/register", async (req: Request, res: Response) => {
    try {
      const { email, password, name } = req.body;

      // Email kontrolü
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return res.status(400).json({ error: "Email already exists" });
      }

      // Kullanıcı oluştur
      const user = await prisma.user.create({
        data: {
          email,
          name,
          password, // Gerçek uygulamada bcrypt ile hash'lenmeli
          role: email === "admin@quiz.com" ? "ADMIN" : "USER",
          updatedAt: new Date(),
        },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          createdAt: true,
        },
      });

      res.status(201).json({
        success: true,
        user: {
          id: user.id.toString(),
          email: user.email,
          name: user.name,
          role: user.role.toLowerCase(),
        },
      });
    } catch (error) {
      console.error("Register error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/auth/login", async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const user = await prisma.user.findUnique({
        where: { email },
        select: {
          id: true,
          email: true,
          name: true,
          password: true,
          role: true,
        },
      });

      if (!user || user.password !== password) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      res.json({
        success: true,
        user: {
          id: user.id.toString(),
          email: user.email,
          name: user.name,
          role: user.role.toLowerCase(),
        },
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/auth/users", async (req: Request, res: Response) => {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          createdAt: true,
        },
      });

      res.json({
        success: true,
        users: users.map((user) => ({
          ...user,
          id: user.id.toString(),
          role: user.role.toLowerCase(),
        })),
      });
    } catch (error) {
      console.error("Get users error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  const port = Number(process.env.PORT || 4007);
  app.listen(port, () =>
    console.log(`Server running on http://localhost:${port}`)
  );
}

main().catch((err) => {
  console.error("Failed to start server", err);
  process.exit(1);
});
