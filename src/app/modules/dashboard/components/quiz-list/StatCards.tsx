import { motion } from "motion/react";
import { BookOpen, ToggleRight, FileQuestion, Users, TrendingUp } from "lucide-react";

interface StatCardsProps {
  totalQuiz: number;
  activeQuiz: number;
  totalSoal: number;
  totalPengerjaan: number;
  avgNilai: number;
  loading: boolean;
}

const statConfig = [
  {
    key: "totalQuiz",
    label: "Total Quiz",
    icon: BookOpen,
    gradient: "from-emerald-500 to-green-600",
    lightBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    key: "activeQuiz",
    label: "Quiz Aktif",
    icon: ToggleRight,
    gradient: "from-blue-500 to-cyan-600",
    lightBg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    key: "totalSoal",
    label: "Total Soal",
    icon: FileQuestion,
    gradient: "from-violet-500 to-purple-600",
    lightBg: "bg-violet-50",
    iconColor: "text-violet-600",
  },
  {
    key: "totalPengerjaan",
    label: "Total Pengerjaan",
    icon: Users,
    gradient: "from-amber-500 to-orange-600",
    lightBg: "bg-amber-50",
    iconColor: "text-amber-600",
  },
  {
    key: "avgNilai",
    label: "Rata-rata Nilai",
    icon: TrendingUp,
    gradient: "from-emerald-500 to-teal-600",
    lightBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
];

export function StatCards({ totalQuiz, activeQuiz, totalSoal, totalPengerjaan, avgNilai, loading }: StatCardsProps) {
  const values: Record<string, string | number> = {
    totalQuiz,
    activeQuiz,
    totalSoal,
    totalPengerjaan,
    avgNilai: loading ? "-" : `${avgNilai}%`,
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
      {statConfig.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 + i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
            whileHover={{ y: -3, boxShadow: "0 15px 35px rgba(0,0,0,0.08)" }}
            className="relative bg-card border border-border rounded-2xl p-4 sm:p-5 shadow-[0_4px_12px_rgba(0,0,0,0.04)] transition-all duration-300 overflow-hidden"
          >
            <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${stat.gradient}`} />
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl ${stat.lightBg} flex items-center justify-center`}>
                <Icon className={`w-5 h-5 ${stat.iconColor}`} />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-foreground tabular-nums tracking-tight">
              {loading ? (
                <span className="inline-block w-12 h-7 rounded-md bg-muted animate-pulse" />
              ) : (
                values[stat.key]
              )}
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1 font-medium">{stat.label}</p>
          </motion.div>
        );
      })}
    </div>
  );
}
