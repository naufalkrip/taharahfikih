import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Loader2, Download, Users, BookOpen, Trash2 } from "lucide-react";
import { getMyQuizzes, getAllTeacherAttempts, getQuizQuestions, deleteAttempt } from "../../quiz/services/quiz.service";
import type { Quiz } from "../../quiz/services/quiz.service";
import { formatTime } from "../../../lib/utils";
import { generateQuizExportPDF } from "../../../utils/generateQuizExportPDF";

export function ExportPDF() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [attempts, setAttempts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    Promise.all([getMyQuizzes(), getAllTeacherAttempts()]).then(
      ([q, a]) => {
        setQuizzes(q);
        setAttempts(a);
        setLoading(false);
      },
    );
  }, []);

  const categories = useMemo(() => {
    const map: Record<string, Quiz[]> = {};
    for (const q of quizzes) {
      const cat = q.category || "Tanpa Kelas";
      if (!map[cat]) map[cat] = [];
      map[cat].push(q);
    }
    return map;
  }, [quizzes]);

  const attemptsByQuiz = useMemo(() => {
    const map: Record<string, any[]> = {};
    for (const a of attempts) {
      const qid = a.quiz_id;
      if (!map[qid]) map[qid] = [];
      map[qid].push(a);
    }
    return map;
  }, [attempts]);

  const getScoreColor = (pct: number) => {
    if (pct >= 85) return "text-emerald-600";
    if (pct >= 70) return "text-blue-600";
    if (pct >= 50) return "text-amber-600";
    return "text-red-500";
  };

  const avgScore = (items: any[]) => {
    const total = items.reduce((s, a) => s + Number(a.percentage), 0);
    return items.length > 0 ? Math.round(total / items.length) : 0;
  };

  const handleDelete = async () => {
    if (!confirmDelete) return;
    setDeleting(true);
    try {
      await deleteAttempt(confirmDelete);
      setAttempts((prev) => prev.filter((a) => a.id !== confirmDelete));
    } catch (err) {
      console.error("Gagal menghapus", err);
    }
    setDeleting(false);
    setConfirmDelete(null);
  };

  const sortedAttempts = (quizAttempts: any[]) => {
    return [...quizAttempts].sort(
      (a, b) => (a.student_name || "").localeCompare(b.student_name || ""),
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-foreground">Daftar Nilai</h1>
        <p className="text-sm text-muted-foreground mt-1">Rekap nilai murid per kelas dan per quiz</p>
      </div>

      {quizzes.length === 0 ? (
        <div className="bg-card border border-border rounded-2xl p-10 text-center">
          <p className="text-muted-foreground text-sm">Belum ada quiz yang dibuat</p>
        </div>
      ) : (
        Object.entries(categories).map(([category, catQuizzes]) => (
          <section key={category}>
            <h2 className="text-base font-bold text-foreground mb-3 flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              {category}
            </h2>
            <div className="space-y-3">
              {catQuizzes.map((quiz) => {
                const quizAttempts = attemptsByQuiz[quiz.id] || [];

                return (
                  <div
                    key={quiz.id}
                    className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm"
                  >
                    {/* Quiz Header */}
                    <div className="flex items-center gap-3 px-5 py-4">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center flex-shrink-0">
                        <BookOpen className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground truncate">
                          {quiz.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {quizAttempts.length} siswa · Rata-rata {avgScore(quizAttempts)}%
                          {quiz.topic && ` · ${quiz.topic}`}
                        </p>
                      </div>
                      <button
                        onClick={async () => {
                          setDownloading(quiz.id);
                          try {
                            const questions = await getQuizQuestions(quiz.id);
                            generateQuizExportPDF(
                              quiz.title,
                              quiz.topic,
                              quiz.category,
                              questions,
                              quizAttempts,
                            );
                          } catch (err) {
                            console.error("Gagal download PDF", err);
                          }
                          setDownloading(null);
                        }}
                        disabled={downloading === quiz.id}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white text-sm font-medium hover:shadow-lg disabled:opacity-40 transition-all duration-200 flex-shrink-0"
                      >
                        {downloading === quiz.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Download className="w-4 h-4" />
                        )}
                        {downloading === quiz.id ? "Mengunduh..." : "Download PDF"}
                      </button>
                    </div>

                    {/* Student Table */}
                    {quizAttempts.length === 0 ? (
                      <div className="px-5 pb-4 text-xs text-muted-foreground">
                        Belum ada siswa yang mengerjakan quiz ini
                      </div>
                    ) : (
                      <div className="overflow-x-auto px-5 pb-4">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-border">
                              <th className="text-left py-2 pr-3 font-semibold text-foreground text-xs">#</th>
                              <th className="text-left py-2 pr-3 font-semibold text-foreground text-xs">Nama</th>
                              <th className="text-left py-2 pr-3 font-semibold text-foreground text-xs hidden sm:table-cell">No</th>
                              <th className="text-left py-2 pr-3 font-semibold text-foreground text-xs hidden sm:table-cell">Kelas</th>
                              <th className="text-center py-2 pr-3 font-semibold text-foreground text-xs">Nilai</th>
                              <th className="text-left py-2 font-semibold text-foreground text-xs">Waktu</th>
                              <th className="text-right py-2 font-semibold text-foreground text-xs">Aksi</th>
                            </tr>
                          </thead>
                          <tbody>
                            {sortedAttempts(quizAttempts).map((a, i) => (
                              <tr
                                key={a.id}
                                className="border-b border-border/50 hover:bg-muted/20 transition-colors"
                              >
                                <td className="py-2.5 pr-3 text-muted-foreground text-xs">{i + 1}</td>
                                <td className="py-2.5 pr-3">
                                  <p className="font-medium text-foreground text-sm">{a.student_name}</p>
                                </td>
                                <td className="py-2.5 pr-3 text-muted-foreground text-xs hidden sm:table-cell">
                                  {a.student_number || "-"}
                                </td>
                                <td className="py-2.5 pr-3 text-muted-foreground text-xs hidden sm:table-cell">
                                  {a.student_class || "-"}
                                </td>
                                <td className="py-2.5 pr-3 text-center">
                                  <span className={`text-sm font-bold ${getScoreColor(Number(a.percentage))}`}>
                                    {Math.round(Number(a.percentage))}%
                                  </span>
                                </td>
                                <td className="py-2.5 pr-3 text-muted-foreground text-xs">
                                  {formatTime(a.time_spent)}
                                </td>
                                <td className="py-2.5 text-right">
                                  <button
                                    onClick={() => setConfirmDelete(a.id)}
                                    className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                                    title="Hapus"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        ))
      )}

      {/* Confirmation Modal */}
      <AnimatePresence>
        {confirmDelete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => !deleting && setConfirmDelete(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="bg-card border border-border rounded-2xl shadow-xl w-full max-w-sm p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-sm font-semibold text-foreground mb-2">Hapus Data Murid</h3>
              <p className="text-xs text-muted-foreground mb-5">
                Apakah kamu yakin ingin menghapus data murid ini? Tindakan ini tidak dapat dibatalkan.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setConfirmDelete(null)}
                  disabled={deleting}
                  className="px-4 py-2 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-muted/50 transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="px-4 py-2 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600 disabled:opacity-40 transition-colors inline-flex items-center gap-2"
                >
                  {deleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                  {deleting ? "Menghapus..." : "Hapus"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
