import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Eye, Trash2, ToggleLeft, ToggleRight, Loader2, ExternalLink, Share2 } from "lucide-react";
import { getMyQuizzes, deleteQuiz, toggleQuizStatus } from "../../quiz/services/quiz.service";
import type { Quiz } from "../../quiz/services/quiz.service";
import { formatDate } from "../../../lib/utils";
import { ShareLinkModal } from "../../../components/quiz/ShareLinkModal";

export function QuizList() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [shareQuiz, setShareQuiz] = useState<{ slug: string; title: string } | null>(null);

  useEffect(() => { load(); }, []);

  const load = async () => {
    setLoading(true);
    const data = await getMyQuizzes();
    setQuizzes(data);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus quiz ini?")) return;
    await deleteQuiz(id);
    load();
  };

  const handleToggle = async (id: string, current: boolean) => {
    await toggleQuizStatus(id, !current);
    load();
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
        <h1 className="text-xl sm:text-2xl font-bold text-foreground">Daftar Soal</h1>
        <p className="text-sm text-muted-foreground mt-1">Kelola quiz yang telah Anda buat</p>
      </div>

      {quizzes.length === 0 ? (
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
                  <th className="text-left px-4 py-3 font-semibold text-foreground hidden md:table-cell">Dibuat</th>
                  <th className="text-center px-4 py-3 font-semibold text-foreground">Status</th>
                  <th className="text-right px-4 py-3 font-semibold text-foreground">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {quizzes.map((q) => (
                  <tr key={q.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-3">
                      <p className="font-medium text-foreground">{q.title}</p>
                      <p className="text-xs text-muted-foreground truncate max-w-[200px]">{q.description}</p>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{q.topic}</td>
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
                          onClick={() => handleDelete(q.id)}
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
    </div>
  );
}
