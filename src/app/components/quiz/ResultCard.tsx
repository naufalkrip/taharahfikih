import { motion } from "motion/react";
import { CheckCircle2, XCircle, Share2 } from "lucide-react";
import { cn } from "../ui/utils";

interface ResultCardProps {
  score: number;
  total: number;
  percentage: number;
  onRetry: () => void;
  onShare: () => void;
}

function getCategoryInfo(pct: number) {
  if (pct >= 85)
    return {
      label: "Sangat Baik",
      message:
        "Maa shaa Allah! Pemahaman Anda sangat baik tentang fikih taharah. Semoga ilmu ini menjadi amal jariyah.",
      emoji: "🌟",
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-950/30",
      border: "border-emerald-200 dark:border-emerald-800",
    };
  if (pct >= 70)
    return {
      label: "Baik",
      message:
        "Alhamdulillah, pemahaman Anda sudah baik. Pelajari kembali materi yang masih kurang untuk hasil sempurna.",
      emoji: "👍",
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-950/30",
      border: "border-blue-200 dark:border-blue-800",
    };
  if (pct >= 50)
    return {
      label: "Cukup",
      message:
        "Masih ada beberapa materi yang perlu dipahami kembali. Tetap semangat menuntut ilmu!",
      emoji: "💪",
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-950/30",
      border: "border-amber-200 dark:border-amber-800",
    };
  return {
    label: "Perlu Belajar Lagi",
    message:
      "Jangan menyerah! Setiap ilmu butuh proses. Mulailah dengan membaca ulang materi dari awal.",
    emoji: "📖",
    color: "text-red-600 dark:text-red-400",
    bg: "bg-red-50 dark:bg-red-950/30",
    border: "border-red-200 dark:border-red-800",
  };
}

export function ResultCard({
  score,
  total,
  percentage,
  onRetry,
  onShare,
}: ResultCardProps) {
  const category = getCategoryInfo(percentage);
  const incorrect = total - score;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm"
    >
      <div className="text-center mb-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
          className="inline-flex items-center justify-center w-28 h-28 rounded-full bg-card border-4 border-primary shadow-lg mb-4"
        >
          <span className="text-3xl sm:text-4xl font-extrabold text-primary tabular-nums">
            {percentage}%
          </span>
        </motion.div>

        <h3 className={cn("text-xl font-bold", category.color)}>
          {category.emoji} {category.label}
        </h3>
      </div>

      <div className="flex items-center justify-center gap-6 mb-6">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          <span className="text-sm text-muted-foreground">
            <strong className="text-foreground">{score}</strong> Benar
          </span>
        </div>
        <div className="flex items-center gap-2">
          <XCircle className="w-5 h-5 text-red-500" />
          <span className="text-sm text-muted-foreground">
            <strong className="text-foreground">{incorrect}</strong> Salah
          </span>
        </div>
      </div>

      <div
        className={cn("rounded-xl p-4 border mb-6 text-center", category.bg, category.border)}
      >
        <p className="text-sm leading-relaxed text-foreground">
          {category.message}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={onShare}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-medium text-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
        >
          <Share2 className="w-4 h-4" />
          Bagikan Hasil
        </button>
        <button
          onClick={onRetry}
          className="flex-1 px-6 py-3 rounded-xl border border-border text-foreground font-medium text-sm hover:bg-muted/50 transition-all duration-200"
        >
          Ulangi Quiz
        </button>
      </div>
    </motion.div>
  );
}
