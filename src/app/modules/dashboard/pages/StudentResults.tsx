import { useEffect, useState, useMemo, useCallback } from "react";
import { motion } from "motion/react";
import { BookOpen } from "lucide-react";
import { getMyQuizzes, getAllTeacherAttempts, getQuizQuestions } from "../../quiz/services/quiz.service";
import type { Quiz } from "../../quiz/services/quiz.service";
import { generateQuizExportPDF } from "../../../utils/generateQuizExportPDF";
import {
  NilaiHeader,
  NilaiStatCards,
  NilaiFilterBar,
  NilaiQuizCard,
  NilaiSidebar,
} from "../components/nilai";

export function StudentResults() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [attempts, setAttempts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterKelas, setFilterKelas] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [exportingAll, setExportingAll] = useState(false);
  const [exportingPDF, setExportingPDF] = useState(false);
  const [exportingCSV, setExportingCSV] = useState(false);
  const [downloadingQuiz, setDownloadingQuiz] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([getMyQuizzes(), getAllTeacherAttempts()]).then(
      ([q, a]) => { setQuizzes(q); setAttempts(a); setLoading(false); },
    );
  }, []);

  // --- Data computations ---

  const uniqueStudents = useMemo(
    () => [...new Set(attempts.map((a: any) => a.student_name).filter(Boolean))],
    [attempts],
  );

  const classMap = useMemo(() => {
    const map: Record<string, Quiz[]> = {};
    for (const q of quizzes) {
      const cat = q.category || "Tanpa Kelas";
      if (!map[cat]) map[cat] = [];
      map[cat].push(q);
    }
    return map;
  }, [quizzes]);

  const attemptsByQuiz = useMemo(() => {
    const map: Record<string, any[]> = {};
    for (const a of attempts) {
      if (!map[a.quiz_id]) map[a.quiz_id] = [];
      map[a.quiz_id].push(a);
    }
    return map;
  }, [attempts]);

  const stats = useMemo(() => {
    const pcts = attempts.map((a: any) => Number(a.percentage));
    return {
      totalSiswa: uniqueStudents.length,
      totalQuiz: quizzes.length,
      rataRata: pcts.length > 0 ? Math.round(pcts.reduce((s, v) => s + v, 0) / pcts.length) : 0,
      nilaiTertinggi: pcts.length > 0 ? Math.round(Math.max(...pcts)) : 0,
    };
  }, [uniqueStudents, quizzes, attempts]);

  const quizAnalyticsMap = useMemo(() => {
    const result: Record<string, { totalSiswa: number; sudahMengerjakan: number; rataRataNilai: number; nilaiTertinggi: number }> = {};
    for (const q of quizzes) {
      const qa = attemptsByQuiz[q.id] || [];
      const pcts = qa.map((a: any) => Number(a.percentage));
      const avg = pcts.length > 0 ? Math.round(pcts.reduce((s, v) => s + v, 0) / pcts.length) : 0;
      const highest = pcts.length > 0 ? Math.round(Math.max(...pcts)) : 0;
      const unique = new Set(qa.map((a: any) => a.student_name).filter(Boolean));
      result[q.id] = { totalSiswa: unique.size, sudahMengerjakan: qa.length, rataRataNilai: avg, nilaiTertinggi: highest };
    }
    return result;
  }, [quizzes, attemptsByQuiz]);

  const leaderboard = useMemo(() => {
    const best: Record<string, number> = {};
    for (const a of attempts) {
      const name = a.student_name;
      if (!name) continue;
      if (!best[name] || Number(a.percentage) > best[name]) best[name] = Number(a.percentage);
    }
    return Object.entries(best)
      .map(([name, percentage]) => ({ name, percentage }))
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 5);
  }, [attempts]);

  const kelasOptions = useMemo(
    () => [...new Set(quizzes.map((q) => q.category).filter(Boolean))] as string[],
    [quizzes],
  );

  const filteredQuizzes = useMemo(() => {
    let r = [...quizzes];
    if (search) {
      const q = search.toLowerCase();
      r = r.filter((x) => x.title.toLowerCase().includes(q) || (x.description && x.description.toLowerCase().includes(q)));
    }
    if (filterKelas !== "all") r = r.filter((x) => x.category === filterKelas);
    if (sortBy === "score") r.sort((a, b) => (quizAnalyticsMap[b.id]?.rataRataNilai ?? 0) - (quizAnalyticsMap[a.id]?.rataRataNilai ?? 0));
    else if (sortBy === "completion") r.sort((a, b) => (quizAnalyticsMap[b.id]?.sudahMengerjakan ?? 0) - (quizAnalyticsMap[a.id]?.sudahMengerjakan ?? 0));
    else r.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    return r;
  }, [quizzes, search, filterKelas, sortBy, quizAnalyticsMap]);

  // --- Actions ---

  const handleExportAll = useCallback(async () => {
    setExportingAll(true);
    try {
      for (const quiz of quizzes) {
        const questions = await getQuizQuestions(quiz.id);
        generateQuizExportPDF(quiz.title, quiz.topic, quiz.category, questions, attemptsByQuiz[quiz.id] || []);
      }
    } catch (err) { console.error("Gagal export PDF", err); }
    setExportingAll(false);
  }, [quizzes, attemptsByQuiz]);

  const handleDownloadQuiz = useCallback(async (quiz: Quiz) => {
    setDownloadingQuiz(quiz.id);
    try {
      const questions = await getQuizQuestions(quiz.id);
      generateQuizExportPDF(quiz.title, quiz.topic, quiz.category, questions, attemptsByQuiz[quiz.id] || []);
    } catch (err) { console.error("Gagal download PDF", err); }
    setDownloadingQuiz(null);
  }, [attemptsByQuiz]);

  const handleDetail = useCallback((quiz: Quiz) => {
    const el = document.getElementById(`quiz-${quiz.id}`);
    el?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleExportPDF = useCallback(async () => {
    setExportingPDF(true);
    await handleExportAll();
    setExportingPDF(false);
  }, [handleExportAll]);

  const handleExportCSV = useCallback(async () => {
    setExportingCSV(true);
    try {
      const headers = ["Nama Siswa", "Quiz", "Nilai", "Persentase", "Kelas", "Waktu"];
      const rows = attempts.map((a: any) => [
        a.student_name || "", a.quizzes?.title || "", a.score || 0,
        `${Math.round(Number(a.percentage))}%`, a.student_class || "", a.created_at || "",
      ]);
      const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `nilai-${new Date().toISOString().split("T")[0]}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) { console.error("Gagal export CSV", err); }
    setExportingCSV(false);
  }, [attempts]);

  const hasData = uniqueStudents.length > 0;

  // --- Render ---

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto space-y-4">
        <div className="h-8 w-48 rounded-lg bg-muted animate-pulse" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[1, 2, 3, 4].map((i) => <div key={i} className="h-24 rounded-xl bg-muted animate-pulse" />)}
        </div>
      </div>
    );
  }

  if (quizzes.length === 0) {
    return (
      <div className="max-w-6xl mx-auto space-y-4">
        <NilaiHeader onExportAll={handleExportAll} exportingAll={false} hasData={false} />
        <div className="bg-card border border-border rounded-xl p-12 text-center">
          <div className="w-14 h-14 rounded-xl bg-emerald-50 flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-7 h-7 text-emerald-400" />
          </div>
          <h3 className="text-base font-semibold text-foreground mb-1">Belum Ada Data Nilai</h3>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto">Nilai siswa akan muncul setelah mereka menyelesaikan quiz.</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="max-w-6xl mx-auto space-y-4">
      <NilaiHeader onExportAll={handleExportAll} exportingAll={exportingAll} hasData={hasData} />

      <NilaiStatCards totalSiswa={stats.totalSiswa} totalQuiz={stats.totalQuiz} rataRata={stats.rataRata} nilaiTertinggi={stats.nilaiTertinggi} loading={false} />

      <NilaiFilterBar
        search={search} onSearchChange={setSearch}
        kelasOptions={kelasOptions} filterKelas={filterKelas} onKelasChange={setFilterKelas}
        sortBy={sortBy} onSortChange={setSortBy}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-3 space-y-4">
          {filteredQuizzes.length === 0 ? (
            <div className="bg-card border border-border rounded-xl p-8 text-center">
              <p className="text-sm text-muted-foreground">Tidak ada quiz yang cocok.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredQuizzes.map((q, i) => {
                const a = quizAnalyticsMap[q.id] || { totalSiswa: 0, sudahMengerjakan: 0, rataRataNilai: 0, nilaiTertinggi: 0 };
                return (
                  <NilaiQuizCard
                    key={q.id}
                    quiz={q}
                    totalSiswa={a.totalSiswa}
                    sudahMengerjakan={a.sudahMengerjakan}
                    rataRataNilai={a.rataRataNilai}
                    nilaiTertinggi={a.nilaiTertinggi}
                    onDownload={handleDownloadQuiz}
                    onDetail={handleDetail}
                    downloading={downloadingQuiz === q.id}
                  />
                );
              })}
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-24">
            <NilaiSidebar
              leaderboard={leaderboard}
              onExportPDF={handleExportPDF}
              onExportCSV={handleExportCSV}
              exportingPDF={exportingPDF}
              exportingCSV={exportingCSV}
              hasData={hasData}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
