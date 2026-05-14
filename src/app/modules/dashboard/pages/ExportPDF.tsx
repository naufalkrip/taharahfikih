import { useEffect, useState } from "react";
import { Loader2, ExternalLink, Copy, Check } from "lucide-react";
import { getMyQuizzes } from "../../quiz/services/quiz.service";
import type { Quiz } from "../../quiz/services/quiz.service";

export function ExportPDF() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyQuizzes().then((d) => { setQuizzes(d); setLoading(false); });
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-40"><Loader2 className="w-6 h-6 animate-spin text-muted-foreground" /></div>;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-foreground">Export PDF</h1>
        <p className="text-sm text-muted-foreground mt-1">Export hasil quiz ke PDF</p>
      </div>

      {quizzes.length === 0 ? (
        <div className="bg-card border border-border rounded-2xl p-10 text-center">
          <p className="text-muted-foreground text-sm">Belum ada quiz</p>
        </div>
      ) : (
        <div className="space-y-3">
          {quizzes.map((q) => (
            <div key={q.id} className="bg-card border border-border rounded-2xl p-5 shadow-sm flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-foreground">{q.title}</h3>
                <p className="text-xs text-muted-foreground">{q.topic}</p>
              </div>
              <a
                href={`/dashboard/results?quiz=${q.id}`}
                className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Lihat Hasil
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
