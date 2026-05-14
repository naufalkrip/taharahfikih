import { Clock, RotateCcw, BarChart3 } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "../ui/utils";
import type { QuizHistoryItem } from "../../hooks/useQuizHistory";

interface QuizHistoryProps {
  history: QuizHistoryItem[];
  onRetry: (topic: string) => void;
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s}s`;
}

function getPercentageColor(pct: number) {
  if (pct >= 85) return "text-emerald-600 dark:text-emerald-400";
  if (pct >= 70) return "text-blue-600 dark:text-blue-400";
  if (pct >= 50) return "text-amber-600 dark:text-amber-400";
  return "text-red-500";
}

export function QuizHistory({ history, onRetry }: QuizHistoryProps) {
  if (history.length === 0) {
    return (
      <div className="bg-card border border-border rounded-2xl p-8 text-center">
        <BarChart3 className="w-10 h-10 text-muted-foreground mx-auto mb-3 opacity-50" />
        <p className="text-sm font-medium text-foreground mb-1">Belum Ada Riwayat Quiz</p>
        <p className="text-xs text-muted-foreground">Selesaikan quiz untuk melihat hasilnya di sini</p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-5">
        <BarChart3 className="w-4 h-4 text-primary" />
        <h4 className="text-sm font-semibold text-foreground">Riwayat Quiz</h4>
      </div>

      <div className="space-y-3">
        {history.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}
            className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors border border-border/50"
          >
            {/* Score Circle */}
            <div
              className={cn(
                "flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center text-sm font-bold border-2",
                item.percentage >= 85
                  ? "border-emerald-500 text-emerald-600 dark:text-emerald-400"
                  : item.percentage >= 70
                  ? "border-blue-500 text-blue-600 dark:text-blue-400"
                  : item.percentage >= 50
                  ? "border-amber-500 text-amber-600 dark:text-amber-400"
                  : "border-red-500 text-red-500"
              )}
            >
              {item.percentage}%
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">
                {item.topicTitle}
              </p>
              <p className="text-xs text-muted-foreground">
                {item.score}/{item.total} benar
              </p>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                <Clock className="w-3 h-3" />
                {formatDate(item.date)} · {formatTime(item.timeSpent)}
              </p>
            </div>

            <button
              onClick={() => onRetry(item.topic)}
              className="flex-shrink-0 p-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all duration-200"
              title="Ulangi Quiz"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
