import { useState, useCallback, useEffect } from "react";

export interface QuizHistoryItem {
  id: string;
  date: string;
  topic: string;
  topicTitle: string;
  score: number;
  total: number;
  percentage: number;
  timeSpent: number;
}

const STORAGE_KEY = "quiz-history";

function loadHistory(): QuizHistoryItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as QuizHistoryItem[];
  } catch {
    return [];
  }
}

function saveHistory(items: QuizHistoryItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {}
}

export function useQuizHistory() {
  const [history, setHistory] = useState<QuizHistoryItem[]>(() => loadHistory());

  useEffect(() => {
    saveHistory(history);
  }, [history]);

  const addResult = useCallback(
    (item: Omit<QuizHistoryItem, "id" | "date">) => {
      const newItem: QuizHistoryItem = {
        ...item,
        id: crypto.randomUUID?.() ?? Date.now().toString(36) + Math.random().toString(36).slice(2),
        date: new Date().toISOString(),
      };
      setHistory((prev) => [newItem, ...prev]);
      return newItem;
    },
    []
  );

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  const getOverallPercentage = useCallback(() => {
    if (history.length === 0) return 0;
    const totalScore = history.reduce((sum, h) => sum + h.score, 0);
    const totalQuestions = history.reduce((sum, h) => sum + h.total, 0);
    return Math.round((totalScore / totalQuestions) * 100);
  }, [history]);

  const getTopicStats = useCallback(() => {
    const stats: Record<string, { score: number; total: number; count: number }> = {};
    for (const h of history) {
      if (!stats[h.topic]) stats[h.topic] = { score: 0, total: 0, count: 0 };
      stats[h.topic].score += h.score;
      stats[h.topic].total += h.total;
      stats[h.topic].count += 1;
    }
    return Object.entries(stats).map(([topic, s]) => ({
      topic,
      title: s.count > 0 ? history.find((h) => h.topic === topic)?.topicTitle ?? topic : topic,
      percentage: Math.round((s.score / s.total) * 100),
      score: s.score,
      total: s.total,
      count: s.count,
    }));
  }, [history]);

  const getLatestByTopic = useCallback(
    (topic: string): QuizHistoryItem | undefined => {
      return history.find((h) => h.topic === topic);
    },
    [history]
  );

  return {
    history,
    addResult,
    clearHistory,
    getOverallPercentage,
    getTopicStats,
    getLatestByTopic,
  };
}
