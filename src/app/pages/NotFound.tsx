import { Link } from "react-router";
import { Home, BookOpen, Plus, Droplets } from "lucide-react";
import { motion } from "motion/react";
import { useLanguage } from "../contexts/LanguageContext";

export function NotFound() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="mb-8"
      >
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-600/20 mx-auto">
          <Droplets className="w-10 h-10 text-white" />
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 tracking-widest uppercase mb-2"
      >
        THAVA
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-8xl font-heading font-black text-foreground mb-2 leading-none"
      >
        404
      </motion.h1>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18 }}
        className="text-2xl font-heading font-bold text-foreground mb-3"
      >
        {t("notFound.title")}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.26 }}
        className="text-base text-muted-foreground mb-10 max-w-md leading-relaxed"
      >
        {t("notFound.desc")}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.34 }}
        className="flex flex-col sm:flex-row items-center gap-3"
      >
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-medium text-sm hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/20 w-full sm:w-auto justify-center"
        >
          <Home className="w-4 h-4" />
          {t("notFound.back")}
        </Link>
        <Link
          to="/dashboard/quizzes"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border bg-card text-foreground font-medium text-sm hover:bg-muted transition-colors w-full sm:w-auto justify-center"
        >
          <BookOpen className="w-4 h-4" />
          Daftar Soal
        </Link>
        <Link
          to="/dashboard/quizzes"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 font-medium text-sm hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-colors w-full sm:w-auto justify-center"
        >
          <Plus className="w-4 h-4" />
          Buat Quiz Baru
        </Link>
      </motion.div>
    </div>
  );
}
