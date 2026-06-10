import { useEffect, useState, useMemo } from "react";
import { useParams, Link } from "react-router";
import { ArrowLeft, Search, Loader2, Users, BookOpen, Clock, TrendingUp } from "lucide-react";
import { motion } from "motion/react";
import { supabase } from "../../../lib/supabase";
import { getQuizAttempts } from "../../quiz/services/quiz.service";
import type { Quiz, StudentAttempt } from "../../quiz/services/quiz.service";
import { formatDate, formatTime } from "../../../lib/utils";

export function QuizAttemptList() {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [attempts, setAttempts] = useState<StudentAttempt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!quizId) return;

    Promise.all([
      supabase.from("quizzes").select("*").eq("id", quizId).single(),
      getQuizAttempts(quizId),
    ]).then(([{ data: quizData }, attemptsData]) => {
      if (!quizData) {
        setError("Quiz tidak ditemukan");
      } else {
        setQuiz(quizData);
      }
      setAttempts(attemptsData);
      setLoading(false);
    }).catch(() => {
      setError("Gagal memuat data");
      setLoading(false);
    });
  }, [quizId]);

  const filteredAttempts = useMemo(() => {
    if (!search) return attempts;
    const q = search.toLowerCase();
    return attempts.filter(
      (a) =>
        a.student_name.toLowerCase().includes(q) ||
        a.student_number.toLowerCase().includes(q) ||
        a.student_class.toLowerCase().includes(q),
    );
  }, [attempts, search]);

  const avgPercentage = useMemo(() => {
    if (attempts.length === 0) return 0;
    const total = attempts.reduce((s, a) => s + Number(a.percentage), 0);
    return Math.round(total / attempts.length);
  }, [attempts]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground mb-4">{error}</p>
        <Link to="/dashboard/results" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
          Kembali ke Hasil & Nilai
        </Link>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="max-w-5xl mx-auto space-y-6">
      <Link
        to="/dashboard/results"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="w-4 h-4" />
        Kembali ke Hasil & Nilai
      </Link>

      {/* Quiz Info */}
      <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shrink-0 shadow-md">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-heading font-bold text-foreground">{quiz?.title || "Quiz"}</h1>
            <p className="text-sm text-muted-foreground">{quiz?.topic || ""} · {quiz?.category || "Tanpa Kelas"}</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="rounded-xl bg-emerald-50/50 border border-emerald-100 p-3">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
              <Users className="w-3.5 h-3.5" /> Total Siswa
            </div>
            <p className="text-lg font-bold text-foreground">{attempts.length}</p>
          </div>
          <div className="rounded-xl bg-violet-50/50 border border-violet-100 p-3">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
              <TrendingUp className="w-3.5 h-3.5" /> Rata-rata
            </div>
            <p className="text-lg font-bold text-foreground">{avgPercentage}%</p>
          </div>
          <div className="rounded-xl bg-amber-50/50 border border-amber-100 p-3">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
              <Clock className="w-3.5 h-3.5" /> Tertinggi
            </div>
            <p className="text-lg font-bold text-foreground">
              {attempts.length > 0 ? Math.round(Math.max(...attempts.map(a => Number(a.percentage)))) : 0}%
            </p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Cari siswa..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
        />
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3 w-10">No</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Nama Siswa</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Kelas</th>
                <th className="text-center text-xs font-medium text-muted-foreground px-4 py-3">Skor</th>
                <th className="text-center text-xs font-medium text-muted-foreground px-4 py-3">Persentase</th>
                <th className="text-center text-xs font-medium text-muted-foreground px-4 py-3">Waktu</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Tanggal</th>
                <th className="text-center text-xs font-medium text-muted-foreground px-4 py-3 w-16">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredAttempts.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-12 text-sm text-muted-foreground">
                    {search ? "Tidak ada siswa yang cocok." : "Belum ada siswa yang mengerjakan quiz ini."}
                  </td>
                </tr>
              ) : (
                filteredAttempts.map((attempt, i) => (
                  <tr key={attempt.id} className="border-b border-border hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-3.5 text-muted-foreground">{i + 1}</td>
                    <td className="px-4 py-3.5">
                      <p className="font-medium text-foreground">{attempt.student_name}</p>
                      {attempt.student_number && (
                        <p className="text-xs text-muted-foreground">{attempt.student_number}</p>
                      )}
                    </td>
                    <td className="px-4 py-3.5 text-muted-foreground">{attempt.student_class || "-"}</td>
                    <td className="px-4 py-3.5 text-center font-medium text-foreground">
                      {attempt.score}/{attempt.total_questions}
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${
                        Number(attempt.percentage) >= 80
                          ? "bg-emerald-100 text-emerald-700"
                          : Number(attempt.percentage) >= 60
                          ? "bg-amber-100 text-amber-700"
                          : "bg-red-100 text-red-700"
                      }`}>
                        {Math.round(Number(attempt.percentage))}%
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-center text-muted-foreground text-xs">
                      {formatTime(attempt.time_spent)}
                    </td>
                    <td className="px-4 py-3.5 text-xs text-muted-foreground">
                      {formatDate(attempt.created_at)}
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <Link
                        to={`/dashboard/results/${attempt.id}`}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-emerald-600 hover:bg-emerald-50 transition-colors"
                      >
                        Detail
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-xs text-muted-foreground text-right">
        {filteredAttempts.length} siswa
      </p>
    </motion.div>
  );
}
