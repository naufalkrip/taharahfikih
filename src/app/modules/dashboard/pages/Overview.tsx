import { useEffect, useState } from "react";
import { BookOpen, Users, Trophy, BarChart3 } from "lucide-react";
import { getMyQuizzes, getAllTeacherAttempts } from "../../quiz/services/quiz.service";
import { StatCard } from "../components/StatCard";

export function DashboardOverview() {
  const [quizCount, setQuizCount] = useState(0);
  const [sessionCount, setSessionCount] = useState(0);
  const [avgScore, setAvgScore] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const quizzes = await getMyQuizzes();
      const sessions = await getAllTeacherAttempts();
      setQuizCount(quizzes.length);
      setSessionCount(sessions.length);
      const avg = sessions.reduce((sum, s: any) => sum + Number(s.percentage), 0);
      setAvgScore(sessions.length > 0 ? Math.round(avg / sessions.length) : 0);
    } catch {}
    setLoading(false);
  };

  const stats = [
    {
      title: "Total Quiz",
      value: loading ? "-" : quizCount,
      icon: BookOpen,
      gradient: "bg-gradient-to-br from-blue-500 to-cyan-500",
    },
    {
      title: "Total Murid",
      value: loading ? "-" : sessionCount,
      icon: Users,
      gradient: "bg-gradient-to-br from-emerald-500 to-teal-500",
    },
    {
      title: "Rata-rata Nilai",
      value: loading ? "-" : `${avgScore}%`,
      icon: Trophy,
      gradient: "bg-gradient-to-br from-amber-500 to-orange-500",
    },
    {
      title: "Quiz Aktif",
      value: loading ? "-" : quizCount,
      icon: BarChart3,
      gradient: "bg-gradient-to-br from-violet-500 to-purple-500",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Selamat datang di dashboard pembelajaran THAVA (Taharah Virtual Academy)
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
        <h2 className="text-base font-bold text-foreground mb-2">
          Selamat Datang, Pembelajar!
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Anda dapat membuat quiz, membagikannya ke murid, dan memantau hasil belajar
          mereka secara real-time. Gunakan menu di sidebar untuk memulai.
        </p>
      </div>
    </div>
  );
}
