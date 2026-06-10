import { supabase } from "../../../lib/supabase";
import { generateSlug } from "../../../lib/utils";
import type { QuizQuestion } from "../../../data/quiz-questions";
import { getSession, clearSession } from "../../auth/services/auth.service";

export interface Quiz {
  id: string;
  user_id: string;
  slug: string;
  title: string;
  topic: string;
  category: string;
  description: string;
  time_limit: number;
  is_active: boolean;
  shuffle_questions: boolean;
  created_at: string;
}

export interface Question {
  id: string;
  quiz_id: string;
  question: string;
  options: string[];
  correct_index: number;
  difficulty: string;
}

export interface StudentAttempt {
  id: string;
  quiz_id: string;
  student_name: string;
  student_number: string;
  student_class: string;
  score: number;
  total_questions: number;
  percentage: number;
  time_spent: number;
  created_at: string;
}

export async function createQuiz(data: {
  title: string;
  topic: string;
  category: string;
  description: string;
  time_limit: number;
  shuffle_questions: boolean;
  questions: { question: string; options: string[]; correctIndex: number; difficulty: string }[];
}) {
  const user = getSession();
  if (!user) throw new Error("Not authenticated");

  // Verifikasi user masih ada di database
  const { data: dbUser } = await supabase
    .from("users")
    .select("id")
    .eq("id", user.id)
    .maybeSingle();

  if (!dbUser) {
    clearSession();
    throw new Error("Sesi tidak valid. Silakan login ulang.");
  }

  const slug = generateSlug();
  const { data: quiz, error: quizError } = await supabase
    .from("quizzes")
    .insert({
      user_id: user.id,
      slug,
      title: data.title,
      topic: data.topic,
      category: data.category,
      description: data.description,
      time_limit: data.time_limit,
      shuffle_questions: data.shuffle_questions,
    })
    .select()
    .single();

  if (quizError) throw quizError;

  const questionData = data.questions.map((q) => ({
    quiz_id: quiz.id,
    question: q.question,
    options: q.options,
    correct_index: q.correctIndex,
    difficulty: q.difficulty,
  }));

  const { error: qError } = await supabase.from("questions").insert(questionData);
  if (qError) throw qError;

  return { ...quiz, slug };
}

export async function getMyQuizzes(): Promise<Quiz[]> {
  const user = getSession();
  if (!user) return [];

  const { data } = await supabase
    .from("quizzes")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return data ?? [];
}

export async function getQuizBySlug(slug: string): Promise<{ quiz: Quiz; questions: QuizQuestion[] } | null> {
  const { data: quiz } = await supabase
    .from("quizzes")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!quiz) return null;

  const { data: questions } = await supabase
    .from("questions")
    .select("*")
    .eq("quiz_id", quiz.id)
    .order("created_at");

  return {
    quiz,
    questions: (questions ?? []).map((q: any) => ({
      id: q.id,
      topic: quiz.topic,
      difficulty: q.difficulty,
      category: "Custom",
      question: q.question,
      options: q.options,
      correctIndex: q.correct_index,
      explanation: "",
    })),
  };
}

export async function deleteQuiz(quizId: string) {
  const { error } = await supabase.from("quizzes").delete().eq("id", quizId);
  if (error) throw error;
}

export async function toggleQuizStatus(quizId: string, isActive: boolean) {
  const { error } = await supabase
    .from("quizzes")
    .update({ is_active: isActive })
    .eq("id", quizId);
  if (error) throw error;
}

export async function submitStudentAttempt(data: {
  quiz_id: string;
  student_name: string;
  student_number: string;
  student_class: string;
  answers: { question_id: string; selected_index: number; is_correct: boolean }[];
  score: number;
  total_questions: number;
  time_spent: number;
}) {
  const { data: attempt, error: attemptError } = await supabase
    .from("student_attempts")
    .insert({
      quiz_id: data.quiz_id,
      student_name: data.student_name,
      student_number: data.student_number,
      student_class: data.student_class,
      score: data.score,
      total_questions: data.total_questions,
      percentage: Math.round((data.score / data.total_questions) * 100 * 100) / 100,
      time_spent: data.time_spent,
      status: "completed",
    })
    .select()
    .single();

  if (attemptError) throw attemptError;

  const answerData = data.answers.map((a) => ({
    attempt_id: attempt.id,
    question_id: a.question_id,
    selected_index: a.selected_index,
    is_correct: a.is_correct,
  }));

  const { error: ansError } = await supabase.from("student_answers").insert(answerData);
  if (ansError) throw ansError;

  return attempt;
}

