import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { ArrowLeft, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { getAttemptDetail } from "../../quiz/services/quiz.service";

export function StudentDetail() {
  const { id } = useParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    getAttemptDetail(id).then((d) => {
      setData(d);
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

  if (!data) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">Data tidak ditemukan</p>
        <Link to="/dashboard/results" className="text-primary text-sm">Kembali</Link>
      </div>
    );
  }

  const { session, answers } = data;

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
    </div>
  );
}
