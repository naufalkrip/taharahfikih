import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router";
import { ArrowLeft, ArrowRight, ChevronLeft, Check, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../../contexts/LanguageContext";
import { getQuestionsByTopic, getAllQuestions, topicInfo } from "../../data/quiz-questions";
import { useQuiz } from "../../hooks/useQuiz";
import { useQuizHistory } from "../../hooks/useQuizHistory";
import { QuestionCard } from "../../components/quiz/QuestionCard";
import { ProgressBar } from "../../components/quiz/ProgressBar";
import { QuizTimer } from "../../components/quiz/QuizTimer";
import { QuizMusic } from "../../components/quiz/QuizMusic";

export function QuizPlayer() {
  const { t } = useLanguage();
  const { topic } = useParams<{ topic: string }>();
  const navigate = useNavigate();
  const { addResult } = useQuizHistory();
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  const isAll = topic === "all";
  const validTopics = ["wudhu", "ghusl", "tayammum", "najis", "all"];
  const isTopicValid = topic && validTopics.includes(topic);

  const questions = isTopicValid
    ? isAll
      ? getAllQuestions(8)
      : getQuestionsByTopic(topic)
    : [];

  const info = isTopicValid
    ? isAll
      ? { title: t("topic.all"), color: "purple" as const }
      : { ...topicInfo[topic], title: t("topic." + topic) }
    : null;

  const {
    currentQuestion,
    currentIndex,
    totalQuestions,
    answers,
    isComplete,
    timeSpent,
    answerQuestion,
    nextQuestion,
    prevQuestion,
    finishQuiz,
    getResults,
  } = useQuiz(questions);

  const hasAnswered = answers[currentQuestion?.id ?? ""] !== undefined;
  const selectedAnswer = currentQuestion ? answers[currentQuestion.id] : undefined;
  const allAnswered = Object.keys(answers).length === totalQuestions;

  useEffect(() => {
    if (isComplete && info && topic) {
      const results = getResults();
      const topicTitle = info.title;
      addResult(
        {
          topic: isAll ? "all" : topic,
          topicTitle,
          score: results.score,
          total: results.total,
          percentage: results.percentage,
          timeSpent,
        },
        { questions: results.questions, answers: results.answers }
      );
      navigate(`/quiz/results?topic=${topic}`, {
        state: {
          ...results,
          topicTitle,
          timeSpent,
        },
      });
    }
  }, [isComplete]);

  useEffect(() => {
    if (currentQuestion) {
      setMusicPlaying(true);
    }
  }, []);

  if (!isTopicValid || !info) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">{t("quizPlayer.notFound")}</p>
          <Link
            to="/quiz"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium"
          >
            {t("quizPlayer.backToQuiz")}
          </Link>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">{t("quizPlayer.noQuestions")}</p>
          <Link
            to="/quiz"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium"
          >
            {t("quizPlayer.backToQuiz")}
          </Link>
        </div>
      </div>
    );
  }

  const answeredCount = Object.keys(answers).length;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <QuizMusic playing={musicPlaying} />

      {/* Top Bar */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14 sm:h-16 gap-4">
            <button
              onClick={() => setShowExitConfirm(true)}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">{t("quizPlayer.back")}</span>
            </button>

            <div className="flex items-center gap-3 min-w-0 flex-1 justify-center">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center flex-shrink-0">
                {topic && topicInfo[topic] ? (
                  <img src={topicInfo[topic].imageSrc} alt="" className="w-5 h-5 object-contain" />
                ) : (
                  <span className="text-xs font-bold text-white">A</span>
                )}
              </div>
              <span className="text-sm font-semibold text-foreground truncate">
                {t("quizPlayer.quizLabel")} {info.title}
              </span>
            </div>

            <div className="flex items-center gap-3 flex-shrink-0">
              <QuizTimer startTime={Date.now()} isComplete={false} />
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar Thin */}
      <div className="h-1 bg-muted">
        <motion.div
          className="h-full bg-gradient-to-r from-emerald-500 to-teal-500"
          initial={{ width: 0 }}
          animate={{
            width: `${totalQuestions > 0 ? (answeredCount / totalQuestions) * 100 : 0}%`,
          }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        />
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <div className="max-w-2xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-10 flex-1 flex flex-col">
          {/* Progress Info */}
          <div className="mb-6 flex items-center gap-4">
            <div className="flex-1">
              <ProgressBar
                current={currentIndex + 1}
                total={totalQuestions}
                answeredCount={answeredCount}
              />
            </div>
            <span className="text-xs text-muted-foreground tabular-nums">
              {t("quizPlayer.answered").replace("{count}", `${answeredCount}/${totalQuestions}`)}
            </span>
          </div>

          {/* Question */}
          <div className="flex-1 flex flex-col">
            <AnimatePresence mode="wait">
              {currentQuestion && (
                <QuestionCard
                  key={currentQuestion.id}
                  question={currentQuestion}
                  selectedAnswer={selectedAnswer}
                  onAnswer={answerQuestion}
                />
              )}
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
              <button
                onClick={prevQuestion}
                disabled={currentIndex === 0}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
              >
                <ArrowLeft className="w-4 h-4" />
                {t("quizPlayer.previous")}
              </button>

              {currentIndex < totalQuestions - 1 ? (
                <button
                  onClick={nextQuestion}
                  disabled={!hasAnswered}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white text-sm font-medium hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {t("quizPlayer.next")}
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => {
                    if (allAnswered) {
                      finishQuiz();
                    } else if (hasAnswered) {
                      finishQuiz();
                    }
                  }}
                  disabled={!hasAnswered}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white text-sm font-medium hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
                >
                  <Check className="w-4 h-4" />
                  {t("quizPlayer.finish")}
                </button>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Exit Confirmation Modal */}
      <AnimatePresence>
        {showExitConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowExitConfirm(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="bg-card border border-border rounded-2xl shadow-xl w-full max-w-sm p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">
                    {t("quizPlayer.exitTitle")}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {t("quizPlayer.exitDesc")}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowExitConfirm(false)}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white text-sm font-medium hover:shadow-lg transition-all duration-200"
                >
                  {t("quizPlayer.continue")}
                </button>
                <Link
                  to="/quiz"
                  className="flex-1 px-4 py-2.5 rounded-xl border border-border text-foreground text-sm font-medium hover:bg-muted/50 transition-all duration-200 text-center"
                >
                  {t("quizPlayer.confirmExit")}
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
