import { Trophy, Download, FileSpreadsheet, Loader2 } from "lucide-react";

interface LeaderEntry {
  name: string;
  percentage: number;
}

interface NilaiSidebarProps {
  leaderboard: LeaderEntry[];
  onExportPDF: () => void;
  onExportCSV: () => void;
  exportingPDF: boolean;
  exportingCSV: boolean;
  hasData: boolean;
}

export function NilaiSidebar({ leaderboard, onExportPDF, onExportCSV, exportingPDF, exportingCSV, hasData }: NilaiSidebarProps) {
  const initials = ["bg-emerald-500", "bg-blue-500", "bg-violet-500", "bg-amber-500", "bg-rose-500"];

  return (
    <div className="space-y-3">
      {/* Leaderboard */}
      <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <Trophy className="w-4 h-4 text-amber-500" />
          <h3 className="text-sm font-semibold text-foreground">Peringkat Siswa</h3>
        </div>
        {leaderboard.length === 0 ? (
          <p className="text-xs text-muted-foreground">Belum ada data</p>
        ) : (
          <div className="space-y-1.5">
            {leaderboard.slice(0, 5).map((e, i) => (
              <div key={e.name} className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-muted/30 transition-colors">
                <div className={`w-7 h-7 rounded-full ${initials[i] || "bg-slate-400"} flex items-center justify-center text-xs font-bold text-white shrink-0`}>
                  {e.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-foreground truncate">{e.name}</p>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xs font-bold text-emerald-600 tabular-nums">{Math.round(e.percentage)}%</span>
                  {i === 0 && <span className="text-xs">🥇</span>}
                  {i === 1 && <span className="text-xs">🥈</span>}
                  {i === 2 && <span className="text-xs">🥉</span>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Export Card */}
      <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
        <h3 className="text-sm font-semibold text-foreground mb-3">Export Laporan</h3>
        <div className="space-y-2">
          <button
            onClick={onExportPDF}
            disabled={exportingPDF || !hasData}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-600 to-green-500 text-white text-xs font-semibold hover:from-emerald-500 hover:to-green-400 transition-all disabled:opacity-40"
          >
            {exportingPDF ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
            {exportingPDF ? "Mengunduh..." : "Download PDF"}
          </button>
          <button
            onClick={onExportCSV}
            disabled={exportingCSV || !hasData}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border-2 border-emerald-200 text-emerald-700 text-xs font-semibold hover:bg-emerald-50 transition-all disabled:opacity-40"
          >
            {exportingCSV ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <FileSpreadsheet className="w-3.5 h-3.5" />}
            {exportingCSV ? "Mengunduh..." : "Download CSV"}
          </button>
        </div>
      </div>
    </div>
  );
}
