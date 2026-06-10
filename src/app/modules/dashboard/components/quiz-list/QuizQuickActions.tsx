import { motion } from "motion/react";
import { Link } from "react-router";
import { Plus, Zap, Share2, Download } from "lucide-react";

export function QuizQuickActions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className="bg-card border border-border rounded-2xl p-4 shadow-[0_4px_12px_rgba(0,0,0,0.04)]"
    >
      <div className="flex flex-wrap items-center gap-3">
        <Link
          to="/dashboard/create"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-green-500 text-white text-sm font-semibold hover:from-emerald-500 hover:to-green-400 transition-all shadow-md hover:shadow-lg active:scale-[0.97]"
        >
          <Plus className="w-4 h-4" />
          Buat Quiz
        </Link>

        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-background text-sm font-medium text-foreground hover:bg-muted/50 hover:border-emerald-200 hover:text-emerald-700 transition-all active:scale-[0.97]">
          <Zap className="w-4 h-4" />
          Generate Otomatis
        </button>

        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-background text-sm font-medium text-foreground hover:bg-muted/50 hover:border-emerald-200 hover:text-emerald-700 transition-all active:scale-[0.97]">
          <Share2 className="w-4 h-4" />
          Bagikan Quiz
        </button>

        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-background text-sm font-medium text-foreground hover:bg-muted/50 hover:border-emerald-200 hover:text-emerald-700 transition-all active:scale-[0.97]">
          <Download className="w-4 h-4" />
          Export Data
        </button>
      </div>
    </motion.div>
  );
}
