import { Search, RotateCcw } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";

interface FilterValues {
  search: string;
  kelas: string;
  materi: string;
  status: string;
  sort: string;
}

interface QuizFilterBarProps {
  values: FilterValues;
  onChange: (values: FilterValues) => void;
  onReset: () => void;
  kelasOptions: string[];
  materiOptions: string[];
}

export function QuizFilterBar({ values, onChange, onReset, kelasOptions, materiOptions }: QuizFilterBarProps) {
  const update = (key: keyof FilterValues, value: string) => {
    onChange({ ...values, [key]: value });
  };

  const hasFilters = values.search || values.kelas || values.materi || values.status || values.sort;

  return (
    <div className="bg-card border border-border rounded-2xl p-4 shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
      <div className="flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            placeholder="Cari quiz..."
            value={values.search}
            onChange={(e) => update("search", e.target.value)}
            className="w-full pl-9 pr-3 h-9 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
          />
        </div>

        {/* Kelas Filter */}
        <Select value={values.kelas} onValueChange={(v) => update("kelas", v)}>
          <SelectTrigger className="w-[140px] h-9 rounded-xl border-border bg-background text-sm">
            <SelectValue placeholder="Kelas" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Kelas</SelectItem>
            {kelasOptions.map((k) => (
              <SelectItem key={k} value={k}>{k}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Materi Filter */}
        <Select value={values.materi} onValueChange={(v) => update("materi", v)}>
          <SelectTrigger className="w-[150px] h-9 rounded-xl border-border bg-background text-sm">
            <SelectValue placeholder="Materi" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Materi</SelectItem>
            {materiOptions.map((m) => (
              <SelectItem key={m} value={m}>{m}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Status Filter */}
        <Select value={values.status} onValueChange={(v) => update("status", v)}>
          <SelectTrigger className="w-[140px] h-9 rounded-xl border-border bg-background text-sm">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Status</SelectItem>
            <SelectItem value="active">Aktif</SelectItem>
            <SelectItem value="inactive">Nonaktif</SelectItem>
          </SelectContent>
        </Select>

        {/* Sort */}
        <Select value={values.sort} onValueChange={(v) => update("sort", v)}>
          <SelectTrigger className="w-[150px] h-9 rounded-xl border-border bg-background text-sm">
            <SelectValue placeholder="Urutkan" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Terbaru</SelectItem>
            <SelectItem value="oldest">Terlama</SelectItem>
            <SelectItem value="az">A-Z</SelectItem>
            <SelectItem value="za">Z-A</SelectItem>
          </SelectContent>
        </Select>

        {/* Reset */}
        {hasFilters && (
          <button
            onClick={onReset}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        )}
      </div>
    </div>
  );
}
