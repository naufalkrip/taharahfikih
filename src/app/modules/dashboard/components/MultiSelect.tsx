import { useState, useRef, useEffect } from "react";
import { Check, ChevronsUpDown, X, Search } from "lucide-react";
import { cn } from "../../../components/ui/utils";
import { Badge } from "../../../components/ui/badge";

interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options: Option[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
}

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Pilih...",
  searchPlaceholder = "Cari...",
  emptyText = "Tidak ada data.",
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = search
    ? options.filter((o) =>
        o.label.toLowerCase().includes(search.toLowerCase())
      )
    : options;

  const toggleOption = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  const removeOption = (value: string) => {
    onChange(selected.filter((v) => v !== value));
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          "h-[52px] w-full flex items-center justify-between rounded-[14px] border bg-input-background px-4 text-sm transition-all duration-200",
          "hover:bg-input-background focus-visible:outline-none focus-visible:border-emerald-500 focus-visible:ring-4 focus-visible:ring-emerald-500/15",
          open && "border-emerald-500 ring-4 ring-emerald-500/15",
          selected.length === 0 ? "text-muted-foreground" : "text-foreground"
        )}
      >
        <span className="truncate">
          {selected.length > 0
            ? `${selected.length} materi dipilih`
            : placeholder}
        </span>
        <ChevronsUpDown
          className={cn(
            "ml-2 h-4 w-4 shrink-0 opacity-50 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>

      {/* Selected Chips */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-2">
          {selected.map((value) => {
            const option = options.find((o) => o.value === value);
            return (
              <Badge
                key={value}
                variant="secondary"
                className="h-7 gap-1 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 text-xs font-medium transition-colors"
              >
                {option?.label || value}
                <button
                  type="button"
                  onClick={() => removeOption(value)}
                  className="ml-0.5 rounded-full p-0.5 hover:bg-emerald-200/60 transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            );
          })}
        </div>
      )}

      {/* Dropdown */}
      {open && (
        <div className="absolute z-50 mt-2 w-full min-w-[260px] bg-popover border border-border rounded-2xl shadow-lg overflow-hidden animate-in fade-in-0 zoom-in-95">
          {/* Search */}
          <div className="flex items-center gap-2 px-3 py-2.5 border-b border-border">
            <Search className="h-4 w-4 text-muted-foreground shrink-0" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={searchPlaceholder}
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
              autoFocus
            />
          </div>

          {/* Options */}
          <div className="max-h-[260px] overflow-y-auto py-1">
            {filtered.length === 0 ? (
              <div className="py-6 text-center text-sm text-muted-foreground">
                {emptyText}
              </div>
            ) : (
              filtered.map((option) => {
                const isSelected = selected.includes(option.value);
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => toggleOption(option.value)}
                    className={cn(
                      "flex items-center gap-3 w-full px-3 py-3 text-sm text-left transition-colors",
                      "hover:bg-emerald-50/60",
                      isSelected && "bg-emerald-50/40"
                    )}
                  >
                    <div
                      className={cn(
                        "flex h-5 w-5 items-center justify-center rounded-md border-2 transition-colors shrink-0",
                        isSelected
                          ? "border-emerald-500 bg-emerald-500 text-white"
                          : "border-slate-300"
                      )}
                    >
                      {isSelected && <Check className="h-3.5 w-3.5" />}
                    </div>
                    <span className={cn(isSelected && "font-medium text-emerald-700")}>
                      {option.label}
                    </span>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
