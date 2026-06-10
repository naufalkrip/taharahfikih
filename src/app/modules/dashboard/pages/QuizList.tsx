import { useEffect, useState, useMemo, useCallback } from "react";
import { motion } from "motion/react";
import { getMyQuizzes, deleteQuiz, toggleQuizStatus, getQuestionCounts, getAttemptStats } from "../../quiz/services/quiz.service";
import type { Quiz } from "../../quiz/services/quiz.service";
import { getAllTeacherAttempts } from "../../quiz/services/quiz.service";
import { ShareLinkModal } from "../../../components/quiz/ShareLinkModal";
import {
  QuizListHeader,
  StatCards,
  QuizFilterBar,
  QuizPerformanceInsights,
  QuizDataTable,
  DeleteQuizDialog,
  CreateQuizModal,
} from "../components/quiz-list";

interface FilterValues {
  search: string;
  kelas: string;
  materi: string;
  status: string;
  sort: string;
}

const defaultFilters: FilterValues = {
  search: "",
  kelas: "",
  materi: "",
  status: "",
  sort: "newest",
};

export function QuizList() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [questionCounts, setQuestionCounts] = useState<Record<string, number>>({});
  const [attemptCounts, setAttemptCounts] = useState<Record<string, number>>({});
  const [allAttempts, setAllAttempts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterValues>(defaultFilters);
  const [shareQuiz, setShareQuiz] = useState<{ slug: string; title: string } | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getMyQuizzes();
      setQuizzes(data);

      const ids = data.map((q) => q.id);
      if (ids.length > 0) {
        const [qCounts, aStats, sessions] = await Promise.all([
          getQuestionCounts(ids),
          getAttemptStats(ids),
          getAllTeacherAttempts(),
        ]);
        setQuestionCounts(qCounts);
        const aCounts: Record<string, number> = {};
        for (const id of ids) aCounts[id] = aStats[id]?.count ?? 0;
        setAttemptCounts(aCounts);
        setAllAttempts(sessions);
      } else {
        setQuestionCounts({});
        setAttemptCounts({});
        setAllAttempts([]);
      }
    } catch (err) {
      console.error("Gagal memuat quiz", err);
    }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleToggleStatus = async (id: string) => {
    const quiz = quizzes.find((q) => q.id === id);
    if (!quiz) return;
    const next = !quiz.is_active;
    setQuizzes((prev) => prev.map((q) => (q.id === id ? { ...q, is_active: next } : q)));
    try {
      await toggleQuizStatus(id, next);
    } catch {
      setQuizzes((prev) => prev.map((q) => (q.id === id ? { ...q, is_active: !next } : q)));
    }
  };

  const handleDelete = async () => {
    if (!confirmDelete) return;
    setDeleting(true);
    try {
      await deleteQuiz(confirmDelete);
      setQuizzes((prev) => prev.filter((q) => q.id !== confirmDelete));
    } catch (err) {
      console.error("Gagal menghapus", err);
    }
    setDeleting(false);
    setConfirmDelete(null);
  };

  const stats = useMemo(() => {
    const totalQuiz = quizzes.length;
    const activeQuiz = quizzes.filter((q) => q.is_active).length;
    const totalSoal = Object.values(questionCounts).reduce((a, b) => a + b, 0);
    const totalPengerjaan = Object.values(attemptCounts).reduce((a, b) => a + b, 0);
    const avgNilai = allAttempts.length > 0
      ? Math.round(allAttempts.reduce((sum: number, s: any) => sum + Number(s.percentage), 0) / allAttempts.length)
      : 0;
    return { totalQuiz, activeQuiz, totalSoal, totalPengerjaan, avgNilai };
  }, [quizzes, questionCounts, attemptCounts, allAttempts]);

  const performance = useMemo(() => {
    if (quizzes.length === 0 || allAttempts.length === 0) return null;

    const populerEntry = Object.entries(attemptCounts).sort(([, a], [, b]) => b - a)[0];
    const populerQuiz = populerEntry
      ? quizzes.find((q) => q.id === populerEntry[0])?.title ?? "-"
      : "-";

    const tingkatPengerjaan = allAttempts.length > 0 && quizzes.length > 0
      ? `${Math.round((allAttempts.length / quizzes.length) * 100)}%`
      : "0%";

    const sortedByScore = [...allAttempts].sort((a: any, b: any) => Number(b.percentage) - Number(a.percentage));
    const nilaiTertinggi = sortedByScore.length > 0
      ? `${sortedByScore[0].percentage}%`
      : "-";

    const rataRata = `${stats.avgNilai}%`;

    return { populerQuiz, tingkatPengerjaan, nilaiTertinggi, rataRata };
  }, [quizzes, attemptCounts, allAttempts, stats.avgNilai]);

  const filtered = useMemo(() => {
    let result = [...quizzes];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (r) => r.title.toLowerCase().includes(q) || (r.description && r.description.toLowerCase().includes(q))
      );
    }
    if (filters.kelas && filters.kelas !== "all") {
      result = result.filter((r) => r.category === filters.kelas);
    }
    if (filters.materi && filters.materi !== "all") {
      result = result.filter((r) => r.topic === filters.materi);
    }
    if (filters.status) {
      if (filters.status === "active") result = result.filter((r) => r.is_active);
      else if (filters.status === "inactive") result = result.filter((r) => !r.is_active);
    }
    if (filters.sort) {
      result.sort((a, b) => {
        switch (filters.sort) {
          case "oldest": return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
          case "az": return a.title.localeCompare(b.title);
          case "za": return b.title.localeCompare(a.title);
          default: return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        }
      });
    }
    return result;
  }, [quizzes, filters]);

  const kelasOptions = useMemo(
    () => [...new Set(quizzes.map((q) => q.category).filter(Boolean))] as string[],
    [quizzes]
  );
  const materiOptions = useMemo(
    () => [...new Set(quizzes.map((q) => q.topic).filter(Boolean))] as string[],
    [quizzes]
  );

  const hasFilters = filters.search || filters.kelas || filters.materi || filters.status || filters.sort !== "newest";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="max-w-6xl mx-auto space-y-5 sm:space-y-6"
    >
      <QuizListHeader onCreateQuiz={() => setCreateModalOpen(true)} />

      <StatCards
        totalQuiz={stats.totalQuiz}
        activeQuiz={stats.activeQuiz}
        totalSoal={stats.totalSoal}
        totalPengerjaan={stats.totalPengerjaan}
        avgNilai={stats.avgNilai}
        loading={loading}
      />

      <QuizFilterBar
        values={filters}
        onChange={setFilters}
        onReset={() => setFilters(defaultFilters)}
        kelasOptions={kelasOptions}
        materiOptions={materiOptions}
      />

      <QuizPerformanceInsights data={performance} loading={loading} />

      <QuizDataTable
        quizzes={filtered}
        questionCounts={questionCounts}
        attemptCounts={attemptCounts}
        loading={loading}
        hasFilters={hasFilters}
        onResetFilters={() => setFilters(defaultFilters)}
        onShare={(q) => setShareQuiz({ slug: q.slug, title: q.title })}
        onDelete={(id) => setConfirmDelete(id)}
        onCreateQuiz={() => setCreateModalOpen(true)}
        onToggleStatus={handleToggleStatus}
      />

      {shareQuiz && (
        <ShareLinkModal
          open={!!shareQuiz}
          onClose={() => setShareQuiz(null)}
          title={shareQuiz.title}
          url={`${window.location.origin}/s/${shareQuiz.slug}`}
        />
      )}

      <DeleteQuizDialog
        open={!!confirmDelete}
        onClose={() => !deleting && setConfirmDelete(null)}
        onConfirm={handleDelete}
        deleting={deleting}
      />

      <CreateQuizModal
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
        onSuccess={() => {
          setCreateModalOpen(false);
          load();
        }}
      />
    </motion.div>
  );
}