export async function getQuizQuestions(quizId: string) {
  const { data } = await supabase
    .from("questions")
    .select("*")
    .eq("quiz_id", quizId)
    .order("created_at");

  return data ?? [];
}

export async function getQuizAttempts(quizId: string): Promise<StudentAttempt[]> {
  const { data } = await supabase
    .from("student_attempts")
    .select("*")
    .eq("quiz_id", quizId)
    .order("created_at", { ascending: false });

  return data ?? [];
}

export async function getAttemptDetail(attemptId: string) {
  const { data: attempt } = await supabase
    .from("student_attempts")
    .select("*")
    .eq("id", attemptId)
    .single();

  if (!attempt) return null;

  const { data: answers } = await supabase
    .from("student_answers")
    .select("*, questions:question_id(*)")
    .eq("attempt_id", attemptId);

  return { attempt, answers: answers ?? [] };
}

export async function getAllTeacherAttempts() {
  const user = getSession();
  if (!user) return [];

  const { data } = await supabase
    .from("student_attempts")
    .select("*, quizzes!inner(title, topic, category, user_id)")
    .eq("quizzes.user_id", user.id)
    .order("created_at", { ascending: false });

  return data ?? [];
}

export async function deleteAttempt(attemptId: string): Promise<void> {
  await supabase.from("student_attempts").delete().eq("id", attemptId);
}

export async function checkExistingAttempt(
  quizId: string,
  studentName: string,
  studentNumber: string,
  studentClass: string,
): Promise<boolean> {
  const { data } = await supabase
    .from("student_attempts")
    .select("id")
    .eq("quiz_id", quizId)
    .eq("student_name", studentName)
    .eq("student_number", studentNumber)
    .eq("student_class", studentClass)
    .maybeSingle();

  return !!data;
}

export async function getQuizCategories(): Promise<string[]> {
  const user = getSession();
  if (!user) return [];

  const { data } = await supabase
    .from("quizzes")
    .select("category")
    .eq("user_id", user.id)
    .neq("category", "")
    .order("category");

  const unique = [...new Set((data ?? []).map((d) => d.category).filter(Boolean))];
  return unique;
}

export async function getQuestionCounts(quizIds: string[]): Promise<Record<string, number>> {
  if (quizIds.length === 0) return {};

  const { data } = await supabase
    .from("questions")
    .select("quiz_id")
    .in("quiz_id", quizIds);

  const counts: Record<string, number> = {};
  for (const id of quizIds) counts[id] = 0;
  for (const row of data ?? []) {
    counts[row.quiz_id] = (counts[row.quiz_id] || 0) + 1;
  }
  return counts;
}

export async function getAttemptStats(quizIds: string[]): Promise<Record<string, { count: number; avgScore: number }>> {
  if (quizIds.length === 0) return {};

  const { data } = await supabase
    .from("student_attempts")
    .select("quiz_id, percentage")
    .in("quiz_id", quizIds);

  const sums: Record<string, { count: number; total: number }> = {};
  for (const id of quizIds) sums[id] = { count: 0, total: 0 };
  for (const row of data ?? []) {
    if (sums[row.quiz_id]) {
      sums[row.quiz_id].count += 1;
      sums[row.quiz_id].total += Number(row.percentage);
    }
  }

  const result: Record<string, { count: number; avgScore: number }> = {};
  for (const id of quizIds) {
    const s = sums[id];
    result[id] = {
      count: s.count,
      avgScore: s.count > 0 ? Math.round(s.total / s.count) : 0,
    };
  }
  return result;
}
