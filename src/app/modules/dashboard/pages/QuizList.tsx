import { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Trash2, ToggleLeft, ToggleRight, Loader2, ExternalLink, Share2, Filter } from "lucide-react";
import { getMyQuizzes, deleteQuiz, toggleQuizStatus } from "../../quiz/services/quiz.service";
import type { Quiz } from "../../quiz/services/quiz.service";
import { formatDate } from "../../../lib/utils";
import { ShareLinkModal } from "../../../components/quiz/ShareLinkModal";

export function QuizList() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [shareQuiz, setShareQuiz] = useState<{ slug: string; title: string } | null>(null);
  const [filterCategory, setFilterCategory] = useState("");
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => { load(); }, []);

  const load = async () => {
    setLoading(true);
    const data = await getMyQuizzes();
    setQuizzes(data);
    setLoading(false);
  };

  const handleDelete = async () => {
    if (!confirmDelete) return;
    setDeleting(true);
    try {
      await deleteQuiz(confirmDelete);
      setQuizzes((prev) => prev.filter((q) => q.id !== confirmDelete));
    } catch (err) {
      console.error("Gagal menghapus", err);
    }
    setDeleting(false);
    setConfirmDelete(null);
  };

  const handleToggle = async (id: string, current: boolean) => {
    await toggleQuizStatus(id, !current);
    load();
  };

  const categories = [...new Set(quizzes.map((q) => q.category).filter(Boolean))];
  const filtered = filterCategory ? quizzes.filter((q) => q.category === filterCategory) : quizzes;

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
        <h1 className="text-xl sm:text-2xl font-bold text-foreground">Daftar Soal</h1>
        <p className="text-sm text-muted-foreground mt-1">Kelola quiz yang telah Anda buat</p>
      </div>

      {/* Filter */}
      {categories.length > 0 && (
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            <option value="">Semua Kelas</option>
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="bg-card border border-border rounded-2xl p-10 text-center">
          <p className="text-muted-foreground text-sm mb-4">Belum ada quiz</p>
          <Link
            to="/dashboard/create"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white text-sm font-medium"
          >
            Buat Quiz Baru
          </Link>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Judul</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground hidden sm:table-cell">Materi</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground hidden sm:table-cell">Kelas</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground hidden md:table-cell">Dibuat</th>
                  <th className="text-center px-4 py-3 font-semibold text-foreground">Status</th>
                  <th className="text-right px-4 py-3 font-semibold text-foreground">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((q) => (
                  <tr key={q.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-3">
                      <p className="font-medium text-foreground">{q.title}</p>
                      <p className="text-xs text-muted-foreground truncate max-w-[200px]">{q.description}</p>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{q.topic}</td>
                    <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{q.category || "-"}</td>
                    <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{formatDate(q.created_at)}</td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => handleToggle(q.id, q.is_active)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                          q.is_active
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
                            : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300"
                        }`}
                      >
                        {q.is_active ? <ToggleRight className="w-3 h-3" /> : <ToggleLeft className="w-3 h-3" />}
                        {q.is_active ? "Aktif" : "Nonaktif"}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setShareQuiz({ slug: q.slug, title: q.title })}
                          className="p-2 rounded-lg text-muted-foreground hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-colors"
                          title="Bagikan"
                        >
                          <Share2 className="w-4 h-4" />
                        </button>
                        <a
                          href={`/s/${q.slug}`}
                          target="_blank"
                          className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                          title="Lihat"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                        <button
                          onClick={() => setConfirmDelete(q.id)}
                          className="p-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                          title="Hapus"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {shareQuiz && (
        <ShareLinkModal
          open={!!shareQuiz}
          onClose={() => setShareQuiz(null)}
          title={shareQuiz.title}
          url={`${window.location.origin}/s/${shareQuiz.slug}`}
        />
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
              <h3 className="text-sm font-semibold text-foreground mb-2">Hapus Quiz</h3>
              <p className="text-xs text-muted-foreground mb-5">
                Apakah kamu yakin ingin menghapus quiz ini? Semua data murid yang terkait juga akan ikut terhapus.
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
