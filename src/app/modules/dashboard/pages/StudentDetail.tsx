import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { ArrowLeft, CheckCircle2, XCircle, Loader2, FileDown, Share2, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { getAttemptDetail } from "../../quiz/services/quiz.service";
import { generateQuizPDF } from "../../../utils/generateQuizPDF";

export function StudentDetail() {
  const { id } = useParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showActions, setShowActions] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getAttemptDetail(id).then((d) => {
      setData(d);
      setLoading(false);
    }).catch(() => {
      setError("Gagal memuat data");
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">{error}</p>
        <Link to="/dashboard/results" className="text-primary text-sm">Kembali</Link>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">Data tidak ditemukan</p>
        <Link to="/dashboard/results" className="text-primary text-sm">Kembali</Link>
      </div>
    );
  }

  const { attempt: session, answers } = data;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Link
        to="/dashboard/results"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="w-4 h-4" />
        Kembali
      </Link>

      {/* Student Info */}
      <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-bold text-foreground mb-4">Detail Hasil Murid</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <p className="text-xs text-muted-foreground">Nama</p>
            <p className="text-sm font-semibold text-foreground">{session.student_name}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Kelas</p>
            <p className="text-sm font-semibold text-foreground">{session.student_class || "-"}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Nilai</p>
            <p className="text-sm font-bold text-emerald-600">{Math.round(Number(session.percentage))}%</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Status</p>
            <p className="text-sm font-semibold text-emerald-600">Selesai</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={() => setShowActions(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white text-sm font-medium hover:shadow-lg transition-all duration-200"
        >
          <FileDown className="w-4 h-4" />
          Download & Bagikan
        </button>
      </div>

      {/* Answers */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground">Jawaban</h3>
        {answers.map((a: any, i: number) => (
          <div
            key={a.id}
            className={`p-4 rounded-xl border ${
              a.is_correct
                ? "bg-emerald-50/50 dark:bg-emerald-950/10 border-emerald-200/50 dark:border-emerald-800/30"
                : "bg-red-50/50 dark:bg-red-950/10 border-red-200/50 dark:border-red-800/30"
            }`}
          >
            <div className="flex items-start gap-3">
              {a.is_correct ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground mb-2">
                  {i + 1}. {a.questions?.question ?? "Pertanyaan"}
                </p>
                <div className="space-y-1">
                  {(a.questions?.options ?? []).map((opt: string, oi: number) => {
                    const isSelected = a.selected_index === oi;
                    const isCorrect = a.questions?.correct_index === oi;
                    return (
                      <div
                        key={oi}
                        className={`px-3 py-1.5 rounded-lg text-xs ${
                          isCorrect
                            ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300"
                            : isSelected
                            ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300"
                            : "text-muted-foreground"
                        }`}
                      >
                        {String.fromCharCode(65 + oi)}. {opt}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Popup Modal */}
      <AnimatePresence>
        {showActions && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowActions(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="bg-card border border-border rounded-2xl shadow-xl w-full max-w-sm p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-foreground">Download & Bagikan</h3>
                <button
                  onClick={() => setShowActions(false)}
                  className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-muted-foreground mb-5">
                {session.student_name} — {Math.round(Number(session.percentage))}%
              </p>

              <div className="space-y-3">
                <button
                  onClick={() => {
                    generateQuizPDF(
                      session.student_name,
                      session.student_number,
                      session.student_class,
                      session.score,
                      session.total_questions,
                      session.percentage,
                      answers,
                    );
                    setShowActions(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-border hover:bg-muted/50 transition-all duration-200"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center flex-shrink-0">
                    <FileDown className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-foreground">Download PDF</p>
                    <p className="text-xs text-muted-foreground">Simpan hasil sebagai file PDF</p>
                  </div>
                </button>

                <button
                  onClick={() => {
                    const origin = typeof window !== "undefined" ? window.location.origin : "";
                    const text = `Detail Hasil Quiz Murid\nNama: ${session.student_name}\nKelas: ${session.student_class || "-"}\nNilai: ${Math.round(Number(session.percentage))}% (${session.score}/${session.total_questions})\n${origin}/dashboard/results/${id}`;
                    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
                    setShowActions(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border border-border hover:bg-muted/50 transition-all duration-200"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#25D366] flex items-center justify-center flex-shrink-0">
                    <Share2 className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-foreground">Share WhatsApp</p>
                    <p className="text-xs text-muted-foreground">Bagikan hasil via WhatsApp</p>
                  </div>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
