import { Search } from "lucide-react";

interface NilaiFilterBarProps {
  search: string;
  onSearchChange: (val: string) => void;
  kelasOptions: string[];
  filterKelas: string;
  onKelasChange: (val: string) => void;
  sortBy: string;
  onSortChange: (val: string) => void;
}

export function NilaiFilterBar({
  search, onSearchChange, kelasOptions, filterKelas, onKelasChange, sortBy, onSortChange,
}: NilaiFilterBarProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-3 shadow-sm">
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-[160px] max-w-xs">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            placeholder="Cari quiz..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-8 pr-2.5 h-8.5 rounded-lg border border-border bg-background text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
          />
        </div>

        <select
          value={filterKelas}
          onChange={(e) => onKelasChange(e.target.value)}
          className="h-8.5 rounded-lg border border-border bg-background text-xs text-foreground px-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
        >
          <option value="all">Semua Kelas</option>
          {kelasOptions.map((k) => <option key={k} value={k}>{k}</option>)}
        </select>

        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="h-8.5 rounded-lg border border-border bg-background text-xs text-foreground px-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
        >
          <option value="date">Terbaru</option>
          <option value="score">Nilai Tertinggi</option>
          <option value="completion">Pengerjaan Terbanyak</option>
        </select>
      </div>
    </div>
  );
}
