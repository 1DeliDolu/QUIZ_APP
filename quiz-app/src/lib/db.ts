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

    const s1 = await this.sections.add({ id: 1, name: "Temel" });
    const t1 = await this.topics.add({
      id: 1,
      sectionId: s1,
      name: "Sınav Bilgisi",
    });

    await this.questions.bulkAdd([
      {
        id: 1,
        sectionId: s1,
        topicId: t1,
        text: "Yazılım testi nedir?",
        choices: ["Hata bulma", "Kalite güvencesi", "Dokümantasyon", "Derleme"],
        answerIndex: 1,
      },
      {
        id: 2,
        sectionId: s1,
        topicId: t1,
        text: "Black box testing hangi türdür?",
        choices: ["Beyaz kutu", "Kara kutu", "Performans", "Güvenlik"],
        answerIndex: 1,
      },
    ]);
  }
}

export const db = new QuizDB();
