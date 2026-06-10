import { useState, useMemo } from "react";
import { toast } from "sonner";
import {
  Loader2,
  CheckCircle2,
  Sparkles,
  PlayCircle,
  AlertCircle,
} from "lucide-react";
import { motion } from "motion/react";
import { cn } from "../../../../components/ui/utils";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Textarea } from "../../../../components/ui/textarea";
import { Badge } from "../../../../components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../../../../components/ui/dialog";
import { ScrollArea } from "../../../../components/ui/scroll-area";
import { createQuiz } from "../../../quiz/services/quiz.service";
import { quizQuestions } from "../../../../data/quiz-questions";
import type { QuizQuestion } from "../../../../data/quiz-questions";
import { MultiSelect } from "../MultiSelect";
import { PreviewModal } from "../PreviewModal";

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

interface CreateQuizModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function CreateQuizModal({ open, onOpenChange, onSuccess }: CreateQuizModalProps) {
  const [title, setTitle] = useState("");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [questionCount, setQuestionCount] = useState(10);
  const [difficulty, setDifficulty] = useState("all");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewQuestions, setPreviewQuestions] = useState<QuizQuestion[]>([]);

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

  const resetForm = () => {
    setTitle("");
    setSelectedTopics([]);
    setCategory("");
    setDescription("");
    setQuestionCount(10);
    setDifficulty("all");
    setError("");
    setPreviewQuestions([]);
  };

  const handleSubmit = async (questions?: QuizQuestion[]) => {
    setError("");

    if (!title.trim()) { setError("Judul quiz wajib diisi"); return; }
    if (selectedTopics.length === 0) { setError("Pilih minimal satu materi"); return; }
    if (availableCount === 0) { setError("Tidak ada soal untuk materi dan level ini"); return; }
    if (questionCount < 1) { setError("Jumlah soal minimal 1"); return; }

    const selected = questions || pickQuestions(selectedTopics, difficulty, questionCount);
    if (selected.length === 0) {
      setError("Tidak cukup soal. Kurangi jumlah atau pilih level lain");
      return;
    }

    setSaving(true);
    try {
      await createQuiz({
        title: title.trim(),
        topic: selectedTopics
          .map((t) => TOPIC_OPTIONS.find((o) => o.value === t)?.label || t)
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
      toast.success(`Quiz berhasil dibuat! (${selected.length} soal)`);
      resetForm();
      onSuccess();
    } catch (err: any) {
      toast.error(err.message || "Gagal menyimpan quiz");
    } finally {
      setSaving(false);
    }
  };

  const handlePreview = () => {
    setError("");

    if (!title.trim()) { setError("Judul quiz wajib diisi"); return; }
    if (selectedTopics.length === 0) { setError("Pilih minimal satu materi"); return; }
    if (availableCount === 0) { setError("Tidak ada soal untuk materi dan level ini"); return; }
    if (questionCount < 1) { setError("Jumlah soal minimal 1"); return; }

    const selected = pickQuestions(selectedTopics, difficulty, questionCount);
    if (selected.length === 0) {
      setError("Tidak cukup soal. Kurangi jumlah atau pilih level lain");
      return;
    }

    setPreviewQuestions(selected);
    setPreviewOpen(true);
  };

  const handleClose = () => {
    if (saving) return;
    resetForm();
    onOpenChange(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="max-w-2xl max-h-[90vh] p-0 rounded-3xl gap-0 overflow-hidden">
          <DialogHeader className="p-6 pb-4 border-b border-border">
            <DialogTitle className="text-lg font-semibold font-heading">
              Buat Quiz Baru
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Generate soal otomatis dari bank soal sesuai materi dan tingkat kesulitan.
            </DialogDescription>
          </DialogHeader>

          <ScrollArea className="flex-1 px-6 py-4 max-h-[65vh]">
            <div className="space-y-6">
              {/* Step 01 — Informasi Quiz */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300">01</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground font-heading">Informasi Quiz</h3>
                    <p className="text-xs text-muted-foreground">Masukkan detail dasar quiz</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Judul Quiz</label>
                    <Input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="contoh: Quiz Wudhu Kelas 7A"
                      className="h-[48px] rounded-[14px] border-slate-200 bg-input-background px-4 text-sm focus-visible:border-emerald-500 focus-visible:ring-4 focus-visible:ring-emerald-500/15"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Materi</label>
                    <MultiSelect
                      options={TOPIC_OPTIONS}
                      selected={selectedTopics}
                      onChange={setSelectedTopics}
                      placeholder="Pilih materi quiz"
                      searchPlaceholder="Cari materi..."
                      emptyText="Tidak ada materi."
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">Kelas</label>
                      <Input
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        placeholder="contoh: 7A, IPA 1"
                        className="h-[48px] rounded-[14px] border-slate-200 bg-input-background px-4 text-sm focus-visible:border-emerald-500 focus-visible:ring-4 focus-visible:ring-emerald-500/15"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">Deskripsi</label>
                      <Textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Deskripsi quiz (opsional)"
                        rows={2}
                        className="rounded-[14px] border-slate-200 bg-input-background px-4 py-3 text-sm resize-none focus-visible:border-emerald-500 focus-visible:ring-4 focus-visible:ring-emerald-500/15"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 02 — Pengaturan Soal */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300">02</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground font-heading">Pengaturan Soal</h3>
                    <p className="text-xs text-muted-foreground">Atur jumlah dan tingkat kesulitan soal</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Jumlah Soal</label>
                    <Input
                      type="number"
                      value={questionCount}
                      onChange={(e) => setQuestionCount(Math.max(1, Number(e.target.value)))}
                      min={1}
                      max={50}
                      className="h-[48px] rounded-[14px] border-slate-200 bg-input-background px-4 text-sm focus-visible:border-emerald-500 focus-visible:ring-4 focus-visible:ring-emerald-500/15"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Level Kesulitan</label>
                    <Select value={difficulty} onValueChange={setDifficulty}>
                      <SelectTrigger className="h-[48px] rounded-[14px] border-slate-200 bg-input-background px-4 text-sm focus-visible:border-emerald-500 focus-visible:ring-4 focus-visible:ring-emerald-500/15">
                        <SelectValue placeholder="Pilih level" />
                      </SelectTrigger>
                      <SelectContent className="rounded-2xl border shadow-lg">
                        {DIFFICULTY_OPTIONS.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value} className="py-3 px-3 text-sm cursor-pointer rounded-lg focus:bg-emerald-50 focus:text-emerald-700">
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {selectedTopics.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      "p-3 rounded-xl border text-sm transition-colors",
                      availableCount > 0
                        ? "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300"
                        : "bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <div className={cn("w-2 h-2 rounded-full", availableCount > 0 ? "bg-emerald-500" : "bg-amber-500")} />
                      <p>
                        Tersedia <strong className="tabular-nums">{availableCount}</strong> soal
                        {difficulty !== "all" && ` (level ${DIFFICULTY_OPTIONS.find((o) => o.value === difficulty)?.label})`}
                        {availableCount > 0 && (
                          <> — akan diambil <strong className="tabular-nums">{Math.min(questionCount, availableCount)}</strong> soal</>
                        )}
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Step 03 — Generate & Preview */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300">03</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground font-heading">Generate &amp; Preview</h3>
                    <p className="text-xs text-muted-foreground">Preview soal sebelum di-generate</p>
                  </div>
                </div>

                {(title || selectedTopics.length > 0) && (
                  <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/10 border border-emerald-100 dark:border-emerald-900/20 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-emerald-700 dark:text-emerald-300">
                      <CheckCircle2 className="w-4 h-4" />
                      <span className="font-medium">Ringkasan Quiz</span>
                    </div>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-sm">
                      {title && (
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">Judul:</span>
                          <span className="text-foreground font-medium truncate">{title}</span>
                        </div>
                      )}
                      {category && (
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">Kelas:</span>
                          <span className="text-foreground font-medium">{category}</span>
                        </div>
                      )}
                      {selectedTopics.length > 0 && (
                        <div className="flex items-center gap-2 col-span-2">
                          <span className="text-muted-foreground shrink-0">Materi:</span>
                          <div className="flex flex-wrap gap-1">
                            {selectedTopics.map((t) => (
                              <Badge key={t} variant="secondary" className="bg-emerald-100 text-emerald-700 border-emerald-200 text-xs rounded-lg">
                                {TOPIC_OPTIONS.find((o) => o.value === t)?.label || t}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">Soal:</span>
                        <span className="text-foreground font-medium tabular-nums">{questionCount}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">Level:</span>
                        <span className="text-foreground font-medium">{DIFFICULTY_OPTIONS.find((o) => o.value === difficulty)?.label || "-"}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Error */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800"
                  >
                    <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                    <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                  </motion.div>
                )}
              </div>
            </div>
          </ScrollArea>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 p-6 pt-4 border-t border-border">
            <Button
              variant="outline"
              onClick={handlePreview}
              disabled={saving}
              className="h-[48px] rounded-[14px] border-emerald-200 text-emerald-700 bg-white text-sm font-medium hover:bg-emerald-50 hover:border-emerald-300 transition-all"
            >
              <PlayCircle className="w-4 h-4" />
              Preview Soal
            </Button>
            <Button
              onClick={() => handleSubmit()}
              disabled={saving}
              className="h-[48px] rounded-[14px] bg-gradient-to-br from-emerald-500 to-teal-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-emerald-500/20 transition-all"
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
          </div>
        </DialogContent>
      </Dialog>

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
    </>
  );
}
