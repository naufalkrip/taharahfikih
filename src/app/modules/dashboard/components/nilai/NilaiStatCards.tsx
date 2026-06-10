import { Users, FileText, TrendingUp, Trophy } from "lucide-react";

const cards = [
  { key: "siswa", label: "Total Siswa", icon: Users, color: "text-emerald-600", bg: "bg-emerald-50" },
  { key: "quiz", label: "Total Quiz", icon: FileText, color: "text-blue-600", bg: "bg-blue-50" },
  { key: "rata", label: "Rata-rata Nilai", icon: TrendingUp, color: "text-violet-600", bg: "bg-violet-50" },
  { key: "tertinggi", label: "Nilai Tertinggi", icon: Trophy, color: "text-amber-600", bg: "bg-amber-50" },
];

interface NilaiStatCardsProps {
  totalSiswa: number;
  totalQuiz: number;
  rataRata: number;
  nilaiTertinggi: number;
  loading: boolean;
}

export function NilaiStatCards({ totalSiswa, totalQuiz, rataRata, nilaiTertinggi, loading }: NilaiStatCardsProps) {
  const values = { siswa: totalSiswa, quiz: totalQuiz, rata: loading ? "-" : `${rataRata}%`, tertinggi: loading ? "-" : `${nilaiTertinggi}%` };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {cards.map((c) => {
        const Icon = c.icon;
        return (
          <div key={c.key} className="bg-card border border-border rounded-xl p-4 shadow-sm">
            <div className={`w-9 h-9 rounded-lg ${c.bg} flex items-center justify-center mb-2.5`}>
              <Icon className={`w-4.5 h-4.5 ${c.color}`} />
            </div>
            <p className="text-xl font-bold text-foreground tabular-nums">
              {loading ? <span className="inline-block w-10 h-5 rounded bg-muted animate-pulse" /> : values[c.key]}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">{c.label}</p>
          </div>
        );
      })}
    </div>
  );
}
