import { useEffect, useState } from "react";
import { Loader2, Copy, Check } from "lucide-react";
import { getMyQuizzes } from "../../quiz/services/quiz.service";
import type { Quiz } from "../../quiz/services/quiz.service";

export function ShareResults() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    getMyQuizzes().then((d) => { setQuizzes(d); setLoading(false); });
  }, []);

  const copyLink = (slug: string) => {
    const link = `${window.location.origin}/s/${slug}`;
    navigator.clipboard.writeText(link);
    setCopied(slug);
    setTimeout(() => setCopied(null), 2000);
  };

  const shareWA = (slug: string) => {
    const link = `${window.location.origin}/s/${slug}`;
    const text = `Quiz THAVA\nKerjakan quiz berikut:\n${link}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  if (loading) {
    return <div className="flex items-center justify-center h-40"><Loader2 className="w-6 h-6 animate-spin text-muted-foreground" /></div>;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-foreground">Share Hasil</h1>
        <p className="text-sm text-muted-foreground mt-1">Bagikan quiz ke murid</p>
      </div>

      {quizzes.length === 0 ? (
        <div className="bg-card border border-border rounded-2xl p-10 text-center">
          <p className="text-muted-foreground text-sm">Belum ada quiz</p>
        </div>
      ) : (
        <div className="space-y-3">
          {quizzes.map((q) => (
            <div key={q.id} className="bg-card border border-border rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{q.title}</h3>
                  <p className="text-xs text-muted-foreground">{q.topic}</p>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                  q.is_active ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                }`}>
                  {q.is_active ? "Aktif" : "Nonaktif"}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => shareWA(q.slug)}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-green-500 text-white text-sm font-medium hover:bg-green-600 transition-colors"
                >
                  Share WA
                </button>
                <button
                  onClick={() => copyLink(q.slug)}
                  className="flex items-center justify-center gap-1 px-4 py-2.5 rounded-xl border border-border text-foreground text-sm font-medium hover:bg-muted/50 transition-colors"
                >
                  {copied === q.slug ? (
                    <><Check className="w-4 h-4 text-emerald-500" /> Tersalin</>
                  ) : (
                    <><Copy className="w-4 h-4" /> Salin Link</>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
