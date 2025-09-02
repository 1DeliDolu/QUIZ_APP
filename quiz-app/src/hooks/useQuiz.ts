import { useEffect, useState } from "react";
import { db } from "../lib/db";
import type { Question } from "../lib/types";

export function useQuiz(topicId: number | null) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    (async () => {
      await db.seedIfEmpty();
      if (topicId == null) {
        const all = await db.questions.toArray();
        if (mounted) setQuestions(all);
      } else {
        const q = await db.questions.where("topicId").equals(topicId).toArray();
        if (mounted) setQuestions(q);
      }
      if (mounted) setLoading(false);
    })();

    return () => {
      mounted = false;
    };
  }, [topicId]);

  async function submitAnswer(question: Question, chosenIndex: number) {
    if (chosenIndex !== question.answerIndex) {
      // record wrong
      const now = Date.now();
      const existing = await db.wrong
        .where("questionId")
        .equals(question.id)
        .first();
      if (existing) {
        await db.wrong.update(existing.id!, {
          chosenIndex,
          lastSeenAt: now,
          timesWrong: (existing.timesWrong || 0) + 1,
        });
      } else {
        await db.wrong.add({
          questionId: question.id,
          sectionId: question.sectionId,
          topicId: question.topicId,
          chosenIndex,
          correctIndex: question.answerIndex,
          lastSeenAt: now,
          timesWrong: 1,
        });
      }
      return false;
    }
    return true;
  }

  return { questions, loading, submitAnswer };
}
