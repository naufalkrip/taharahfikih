import { Download, Loader2 } from "lucide-react";

interface NilaiHeaderProps {
  onExportAll: () => void;
  exportingAll: boolean;
  hasData: boolean;
}

export function NilaiHeader({ onExportAll, exportingAll, hasData }: NilaiHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">Hasil & Nilai Murid</h1>
        <p className="text-sm text-muted-foreground mt-1">Pantau nilai siswa dan unduh laporan secara instan.</p>
      </div>
      <button
        onClick={onExportAll}
        disabled={exportingAll || !hasData}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-green-500 text-white text-sm font-semibold hover:from-emerald-500 hover:to-green-400 transition-all shadow-md hover:shadow-lg active:scale-[0.97] disabled:opacity-40 disabled:scale-100"
      >
        {exportingAll ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Download className="w-4 h-4" />
        )}
        {exportingAll ? "Mengunduh..." : "Export Semua PDF"}
      </button>
    </div>
  );
}
