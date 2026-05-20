import { useEffect, useState, useCallback } from "react";
import { useParams, Link } from "react-router";
import { ArrowLeft, Loader2, CheckCircle2, Clock, User, GraduationCap, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { getQuizBySlug, submitStudentAttempt, checkExistingAttempt } from "../../quiz/services/quiz.service";
import { QuestionCard } from "../../../components/quiz/QuestionCard";
import { QuizMusic } from "../../../components/quiz/QuizMusic";

type Phase = "identity" | "quiz" | "result";

export function StudentQuiz() {
  const { slug } = useParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [phase, setPhase] = useState<Phase>("identity");
  const [studentName, setStudentName] = useState("");
  const [studentNumber, setStudentNumber] = useState("");
  const [studentClass, setStudentClass] = useState("");

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [startTime] = useState(Date.now());
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [checkError, setCheckError] = useState("");
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    if (!slug) return;
    getQuizBySlug(slug).then((d) => {
      if (d) setData(d);
      else setError("Quiz tidak ditemukan");
      setLoading(false);
    });
  }, [slug]);

  const questions = data?.questions ?? [];
  const quiz = data?.quiz;
  const currentQuestion = questions[currentIndex] ?? null;
  const answeredCount = Object.keys(answers).length;

  const answerQuestion = useCallback(
    (optionIndex: number) => {
      if (!currentQuestion) return;
      setAnswers((prev) => ({ ...prev, [currentQuestion.id]: optionIndex }));
    },
    [currentQuestion]
  );

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const exists = await checkExistingAttempt(quiz.id, studentName, studentNumber, studentClass);
      if (exists) {
        setCheckError("Data sudah ada. Kamu sudah mengerjakan quiz ini sebelumnya.");
        setSubmitting(false);
        return;
      }
    } catch {
      setSubmitting(false);
      return;
    }

    let correct = 0;
    const answerData = questions.map((q: any) => {
      const selected = answers[q.id] ?? -1;
      const isCorrect = selected === q.correctIndex;
      if (isCorrect) correct++;
      return { question_id: q.id, selected_index: selected, is_correct: isCorrect };
    });

    try {
      const session = await submitStudentAttempt({
        quiz_id: quiz.id,
        student_name: studentName,
        student_number: studentNumber,
        student_class: studentClass,
        score: correct,
        total_questions: questions.length,
        time_spent: Math.floor((Date.now() - startTime) / 1000),
        answers: answerData,
      });
      setResult({ session, score: correct, total: questions.length, answers: answerData, questions });
      setPhase("result");
    } catch {
      setError("Gagal menyimpan hasil");
    }
    setSubmitting(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">{error || "Quiz tidak ditemukan"}</p>
          <Link to="/" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium">
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    );
  }

  const percentage = result ? Math.round((result.score / result.total) * 100) : 0;

  // Identity Phase
  if (phase === "identity") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="bg-card border border-border rounded-2xl p-8 shadow-sm relative">
            <Link
              to="/"
              className="absolute top-4 left-4 flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Beranda
            </Link>
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 mb-4">
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-xl font-bold text-foreground">{quiz.title}</h1>
              {quiz.description && (
                <p className="text-sm text-muted-foreground mt-1">{quiz.description}</p>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  <User className="w-4 h-4 inline mr-1" />Nama Lengkap
                </label>
                <input
                  value={studentName}
                  onChange={(e) => { setStudentName(e.target.value); setCheckError(""); }}
                  placeholder="Masukkan nama Anda"
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">No. Absen</label>
                  <input
                    value={studentNumber}
                    onChange={(e) => { setStudentNumber(e.target.value); setCheckError(""); }}
                    placeholder="Nomor"
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">Kelas</label>
                  <input
                    value={studentClass}
                    onChange={(e) => { setStudentClass(e.target.value); setCheckError(""); }}
                    placeholder="Kelas"
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>
              </div>

              {checkError && (
                <div className="flex items-start gap-2 p-3 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/30">
                  <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-red-600 dark:text-red-400">{checkError}</p>
                </div>
              )}

              <button
                onClick={async () => {
                  if (!studentName.trim()) return;
                  setCheckError("");
                  setChecking(true);
                  try {
                    const exists = await checkExistingAttempt(quiz.id, studentName, studentNumber, studentClass);
                    if (exists) {
                      setCheckError("Data sudah ada. Kamu sudah mengerjakan quiz ini sebelumnya.");
                      setChecking(false);
                      return;
                    }
                  } catch {
                    setChecking(false);
                    return;
                  }
                  setMusicPlaying(true);
                  setPhase("quiz");
                  setChecking(false);
                }}
                disabled={!studentName.trim() || checking}
                className="w-full py-3 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white text-sm font-medium hover:shadow-lg disabled:opacity-40 transition-all duration-200"
              >
                {checking ? (
                  <span className="inline-flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" />Memeriksa...</span>
                ) : (
                  "Mulai Quiz"
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // Result Phase
  if (phase === "result" && result) {
    const getCategory = (pct: number) => {
      if (pct >= 85) return { label: "Sangat Baik", color: "text-emerald-600", msg: "Maa shaa Allah! Luar biasa!" };
      if (pct >= 70) return { label: "Baik", color: "text-blue-600", msg: "Alhamdulillah, hasil yang baik!" };
      if (pct >= 50) return { label: "Cukup", color: "text-amber-600", msg: "Semangat belajar lagi!" };
      return { label: "Perlu Belajar Lagi", color: "text-red-500", msg: "Jangan menyerah, terus belajar!" };
    };
    const cat = getCategory(percentage);

    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <QuizMusic playing={musicPlaying} />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <div className="bg-card border border-border rounded-2xl p-8 shadow-sm text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-28 h-28 rounded-full bg-card border-4 border-primary shadow-lg mb-4"
            >
              <span className="text-3xl font-extrabold text-primary">{percentage}%</span>
            </motion.div>

            <h3 className={`text-lg font-bold ${cat.color}`}>{cat.label}</h3>
            <p className="text-sm text-muted-foreground mt-1">{cat.msg}</p>

            <div className="flex items-center justify-center gap-6 my-6">
              <div>
                <p className="text-2xl font-bold text-emerald-600">{result.score}</p>
                <p className="text-xs text-muted-foreground">Benar</p>
              </div>
              <div className="w-px h-10 bg-border" />
              <div>
                <p className="text-2xl font-bold text-red-500">{result.total - result.score}</p>
                <p className="text-xs text-muted-foreground">Salah</p>
              </div>
            </div>

            <p className="text-xs text-muted-foreground mb-6">
              {studentName} · {studentClass}
            </p>

            <button
              onClick={() => {
                setPhase("identity");
                setMusicPlaying(false);
                setAnswers({});
                setCurrentIndex(0);
                setResult(null);
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white text-sm font-medium hover:shadow-lg transition-all duration-200"
            >
              Kerjakan Lagi
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Quiz Phase
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <QuizMusic playing={musicPlaying} />
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">{Math.floor((Date.now() - startTime) / 60000)}m</span>
            </div>
            <span className="text-sm text-muted-foreground">
              {currentIndex + 1}/{questions.length}
            </span>
            <span className="text-xs text-muted-foreground">{answeredCount} terjawab</span>
          </div>
        </div>
      </header>

      <div className="h-1 bg-muted">
        <motion.div
          className="h-full bg-gradient-to-r from-emerald-500 to-teal-500"
          initial={{ width: 0 }}
          animate={{ width: `${(answeredCount / questions.length) * 100}%` }}
        />
      </div>

      <main className="flex-1 flex flex-col">
        <div className="max-w-2xl mx-auto w-full px-4 py-6 flex-1 flex flex-col">
          <AnimatePresence mode="wait">
            {currentQuestion && (
              <QuestionCard
                key={currentQuestion.id}
                question={currentQuestion}
                selectedAnswer={answers[currentQuestion.id]}
                onAnswer={answerQuestion}
              />
            )}
          </AnimatePresence>

          <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
            <button
              onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
              disabled={currentIndex === 0}
              className="px-4 py-2.5 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 disabled:opacity-30 transition-all"
            >
              Sebelumnya
            </button>

            {currentIndex < questions.length - 1 ? (
              <button
                onClick={() => setCurrentIndex((i) => i + 1)}
                disabled={answers[currentQuestion?.id] === undefined}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white text-sm font-medium disabled:opacity-40 transition-all"
              >
                Selanjutnya
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={submitting || answeredCount < questions.length}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white text-sm font-medium disabled:opacity-40 transition-all"
              >
                {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                Selesai
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
