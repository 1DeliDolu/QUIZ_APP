import { useEffect, useState } from "react";

const API_BASE_URL = "http://localhost:4006/api";

export interface Section {
  id: number;
  name: string;
}

export interface Topic {
  id: number;
  name: string;
  sectionId: number;
}

export interface Question {
  id: number;
  text: string;
  choices: string[];
  answerIndex: number;
  sectionId: number;
  topicId: number;
}

export interface WrongAnswer {
  id: number;
  questionId: number;
  chosenIndex: number;
  correctIndex: number;
  timesWrong: number;
  lastSeenAt: string;
}

// Sections hook
export function useSections() {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSections() {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/sections`);
        if (!response.ok) throw new Error("Sections yüklenemedi");
        const data = await response.json();
        setSections(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Bilinmeyen hata");
      } finally {
        setLoading(false);
      }
    }

    fetchSections();
  }, []);

  return { sections, loading, error };
}

// Topics hook
export function useTopics(sectionId?: number) {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTopics() {
      try {
        setLoading(true);
        const url = sectionId
          ? `${API_BASE_URL}/topics?sectionId=${sectionId}`
          : `${API_BASE_URL}/topics`;
        const response = await fetch(url);
        if (!response.ok) throw new Error("Topics yüklenemedi");
        const data = await response.json();
        setTopics(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Bilinmeyen hata");
      } finally {
        setLoading(false);
      }
    }

    fetchTopics();
  }, [sectionId]);

  return { topics, loading, error };
}

// Questions hook
export function useQuestions(topicId?: number) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        setLoading(true);
        const url = topicId
          ? `${API_BASE_URL}/questions?topicId=${topicId}`
          : `${API_BASE_URL}/questions`;
        const response = await fetch(url);
        if (!response.ok) throw new Error("Sorular yüklenemedi");
        const data = await response.json();
        setQuestions(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Bilinmeyen hata");
      } finally {
        setLoading(false);
      }
    }

    fetchQuestions();
  }, [topicId]);

  async function submitAnswer(
    question: Question,
    chosenIndex: number
  ): Promise<boolean> {
    if (chosenIndex !== question.answerIndex) {
      // Yanlış cevap - sunucuya kaydet
      try {
        await fetch(`${API_BASE_URL}/wrong`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            questionId: question.id,
            chosenIndex,
            correctIndex: question.answerIndex,
          }),
        });
      } catch (err) {
        console.error("Wrong answer kayıt hatası:", err);
      }
      return false;
    }
    return true;
  }

  return { questions, loading, error, submitAnswer };
}

// Wrong answers hook
export function useWrongAnswers() {
  const [wrongAnswers, setWrongAnswers] = useState<WrongAnswer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWrongAnswers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/wrong`);
      if (!response.ok) throw new Error("Yanlış cevaplar yüklenemedi");
      const data = await response.json();
      setWrongAnswers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Bilinmeyen hata");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWrongAnswers();
  }, []);

  return { wrongAnswers, loading, error, refetch: fetchWrongAnswers };
}
