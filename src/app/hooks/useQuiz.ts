import { useState, useCallback } from "react";
import type { QuizQuestion } from "../data/quiz-questions";

export function useQuiz(questions: QuizQuestion[]) {
  const [shuffled] = useState(() => {
    const arr = [...questions];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [startTime] = useState(Date.now());
  const [endTime, setEndTime] = useState<number | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);

  const totalQuestions = shuffled.length;
  const currentQuestion = shuffled[currentIndex] ?? null;
  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === totalQuestions;

  const answerQuestion = useCallback(
    (optionIndex: number) => {
      if (!currentQuestion || isComplete) return;
      setAnswers((prev) => ({ ...prev, [currentQuestion.id]: optionIndex }));
    },
    [currentQuestion, isComplete]
  );

  const nextQuestion = useCallback(() => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      setEndTime(Date.now());
      setIsComplete(true);
    }
  }, [currentIndex, totalQuestions]);

  const prevQuestion = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    }
  }, [currentIndex]);

  const finishQuiz = useCallback(() => {
    setEndTime(Date.now());
    setIsComplete(true);
  }, []);

  const getScore = useCallback(() => {
    let correct = 0;
    for (const q of shuffled) {
      if (answers[q.id] === q.correctIndex) correct++;
    }
    return correct;
  }, [shuffled, answers]);

  const getPerTopicScore = useCallback(() => {
    const stats: Record<string, { correct: number; total: number }> = {};
    for (const q of shuffled) {
      if (!stats[q.topic]) stats[q.topic] = { correct: 0, total: 0 };
      stats[q.topic].total += 1;
      if (answers[q.id] === q.correctIndex) stats[q.topic].correct += 1;
    }
    return Object.entries(stats).map(([topic, s]) => ({
      topic,
      correct: s.correct,
      total: s.total,
      percentage: Math.round((s.correct / s.total) * 100),
    }));
  }, [shuffled, answers]);

  const getResults = useCallback(() => {
    const correct = getScore();
    return {
      score: correct,
      total: totalQuestions,
      percentage: Math.round((correct / totalQuestions) * 100),
      answers,
      questions: shuffled,
      perTopic: getPerTopicScore(),
    };
  }, [getScore, totalQuestions, answers, shuffled, getPerTopicScore]);

  const reset = useCallback(() => {
    setCurrentIndex(0);
    setAnswers({});
    setIsComplete(false);
    setEndTime(null);
    setReviewMode(false);
  }, []);

  const timeSpent = endTime ? Math.floor((endTime - startTime) / 1000) : 0;

  return {
    currentQuestion,
    currentIndex,
    totalQuestions,
    answers,
    isComplete,
    answeredCount,
    allAnswered,
    timeSpent,
    reviewMode,
    answerQuestion,
    nextQuestion,
    prevQuestion,
    finishQuiz,
    getScore,
    getResults,
    reset,
  };
}
