import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  Loader2,
  CheckCircle2,
  Sparkles,
  BookOpen,
  Droplets,
  GraduationCap,
  FileQuestion,
  Settings2,
  PlayCircle,
  AlertCircle,
} from "lucide-react";
import { motion } from "motion/react";
import { cn } from "../../../components/ui/utils";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { Badge } from "../../../components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { createQuiz, getMyQuizzes } from "../../quiz/services/quiz.service";
import { quizQuestions } from "../../../data/quiz-questions";
import type { QuizQuestion } from "../../../data/quiz-questions";
import { MultiSelect } from "../components/MultiSelect";
import { QuizSummaryCard } from "../components/QuizSummaryCard";
import { PreviewModal } from "../components/PreviewModal";

const TOPIC_OPTIONS = [
  { value: "wudhu", label: "Wudhu" },
  { value: "ghusl", label: "Mandi Wajib" },
  { value: "tayammum", label: "Tayammum" },
  { value: "najis", label: "Najis" },
];

const DIFFICULTY_OPTIONS = [
  { value: "all", label: "Acak" },
  { value: "easy", label: "Mudah" },
  { value: "medium", label: "Sedang" },
  { value: "hard", label: "Sulit" },
];

const STATS_COLORS = [
  "bg-gradient-to-br from-emerald-500 to-teal-600",
  "bg-gradient-to-br from-emerald-500 to-teal-600",
  "bg-gradient-to-br from-emerald-500 to-teal-600",
];

