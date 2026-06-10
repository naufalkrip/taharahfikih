import { Switch } from "../../../../components/ui/switch";

interface QuizStatusBadgeProps {
  isActive: boolean;
  onToggle?: () => void;
}

export function QuizStatusBadge({ isActive, onToggle }: QuizStatusBadgeProps) {
  return (
    <div className="flex items-center gap-2">
      <Switch
        checked={isActive}
        onCheckedChange={onToggle}
        className="data-[state=checked]:bg-emerald-500 data-[state=unchecked]:bg-slate-300"
      />
      <span
        className={`text-xs font-medium ${
          isActive ? "text-emerald-600" : "text-slate-400"
        }`}
      >
        {isActive ? "Aktif" : "Nonaktif"}
      </span>
    </div>
  );
}
