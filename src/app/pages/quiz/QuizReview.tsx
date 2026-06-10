import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { ArrowLeft, CheckCircle2, XCircle, RotateCcw, ChevronLeft } from "lucide-react";
import { motion } from "motion/react";
import { useLanguage } from "../../contexts/LanguageContext";
import { useQuizHistory } from "../../hooks/useQuizHistory";
import { cn } from "../../components/ui/utils";
import type { QuizAttemptDetail } from "../../hooks/useQuizHistory";
import type { QuizHistoryItem } from "../../hooks/useQuizHistory";

export function QuizReview() {
  const { t } = useLanguage();
  const { attemptId } = useParams<{ attemptId: string }>();
  const navigate = useNavigate();
  const { history, getAttemptDetail } = useQuizHistory();
  const [detail, setDetail] = useState<QuizAttemptDetail | null>(null);
  const [session, setSession] = useState<QuizHistoryItem | null>(null);

  useEffect(() => {
    if (!attemptId) return;
    const s = history.find((h) => h.id === attemptId);
    const d = getAttemptDetail(attemptId);
    setSession(s ?? null);
    setDetail(d);
  }, [attemptId, history, getAttemptDetail]);

  if (!session || !detail || detail.questions.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4 max-w-md mx-auto px-4">
          <XCircle className="w-12 h-12 text-muted-foreground mx-auto opacity-50" />
          <h2 className="text-xl font-bold text-foreground">{t("quizReview.notFound")}</h2>
          <p className="text-sm text-muted-foreground">
            {t("quizReview.notFoundDesc")}
          </p>
          <Link
            to="/quiz"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white text-sm font-medium shadow-lg"
          >
            {t("quizReview.backToQuiz")}
          </Link>
        </div>
      </div>
    );
  }

  const correctCount = detail.questions.filter(
    (q) => detail.answers[q.id] === q.correctIndex
  ).length;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="space-y-6">
          {/* Back */}
          <Link
            to="/quiz"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            {t("quizReview.backToQuiz")}
          </Link>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-border rounded-2xl p-6 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-lg font-bold text-foreground">{t("quizReview.title")}</h1>
                <p className="text-sm text-muted-foreground mt-1">{session.topicTitle}</p>
              </div>
              <div className="text-right">
                <p className={cn(
                  "text-2xl font-bold",
                  session.percentage >= 85 ? "text-emerald-600 dark:text-emerald-400" :
                  session.percentage >= 70 ? "text-blue-600 dark:text-blue-400" :
                  session.percentage >= 50 ? "text-amber-600 dark:text-amber-400" :
                  "text-red-500"
                )}>
                  {session.percentage}%
                </p>
                <p className="text-xs text-muted-foreground">
                  {t("quizReview.correct").replace("{count}", `${correctCount}/${session.total}`)}
                </p>
              </div>
            </div>

            <button
              onClick={() => navigate(`/quiz/${session.topic}`)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white text-sm font-medium hover:shadow-lg transition-all duration-200"
            >
              <RotateCcw className="w-4 h-4" />
              {t("quizReview.retry")}
            </button>
          </motion.div>

          {/* Questions */}
          <div className="space-y-4">
            <h2 className="text-sm font-semibold text-foreground">{t("quizReview.answers")}</h2>
            {detail.questions.map((q, i) => {
              const userAnswer = detail.answers[q.id];
              const isCorrect = userAnswer === q.correctIndex;
              return (
                <motion.div
                  key={q.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className={cn(
                    "p-5 rounded-xl border",
                    isCorrect
                      ? "bg-emerald-50/50 dark:bg-emerald-950/10 border-emerald-200/50 dark:border-emerald-800/30"
                      : "bg-red-50/50 dark:bg-red-950/10 border-red-200/50 dark:border-red-800/30"
                  )}
                >
                  <div className="flex items-start gap-3">
                    {isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground mb-3">
                        {i + 1}. {q.question}
                      </p>
                      <div className="space-y-1.5">
                        {q.options.map((opt, oi) => {
                          const isSelected = userAnswer === oi;
                          const isOptCorrect = q.correctIndex === oi;
                          return (
                            <div
                              key={oi}
                              className={cn(
                                "px-3 py-2 rounded-lg text-xs leading-relaxed",
                                isOptCorrect
                                  ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 font-medium"
                                  : isSelected
                                  ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 font-medium"
                                  : "text-muted-foreground"
                              )}
                            >
                              {String.fromCharCode(65 + oi)}. {opt}
                            </div>
                          );
                        })}
                      </div>
                      {!isCorrect && (
                        <div className="mt-3 pt-3 border-t border-border/50">
                          <p className="text-xs text-muted-foreground">
                            <span className="font-medium text-foreground">{t("quizReview.explanation")}</span>{" "}
                            {q.explanation}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Back to Results */}
          <div className="text-center">
            <button
              onClick={() => navigate(`/quiz/results?topic=${session.topic}`)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-foreground text-sm font-medium hover:bg-muted/50 transition-all duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              {t("quizReview.backToResults")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
