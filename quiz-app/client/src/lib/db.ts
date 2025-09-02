import Dexie from "dexie";
import type { Section, Topic, Question, Wrong } from "./types";

class QuizDB extends Dexie {
  sections!: Dexie.Table<Section, number>;
  topics!: Dexie.Table<Topic, number>;
  questions!: Dexie.Table<Question, number>;
  wrong!: Dexie.Table<Wrong, number>;

  constructor() {
    super("quizDB");
    this.version(1).stores({
      sections: "++id, name",
      topics: "++id, sectionId, name",
      questions: "id, topicId, sectionId",
      wrong: "++id, questionId, topicId, sectionId",
    });

    this.sections = this.table("sections");
    this.topics = this.table("topics");
    this.questions = this.table("questions");
    this.wrong = this.table("wrong");
  }

  async seedIfEmpty() {
    const cnt = await this.questions.count();
    if (cnt > 0) return;

    const s1Id = await this.sections.add({ id: 1, name: "Bölüm 1" });
    const t1Id = await this.topics.add({ id: 1, sectionId: s1Id, name: "Sınav 1" });

    await this.questions.bulkAdd([
      {
        id: 1,
        sectionId: s1Id,
        topicId: t1Id,
        text: "Örnek soru: Yazılım testi nedir?",
        choices: ["Hata bulma", "Kalite güvencesi", "Dokümantasyon", "Derleme"],
        answerIndex: 1,
      },
    ]);
  }
}

export const db = new QuizDB();

export async function getNextQuestionId(): Promise<number> {
  const last = await db.questions.orderBy("id").last();
  return last ? last.id + 1 : 1;
}

