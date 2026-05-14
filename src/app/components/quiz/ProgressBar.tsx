import * as ProgressPrimitive from "@radix-ui/react-progress";
import { motion } from "motion/react";

interface ProgressBarProps {
  current: number;
  total: number;
  answeredCount: number;
}

export function ProgressBar({ current, total, answeredCount }: ProgressBarProps) {
  const progress = total > 0 ? ((current) / total) * 100 : 0;

  return (
    <div className="flex items-center gap-4">
      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        />
      </div>
      <span className="text-xs sm:text-sm font-medium text-muted-foreground whitespace-nowrap tabular-nums">
        {current}/{total}
      </span>
    </div>
  );
}
