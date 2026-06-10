import { motion } from "motion/react";
import { Badge } from "../../../components/ui/badge";

interface QuizSummaryCardProps {
  title: string;
  kelas: string;
  topics: string[];
  questionCount: number;
  difficulty: string;
  availableCount: number;
}

const TOPIC_LABELS: Record<string, string> = {
  wudhu: "Wudhu",
  ghusl: "Mandi Wajib",
  tayammum: "Tayammum",
  najis: "Najis",
};

const DIFFICULTY_LABELS: Record<string, string> = {
  easy: "Mudah",
  medium: "Sedang",
  hard: "Sulit",
  all: "Acak",
};

export function QuizSummaryCard({
  title,
  kelas,
  topics,
  questionCount,
  difficulty,
  availableCount,
}: QuizSummaryCardProps) {
  const hasData = title || kelas || topics.length > 0 || questionCount > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className="sticky top-24"
    >
      <div className="bg-card border border-border rounded-3xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-1 h-7 bg-emerald-500 rounded-full" />
          <h3 className="text-sm font-semibold text-foreground font-heading">
            Ringkasan Quiz
          </h3>
        </div>

        {!hasData ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center mb-3">
              <svg
                className="w-6 h-6 text-emerald-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                />
              </svg>
            </div>
            <p className="text-sm text-muted-foreground">
              Isi form untuk melihat ringkasan
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {title && (
              <div>
                <p className="text-xs text-muted-foreground mb-0.5 font-medium">
                  Judul
                </p>
                <p className="text-sm font-semibold text-foreground">{title}</p>
              </div>
            )}
            {kelas && (
              <div>
                <p className="text-xs text-muted-foreground mb-0.5 font-medium">
                  Kelas
                </p>
                <p className="text-sm font-medium text-foreground">{kelas}</p>
              </div>
            )}
            {topics.length > 0 && (
              <div>
                <p className="text-xs text-muted-foreground mb-1.5 font-medium">
                  Materi Terpilih
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {topics.map((topic) => (
                    <Badge
                      key={topic}
                      variant="secondary"
                      className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs rounded-lg font-medium"
                    >
                      {TOPIC_LABELS[topic] ||
                        topic.charAt(0).toUpperCase() + topic.slice(1)}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            <div className="pt-3 border-t border-border space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Jumlah Soal</span>
                <span className="text-sm font-semibold text-foreground tabular-nums">
                  {questionCount > 0 ? questionCount : "-"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Level</span>
                <span className="text-sm font-semibold text-foreground">
                  {DIFFICULTY_LABELS[difficulty] || "-"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Soal Tersedia</span>
                <span className="text-sm font-semibold tabular-nums text-emerald-600">
                  {availableCount}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
