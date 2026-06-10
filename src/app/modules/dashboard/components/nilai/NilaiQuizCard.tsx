import { BookOpen, Users, TrendingUp, Download, Clock } from "lucide-react";
import type { Quiz } from "../../../quiz/services/quiz.service";
import { formatDate } from "../../../../lib/utils";

interface NilaiQuizCardProps {
  quiz: Quiz;
  totalSiswa: number;
  sudahMengerjakan: number;
  rataRataNilai: number;
  nilaiTertinggi: number;
  onDownload: (quiz: Quiz) => void;
  onDetail: (quiz: Quiz) => void;
  downloading?: boolean;
}

export function NilaiQuizCard({
  quiz, totalSiswa, sudahMengerjakan, rataRataNilai, nilaiTertinggi, onDownload, onDetail, downloading,
}: NilaiQuizCardProps) {
  const completionRate = totalSiswa > 0 ? Math.round((sudahMengerjakan / totalSiswa) * 100) : 0;
  const belumMengerjakan = Math.max(0, totalSiswa - sudahMengerjakan);

  return (
    <div className="bg-card border border-border rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shrink-0">
          <BookOpen className="w-4.5 h-4.5 text-white" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-foreground truncate">{quiz.title}</h3>
            <span className={`shrink-0 inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium ${
              quiz.is_active ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"
            }`}>
              <span className={`w-1 h-1 rounded-full ${quiz.is_active ? "bg-green-500" : "bg-slate-400"}`} />
              {quiz.is_active ? "Aktif" : "Nonaktif"}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">{quiz.topic || "Semua Materi"}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="rounded-lg bg-emerald-50/50 border border-emerald-100 p-2.5">
          <div className="flex items-center gap-1 text-[10px] text-muted-foreground mb-0.5">
            <Users className="w-3 h-3" /> Siswa
          </div>
          <p className="text-sm font-bold text-foreground tabular-nums">{totalSiswa}</p>
          <p className="text-[10px] text-muted-foreground">
            <span className="text-emerald-600 font-medium">{sudahMengerjakan}</span> selesai
            {belumMengerjakan > 0 && <span className="text-amber-600 font-medium"> · {belumMengerjakan} blm</span>}
          </p>
        </div>
        <div className="rounded-lg bg-violet-50/50 border border-violet-100 p-2.5">
          <div className="flex items-center gap-1 text-[10px] text-muted-foreground mb-0.5">
            <TrendingUp className="w-3 h-3" /> Nilai
          </div>
          <p className="text-sm font-bold text-foreground tabular-nums">{rataRataNilai}%</p>
          <p className="text-[10px] text-muted-foreground">Tertinggi <span className="text-amber-600 font-medium">{nilaiTertinggi}%</span></p>
        </div>
      </div>

      <div className="space-y-1 mb-3">
        <div className="flex items-center justify-between text-[10px]">
          <span className="text-muted-foreground">Penyelesaian</span>
          <span className="font-medium text-foreground">{completionRate}%</span>
        </div>
        <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
          <div className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all" style={{ width: `${completionRate}%` }} />
        </div>
      </div>

      <div className="flex items-center justify-between pt-2.5 border-t border-border">
        <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
          <Clock className="w-3 h-3" />
          {formatDate(quiz.created_at)}
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => onDetail(quiz)} className="px-3 py-1.5 rounded-lg text-xs font-medium text-emerald-600 hover:bg-emerald-50 border border-emerald-200 transition-colors">
            Lihat Hasil
          </button>
          <button onClick={() => onDownload(quiz)} disabled={downloading} className="p-1.5 rounded-lg text-muted-foreground hover:text-green-600 hover:bg-green-50 transition-colors disabled:opacity-40" title="Download PDF">
            <Download className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
