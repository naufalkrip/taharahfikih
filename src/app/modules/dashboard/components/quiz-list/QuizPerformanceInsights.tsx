import { motion } from "motion/react";
import { Flame, BarChart3, Trophy, PieChart } from "lucide-react";

interface PerformanceData {
  populerQuiz: string;
  tingkatPengerjaan: string;
  nilaiTertinggi: string;
  rataRata: string;
}

interface QuizPerformanceInsightsProps {
  data: PerformanceData | null;
  loading: boolean;
}

const insightConfig = [
  { key: "populerQuiz", label: "Quiz Terpopuler", icon: Flame, gradient: "from-orange-500 to-red-500" },
  { key: "tingkatPengerjaan", label: "Tingkat Pengerjaan", icon: BarChart3, gradient: "from-blue-500 to-cyan-500" },
  { key: "nilaiTertinggi", label: "Nilai Tertinggi", icon: Trophy, gradient: "from-amber-500 to-yellow-500" },
  { key: "rataRata", label: "Rata-rata Nilai", icon: PieChart, gradient: "from-emerald-500 to-teal-500" },
];

export function QuizPerformanceInsights({ data, loading }: QuizPerformanceInsightsProps) {
  if (!data && !loading) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
      className="grid grid-cols-2 lg:grid-cols-4 gap-3"
    >
      {insightConfig.map((insight, i) => {
        const Icon = insight.icon;
        const value = data ? data[insight.key as keyof PerformanceData] : undefined;
        return (
          <motion.div
            key={insight.key}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 + i * 0.06 }}
            whileHover={{ y: -2 }}
            className="bg-card border border-border rounded-xl p-3 sm:p-4 shadow-sm"
          >
            <div className="flex items-center gap-2.5 mb-2">
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${insight.gradient} flex items-center justify-center`}>
                <Icon className="w-4 h-4 text-white" />
              </div>
              <span className="text-xs font-medium text-muted-foreground">{insight.label}</span>
            </div>
            {loading ? (
              <div className="h-6 w-20 rounded-md bg-muted animate-pulse" />
            ) : (
              <p className="text-sm font-semibold text-foreground truncate">{value}</p>
            )}
          </motion.div>
        );
      })}
    </motion.div>
  );
}
