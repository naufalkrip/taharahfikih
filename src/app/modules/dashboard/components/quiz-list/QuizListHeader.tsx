import { motion } from "motion/react";
import { Plus } from "lucide-react";

interface QuizListHeaderProps {
  onCreateQuiz: () => void;
}

export function QuizListHeader({ onCreateQuiz }: QuizListHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 via-emerald-500 to-green-500 p-6 sm:p-8"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/3 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/3 -translate-x-1/4" />
      <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
            Daftar Soal
          </h1>
          <p className="text-sm sm:text-base text-white/80 mt-1.5 max-w-xl">
            Kelola, pantau, dan bagikan quiz yang telah dibuat.
          </p>
        </div>
        <button
          onClick={onCreateQuiz}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-emerald-700 text-sm font-semibold hover:bg-white/90 transition-all shadow-lg hover:shadow-xl active:scale-[0.97]"
        >
          <Plus className="w-4 h-4" />
          Buat Quiz Baru
        </button>
      </div>
    </motion.div>
  );
}
