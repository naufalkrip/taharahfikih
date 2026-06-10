import { motion } from "motion/react";
import { BookOpen, Plus } from "lucide-react";

interface EmptyQuizStateProps {
  hasFilters: boolean;
  onResetFilters: () => void;
  onCreateQuiz: () => void;
}

export function EmptyQuizState({ hasFilters, onResetFilters, onCreateQuiz }: EmptyQuizStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="bg-card border border-border rounded-2xl p-10 sm:p-16 text-center"
    >
      <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto mb-5">
        <BookOpen className="w-8 h-8 text-emerald-400" />
      </div>

      {hasFilters ? (
        <>
          <h3 className="text-lg font-semibold text-foreground mb-2">Tidak Ada Hasil</h3>
          <p className="text-sm text-muted-foreground mb-5 max-w-sm mx-auto">
            Tidak ada quiz yang cocok dengan filter yang kamu pilih. Coba ubah kata kunci atau atur ulang filter.
          </p>
          <button
            onClick={onResetFilters}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-50 text-emerald-700 text-sm font-medium hover:bg-emerald-100 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Reset Filter
          </button>
        </>
      ) : (
        <>
          <h3 className="text-lg font-semibold text-foreground mb-2">Belum Ada Quiz</h3>
          <p className="text-sm text-muted-foreground mb-5 max-w-sm mx-auto">
            Mulai membuat quiz pertama Anda untuk menguji pemahaman murid.
          </p>
          <button
            onClick={onCreateQuiz}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-green-500 text-white text-sm font-semibold hover:from-emerald-500 hover:to-green-400 transition-all shadow-md hover:shadow-lg active:scale-[0.97]"
          >
            <Plus className="w-4 h-4" />
            Buat Quiz Pertama
          </button>
        </>
      )}
    </motion.div>
  );
}
