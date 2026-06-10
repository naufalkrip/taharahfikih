import { motion } from "motion/react";
import { BookOpen, FileQuestion, Users, Calendar } from "lucide-react";
import type { Quiz } from "../../../quiz/services/quiz.service";
import { formatDate } from "../../../../lib/utils";
import { QuizStatusBadge } from "./QuizStatusBadge";
import { QuizActionMenu } from "./QuizActionMenu";
import { EmptyQuizState } from "./EmptyQuizState";

interface QuizDataTableProps {
  quizzes: Quiz[];
  questionCounts: Record<string, number>;
  attemptCounts: Record<string, number>;
  loading: boolean;
  hasFilters: boolean;
  onResetFilters: () => void;
  onShare: (quiz: Quiz) => void;
  onDelete: (id: string) => void;
  onCreateQuiz: () => void;
  onToggleStatus?: (id: string) => void;
}

export function QuizDataTable({
  quizzes,
  questionCounts,
  attemptCounts,
  loading,
  hasFilters,
  onResetFilters,
  onShare,
  onDelete,
  onCreateQuiz,
  onToggleStatus,
}: QuizDataTableProps) {
  if (loading) {
    return (
      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                {["Quiz", "Materi", "Kelas", "Tanggal", "Status", "Soal", "Pengerjaan", "Aksi"].map((h) => (
                  <th key={h} className="text-left px-4 py-3.5 font-semibold text-foreground text-xs uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4].map((i) => (
                <tr key={i} className="border-b border-border/50">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((j) => (
                    <td key={j} className="px-4 py-4">
                      <div className="h-4 rounded-md bg-muted animate-pulse" style={{ width: j <= 2 ? `${60 + Math.random() * 30}%` : `${30 + Math.random() * 20}%` }} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (quizzes.length === 0) {
    return <EmptyQuizState hasFilters={hasFilters} onResetFilters={onResetFilters} onCreateQuiz={onCreateQuiz} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className="bg-card border border-border rounded-2xl overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.04)]"
    >
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <TableHead>Quiz</TableHead>
              <TableHead className="hidden sm:table-cell">Materi</TableHead>
              <TableHead className="hidden sm:table-cell">Kelas</TableHead>
              <TableHead className="hidden md:table-cell">Tanggal Dibuat</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center hidden md:table-cell">Soal</TableHead>
              <TableHead className="text-center hidden lg:table-cell">Pengerjaan</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </tr>
          </thead>
          <tbody>
            {quizzes.map((q, i) => (
              <motion.tr
                key={q.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.45 + i * 0.04 }}
                whileHover={{ backgroundColor: "rgba(16, 185, 129, 0.03)" }}
                className="border-b border-border/50 transition-colors"
              >
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-4.5 h-4.5 text-emerald-500" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-foreground truncate max-w-[200px] sm:max-w-[260px]">
                        {q.title}
                      </p>
                      <p className="text-xs text-muted-foreground truncate max-w-[200px] sm:max-w-[260px]">
                        {q.description || "Tidak ada deskripsi"}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 text-muted-foreground hidden sm:table-cell">
                  <span className="inline-flex items-center gap-1.5">
                    <FileQuestion className="w-3.5 h-3.5 text-muted-foreground/60" />
                    {q.topic || "-"}
                  </span>
                </td>
                <td className="px-4 py-4 hidden sm:table-cell">
                  {q.category ? (
                    <span className="inline-flex px-2 py-0.5 rounded-lg bg-violet-50 text-violet-700 text-xs font-medium border border-violet-200">
                      {q.category}
                    </span>
                  ) : (
                    <span className="text-muted-foreground text-xs">-</span>
                  )}
                </td>
                <td className="px-4 py-4 text-muted-foreground hidden md:table-cell">
                  <span className="inline-flex items-center gap-1.5 text-xs">
                    <Calendar className="w-3.5 h-3.5 text-muted-foreground/60" />
                    {formatDate(q.created_at)}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <QuizStatusBadge isActive={q.is_active} onToggle={() => onToggleStatus?.(q.id)} />
                </td>
                <td className="px-4 py-4 text-center hidden md:table-cell">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-muted text-xs font-semibold text-foreground tabular-nums">
                    {questionCounts[q.id] ?? 0}
                  </span>
                </td>
                <td className="px-4 py-4 text-center hidden lg:table-cell">
                  <div className="flex flex-col items-center gap-0.5">
                    <span className="text-xs font-semibold text-foreground tabular-nums">
                      {attemptCounts[q.id] ?? 0}
                    </span>
                    {(attemptCounts[q.id] ?? 0) > 0 && (
                      <span className="text-[10px] text-muted-foreground">kali</span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-4 text-right">
                  <QuizActionMenu
                    slug={q.slug}
                    onShare={() => onShare(q)}
                    onDelete={() => onDelete(q.id)}
                  />
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

function TableHead({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <th className={`text-left px-4 py-3.5 font-semibold text-foreground text-xs uppercase tracking-wider ${className ?? ""}`}>
      {children}
    </th>
  );
}
