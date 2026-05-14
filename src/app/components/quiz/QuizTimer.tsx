import { Clock } from "lucide-react";
import { useEffect, useState } from "react";

interface QuizTimerProps {
  startTime: number;
  isComplete: boolean;
}

export function QuizTimer({ startTime, isComplete }: QuizTimerProps) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (isComplete) {
      setElapsed(Math.floor((Date.now() - startTime) / 1000));
      return;
    }

    const interval = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, isComplete]);

  const minutes = Math.floor(elapsed / 60);
  const seconds = elapsed % 60;

  return (
    <div className="flex items-center gap-1.5 text-sm text-muted-foreground tabular-nums">
      <Clock className="w-4 h-4" />
      <span>
        {minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}
      </span>
    </div>
  );
}
