export type Section = {
  id: number;
  name: string;
};

export type Topic = {
  id: number;
  sectionId: number;
  name: string;
};

export type Question = {
  id: number;
  sectionId: number;
  topicId: number;
  text: string;
  choices: string[];
  answerIndex: number;
};

export type Wrong = {
  id?: number;
  questionId: number;
  sectionId: number;
  topicId: number;
  chosenIndex: number;
  correctIndex: number;
  lastSeenAt: number;
  timesWrong: number;
};

