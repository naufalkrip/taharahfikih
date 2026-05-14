import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Search, Loader2, Eye } from "lucide-react";
import { getAllTeacherAttempts } from "../../quiz/services/quiz.service";
import { formatDate, formatTime } from "../../../lib/utils";

export function StudentResults() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterClass, setFilterClass] = useState("");

  useEffect(() => { load(); }, []);

  const load = async () => {
    setLoading(true);
    const data = await getAllTeacherAttempts();
    setSessions(data);
    setLoading(false);
  };

  const filtered = sessions.filter((s) => {
    const name = s.student_name?.toLowerCase().includes(search.toLowerCase());
    const num = s.student_number?.includes(search);
    const cls = !filterClass || s.student_class === filterClass;
    return (name || num) && cls;
  });

  const classes = [...new Set(sessions.map((s) => s.student_class).filter(Boolean))];

  const getScoreColor = (pct: number) => {
    if (pct >= 85) return "text-emerald-600";
    if (pct >= 70) return "text-blue-600";
    if (pct >= 50) return "text-amber-600";
    return "text-red-500";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-foreground">Hasil Murid</h1>
        <p className="text-sm text-muted-foreground mt-1">Pantau hasil belajar murid</p>
      </div>

      {sessions.length === 0 ? (
        <div className="bg-card border border-border rounded-2xl p-10 text-center">
          <p className="text-muted-foreground text-sm">Belum ada hasil quiz dari murid</p>
        </div>
      ) : (
        <>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari nama atau nomor..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            {classes.length > 0 && (
              <select
                value={filterClass}
                onChange={(e) => setFilterClass(e.target.value)}
                className="px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              >
                <option value="">Semua Kelas</option>
                {classes.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            )}
          </div>

          {/* Table */}
          <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="text-left px-4 py-3 font-semibold text-foreground">Nama</th>
                    <th className="text-left px-4 py-3 font-semibold text-foreground hidden sm:table-cell">Kelas</th>
                    <th className="text-left px-4 py-3 font-semibold text-foreground hidden sm:table-cell">Quiz</th>
                    <th className="text-center px-4 py-3 font-semibold text-foreground">Nilai</th>
                    <th className="text-left px-4 py-3 font-semibold text-foreground hidden md:table-cell">Waktu</th>
                    <th className="text-right px-4 py-3 font-semibold text-foreground">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((s) => (
                    <tr key={s.id} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-3">
                        <p className="font-medium text-foreground">{s.student_name}</p>
                        {s.student_number && (
                          <p className="text-xs text-muted-foreground">No. {s.student_number}</p>
                        )}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{s.student_class || "-"}</td>
                      <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell max-w-[120px] truncate">
                        {s.quizzes?.title ?? "-"}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`text-lg font-bold ${getScoreColor(Number(s.percentage))}`}>
                          {Math.round(Number(s.percentage))}%
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-muted-foreground hidden md:table-cell">
                        {formatTime(s.time_spent)}<br />
                        <span>{formatDate(s.created_at)}</span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Link
                          to={`/dashboard/results/${s.id}`}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20 transition-colors"
                        >
                          <Eye className="w-3 h-3" />
                          Detail
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
