import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router";
import { Loader2, CheckCircle2, Sparkles, BookOpen } from "lucide-react";
import { motion } from "motion/react";
import { createQuiz, getQuizCategories } from "../../quiz/services/quiz.service";
import { quizQuestions } from "../../../data/quiz-questions";
import type { QuizQuestion } from "../../../data/quiz-questions";

const TOPIC_MAP: Record<string, string | null> = {
  wudhu: "wudhu",
  mandi: "ghusl",
  tayammum: "tayammum",
  najis: "najis",
  semua: null,
};

const DIFFICULTY_LABELS: Record<string, string> = {
  easy: "Mudah",
  medium: "Sedang",
  hard: "Sulit",
  all: "Acak",
};

function pickQuestions(
  topicKey: string | null,
  difficulty: string,
  count: number
): QuizQuestion[] {
  let pool = topicKey
    ? quizQuestions.filter((q) => q.topic === topicKey)
    : [...quizQuestions];

  if (difficulty !== "all") {
    pool = pool.filter((q) => q.difficulty === difficulty);
  }

  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

export function CreateQuiz() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [timeLimit, setTimeLimit] = useState(0);
  const [questionCount, setQuestionCount] = useState(10);
  const [difficulty, setDifficulty] = useState("all");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    getQuizCategories().then(setCategories);
  }, []);

  const topicLower = topic.trim().toLowerCase();
  const topicMatch =
    topicLower in TOPIC_MAP
      ? topicLower
      : topicLower.startsWith("semua")
        ? "semua"
        : null;
  const topicKey = topicMatch ? TOPIC_MAP[topicMatch] : undefined;

  const availableCount = useMemo(() => {
    let pool = topicKey
      ? quizQuestions.filter((q) => q.topic === topicKey)
      : [...quizQuestions];
    if (difficulty !== "all") {
      pool = pool.filter((q) => q.difficulty === difficulty);
    }
    return pool.length;
  }, [topicKey, difficulty]);

  const topicSuggestions = Object.keys(TOPIC_MAP);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!title.trim()) { setError("Judul quiz wajib diisi"); return; }
    if (topicKey === undefined) { setError("Materi tidak dikenal. Gunakan: Wudhu, Mandi, Tayammum, Najis, atau Semua Materi"); return; }
    if (availableCount === 0) { setError("Tidak ada soal untuk materi dan level ini"); return; }
    if (questionCount < 1) { setError("Jumlah soal minimal 1"); return; }

    const selected = pickQuestions(topicKey, difficulty, questionCount);
    if (selected.length === 0) { setError("Tidak cukup soal. Kurangi jumlah atau pilih level lain"); return; }

    setSaving(true);
    try {
      const quiz = await createQuiz({
        title: title.trim(),
        topic: topic.trim(),
        category: category.trim(),
        description: description.trim(),
        time_limit: timeLimit,
        shuffle_questions: true,
        questions: selected.map((q) => ({
          question: q.question,
          options: q.options,
          correctIndex: q.correctIndex,
          difficulty: q.difficulty,
        })),
      });
      setSuccess(
        `Quiz berhasil dibuat! (${selected.length} soal) — ${window.location.origin}/s/${quiz.slug}`
      );
      setTimeout(() => navigate("/dashboard/quizzes"), 2000);
    } catch (err: any) {
      setError(err.message || "Gagal menyimpan quiz");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-foreground">Buat Quiz Baru</h1>
        <p className="text-sm text-muted-foreground mt-1">Soal akan dibuat otomatis dari bank soal</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Quiz Info */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-primary" />
            <h2 className="text-sm font-semibold text-foreground">Informasi Quiz</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-1">Judul Quiz</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="contoh: Quiz Wudhu"
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Materi</label>
              <input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Wudhu / Mandi / Tayammum / Najis"
                list="topic-suggestions"
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <datalist id="topic-suggestions">
                <option value="Semua Materi" />
                {topicSuggestions.filter((s) => s !== "semua").map((s) => (
                  <option key={s} value={s.charAt(0).toUpperCase() + s.slice(1)} />
                ))}
              </datalist>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Kelas</label>
              <input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="contoh: 7A, 7B, IPA 1, ..."
                list="category-suggestions"
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <datalist id="category-suggestions">
                {categories.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Batas Waktu (menit)</label>
              <input
                type="number"
                value={timeLimit}
                onChange={(e) => setTimeLimit(Number(e.target.value))}
                placeholder="0 = tanpa batas"
                min={0}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Deskripsi</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Deskripsi quiz (opsional)"
              rows={2}
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
            />
          </div>
        </div>

        {/* Auto Generate */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <h2 className="text-sm font-semibold text-foreground">Generate Soal Otomatis</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Jumlah Soal
              </label>
              <input
                type="number"
                value={questionCount}
                onChange={(e) => setQuestionCount(Math.max(1, Number(e.target.value)))}
                min={1}
                max={50}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Level Soal
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                {Object.entries(DIFFICULTY_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Availability Info */}
          {(topicKey !== undefined) && topic.trim() && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-xl border text-sm ${
                availableCount > 0
                  ? "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300"
                  : "bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300"
              }`}
            >
              <p>
                Tersedia <strong>{availableCount}</strong> soal untuk materi ini
                {difficulty !== "all" && ` (level ${DIFFICULTY_LABELS[difficulty]})`}
                {availableCount > 0 && (
                  <> — akan diambil <strong>{Math.min(questionCount, availableCount)}</strong> soal</>
                )}
              </p>
            </motion.div>
          )}

          {topicKey === undefined && topic.trim() && !topicLower.startsWith("semua") && (
            <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-300 text-sm">
              <p>Materi tidak dikenal. Gunakan: Wudhu, Mandi, Tayammum, Najis, atau Semua Materi</p>
            </div>
          )}
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800">
            <p className="text-xs text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        {success && (
          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <p className="text-xs text-emerald-600 dark:text-emerald-400">{success}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={saving || topicKey === undefined}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white text-sm font-medium hover:shadow-lg disabled:opacity-40 transition-all duration-200"
        >
          {saving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Buat Quiz Otomatis
            </>
          )}
        </button>
      </form>
    </div>
  );
}