function pickQuestions(
  topicKeys: string[],
  difficulty: string,
  count: number
): QuizQuestion[] {
  let pool =
    topicKeys.length > 0
      ? quizQuestions.filter((q) => topicKeys.includes(q.topic))
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
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [questionCount, setQuestionCount] = useState(10);
  const [difficulty, setDifficulty] = useState("all");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewQuestions, setPreviewQuestions] = useState<QuizQuestion[]>([]);
  const [quizCount, setQuizCount] = useState(0);
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    getMyQuizzes()
      .then((quizzes) => setQuizCount(quizzes.length))
      .catch(() => {})
      .finally(() => setStatsLoading(false));
  }, []);

  const topicCount = useMemo(
    () => new Set(quizQuestions.map((q) => q.topic)).size,
    []
  );
  const totalBankSoal = useMemo(() => quizQuestions.length, []);

  const availableCount = useMemo(() => {
    let pool =
      selectedTopics.length > 0
        ? quizQuestions.filter((q) => selectedTopics.includes(q.topic))
        : [...quizQuestions];
    if (difficulty !== "all") {
      pool = pool.filter((q) => q.difficulty === difficulty);
    }
    return pool.length;
  }, [selectedTopics, difficulty]);

  const handleSubmit = async (questions?: QuizQuestion[]) => {
    setError("");
    setSuccess("");

    if (!title.trim()) {
      setError("Judul quiz wajib diisi");
      return;
    }
    if (selectedTopics.length === 0) {
      setError("Pilih minimal satu materi");
      return;
    }
    if (availableCount === 0) {
      setError("Tidak ada soal untuk materi dan level ini");
      return;
    }
    if (questionCount < 1) {
      setError("Jumlah soal minimal 1");
      return;
    }

    const selected = questions || pickQuestions(selectedTopics, difficulty, questionCount);
    if (selected.length === 0) {
      setError("Tidak cukup soal. Kurangi jumlah atau pilih level lain");
      return;
    }

    setSaving(true);
    try {
      const quiz = await createQuiz({
        title: title.trim(),
        topic: selectedTopics
          .map(
            (t) =>
              TOPIC_OPTIONS.find((o) => o.value === t)?.label || t
          )
          .join(", "),
        category: category.trim(),
        description: description.trim(),
        time_limit: 0,
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

  const handlePreview = () => {
    if (!title.trim()) {
      setError("Judul quiz wajib diisi");
      return;
    }
    if (selectedTopics.length === 0) {
      setError("Pilih minimal satu materi");
      return;
    }
    if (availableCount === 0) {
      setError("Tidak ada soal untuk materi dan level ini");
      return;
    }
    if (questionCount < 1) {
      setError("Jumlah soal minimal 1");
      return;
    }

    const selected = pickQuestions(selectedTopics, difficulty, questionCount);
    if (selected.length === 0) {
      setError("Tidak cukup soal. Kurangi jumlah atau pilih level lain");
      return;
    }

    setPreviewQuestions(selected);
    setError("");
    setPreviewOpen(true);
  };

  const statCards = [
    {
      title: "Total Materi",
      value: statsLoading ? "-" : topicCount,
      icon: BookOpen,
      gradient: STATS_COLORS[0],
    },
    {
      title: "Total Bank Soal",
      value: statsLoading ? "-" : totalBankSoal,
      icon: FileQuestion,
      gradient: STATS_COLORS[1],
    },
    {
      title: "Quiz Dibuat",
      value: statsLoading ? "-" : quizCount,
      icon: GraduationCap,
      gradient: STATS_COLORS[2],
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent border border-emerald-100/50 dark:border-emerald-900/20 p-8 sm:p-10 mb-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-500/5 rounded-full translate-y-1/2 -translate-x-1/4 blur-3xl" />
        <div className="relative flex items-start gap-5">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/20">
            <Droplets className="w-7 h-7 text-white" />
          </div>
          <div className="space-y-1.5">
            <h1 className="text-3xl sm:text-4xl font-bold font-heading text-foreground tracking-tight">
              Buat Quiz Baru
            </h1>
            <p className="text-base text-muted-foreground max-w-xl">
              Generate soal otomatis dari bank soal sesuai materi dan tingkat
              kesulitan.
            </p>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {statCards.map((stat, i) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            className={cn(
              "relative overflow-hidden rounded-2xl p-5 text-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300",
              stat.gradient
            )}
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3" />
            <div className="relative">
              <div className="flex items-center justify-between mb-3">
                <stat.icon className="w-5 h-5 text-white/70" />
              </div>
              <p className="text-2xl sm:text-3xl font-bold tabular-nums">
                {stat.value}
              </p>
              <p className="text-xs sm:text-sm text-white/80 mt-1">
                {stat.title}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column — Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Step 01 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.05)] space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-emerald-700 dark:text-emerald-300">
                    01
                  </span>
                </div>
                <div>
                  <h2 className="text-base font-semibold text-foreground font-heading">
                    Informasi Quiz
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Masukkan detail dasar quiz
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Judul Quiz
                  </label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="contoh: Quiz Wudhu Kelas 7A"
                    className={cn(
                      "h-[52px] rounded-[14px] border-slate-200 bg-input-background px-4 text-sm transition-all duration-200",
                      "focus-visible:border-emerald-500 focus-visible:ring-4 focus-visible:ring-emerald-500/15"
                    )}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Materi
                  </label>
                  <MultiSelect
                    options={TOPIC_OPTIONS}
                    selected={selectedTopics}
                    onChange={setSelectedTopics}
                    placeholder="Pilih materi quiz"
                    searchPlaceholder="Cari materi..."
                    emptyText="Tidak ada materi."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Kelas
                  </label>
                  <Input
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="contoh: 7A, 7B, IPA 1, ..."
                    className={cn(
                      "h-[52px] rounded-[14px] border-slate-200 bg-input-background px-4 text-sm transition-all duration-200",
                      "focus-visible:border-emerald-500 focus-visible:ring-4 focus-visible:ring-emerald-500/15"
                    )}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Deskripsi
                  </label>
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Deskripsi quiz (opsional)"
                    rows={3}
                    className={cn(
                      "rounded-[14px] border-slate-200 bg-input-background px-4 py-3 text-sm transition-all duration-200 resize-none",
                      "focus-visible:border-emerald-500 focus-visible:ring-4 focus-visible:ring-emerald-500/15"
                    )}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Step 02 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.05)] space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-emerald-700 dark:text-emerald-300">
                    02
                  </span>
                </div>
                <div>
                  <h2 className="text-base font-semibold text-foreground font-heading">
                    Pengaturan Soal
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Atur jumlah dan tingkat kesulitan soal
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Jumlah Soal
                  </label>
                  <Input
                    type="number"
                    value={questionCount}
                    onChange={(e) =>
                      setQuestionCount(Math.max(1, Number(e.target.value)))
                    }
                    min={1}
                    max={50}
                    className={cn(
                      "h-[52px] rounded-[14px] border-slate-200 bg-input-background px-4 text-sm transition-all duration-200",
                      "focus-visible:border-emerald-500 focus-visible:ring-4 focus-visible:ring-emerald-500/15"
                    )}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Level Kesulitan
                  </label>
                  <Select
                    value={difficulty}
                    onValueChange={setDifficulty}
                  >
                    <SelectTrigger
                      className={cn(
                        "h-[52px] rounded-[14px] border-slate-200 bg-input-background px-4 text-sm transition-all duration-200",
                        "focus-visible:border-emerald-500 focus-visible:ring-4 focus-visible:ring-emerald-500/15"
                      )}
                    >
                      <SelectValue placeholder="Pilih level" />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl border shadow-lg">
                      {DIFFICULTY_OPTIONS.map((opt) => (
                        <SelectItem
                          key={opt.value}
                          value={opt.value}
                          className="py-3 px-3 text-sm cursor-pointer rounded-lg focus:bg-emerald-50 focus:text-emerald-700"
                        >
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Availability Info */}
              {selectedTopics.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "p-4 rounded-xl border text-sm transition-colors",
                    availableCount > 0
                      ? "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300"
                      : "bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        "w-2 h-2 rounded-full",
                        availableCount > 0 ? "bg-emerald-500" : "bg-amber-500"
                      )}
                    />
                    <p>
                      Tersedia{" "}
                      <strong className="tabular-nums">{availableCount}</strong>{" "}
                      soal
                      {difficulty !== "all" &&
                        ` (level ${DIFFICULTY_OPTIONS.find((o) => o.value === difficulty)?.label})`}
                      {availableCount > 0 && (
                        <>
                          {" — "}akan diambil{" "}
                          <strong className="tabular-nums">
                            {Math.min(questionCount, availableCount)}
                          </strong>{" "}
                          soal
                        </>
                      )}
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Step 03 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.05)] space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-emerald-700 dark:text-emerald-300">
                    03
                  </span>
                </div>
                <div>
                  <h2 className="text-base font-semibold text-foreground font-heading">
                    Generate &amp; Preview
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Preview soal sebelum di-generate
                  </p>
                </div>
              </div>

              {/* Inline Summary */}
              {(title || selectedTopics.length > 0) && (
                <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/10 border border-emerald-100 dark:border-emerald-900/20 space-y-2.5">
                  <div className="flex items-center gap-2 text-sm text-emerald-700 dark:text-emerald-300">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="font-medium">Ringkasan Quiz</span>
                  </div>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-sm">
                    {title && (
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">Judul:</span>
                        <span className="text-foreground font-medium truncate">
                          {title}
                        </span>
                      </div>
                    )}
                    {category && (
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">Kelas:</span>
                        <span className="text-foreground font-medium">
                          {category}
                        </span>
                      </div>
                    )}
                    {selectedTopics.length > 0 && (
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">Materi:</span>
                        <div className="flex flex-wrap gap-1">
                          {selectedTopics.map((t) => (
                            <Badge
                              key={t}
                              variant="secondary"
                              className="bg-emerald-100 text-emerald-700 border-emerald-200 text-xs rounded-lg"
                            >
                              {TOPIC_OPTIONS.find((o) => o.value === t)
                                ?.label || t}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">Soal:</span>
                      <span className="text-foreground font-medium tabular-nums">
                        {questionCount}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">Level:</span>
                      <span className="text-foreground font-medium">
                        {DIFFICULTY_OPTIONS.find((o) => o.value === difficulty)
                          ?.label || "-"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">Tersedia:</span>
                      <span className="text-emerald-600 font-medium tabular-nums">
                        {availableCount}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Error */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-2.5 p-4 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800"
                >
                  <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                  <p className="text-sm text-red-600 dark:text-red-400">
                    {error}
                  </p>
                </motion.div>
              )}

              {/* Success */}
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-2.5 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <p className="text-sm text-emerald-600 dark:text-emerald-400">
                    {success}
                  </p>
                </motion.div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Button
                  onClick={() => handleSubmit()}
                  disabled={saving}
                  className={cn(
                    "flex-1 h-[52px] rounded-[14px] bg-gradient-to-br from-emerald-500 to-teal-600 text-white text-sm font-medium",
                    "hover:shadow-lg hover:shadow-emerald-500/20 hover:-translate-y-0.5 transition-all duration-200",
                    "disabled:opacity-40 disabled:hover:shadow-none disabled:hover:translate-y-0"
                  )}
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Menyimpan...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      Generate Quiz
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={handlePreview}
                  disabled={saving}
                  className={cn(
                    "h-[52px] rounded-[14px] border-emerald-200 text-emerald-700 bg-white text-sm font-medium",
                    "hover:bg-emerald-50 hover:border-emerald-300 hover:-translate-y-0.5 transition-all duration-200",
                    "disabled:opacity-40 disabled:hover:shadow-none disabled:hover:translate-y-0"
                  )}
                >
                  <PlayCircle className="w-4 h-4" />
                  Preview Soal
                </Button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column — Summary */}
        <div className="hidden lg:block">
          <QuizSummaryCard
            title={title}
            kelas={category}
            topics={selectedTopics}
            questionCount={questionCount}
            difficulty={difficulty}
            availableCount={availableCount}
          />
        </div>
      </div>

      {/* Preview Modal */}
      <PreviewModal
        open={previewOpen}
        onOpenChange={setPreviewOpen}
        questions={previewQuestions}
        onGenerate={() => {
          setPreviewOpen(false);
          handleSubmit(previewQuestions);
        }}
        loading={saving}
      />
    </div>
  );
}
