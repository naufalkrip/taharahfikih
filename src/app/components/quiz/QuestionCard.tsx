import { motion } from "motion/react";
import { HelpCircle } from "lucide-react";
import { cn } from "../ui/utils";
import type { QuizQuestion } from "../../data/quiz-questions";

interface QuestionCardProps {
  question: QuizQuestion;
  selectedAnswer: number | undefined;
  onAnswer: (index: number) => void;
}

const difficultyLabel: Record<string, { label: string; className: string }> = {
  easy: {
    label: "Mudah",
    className:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  },
  medium: {
    label: "Sedang",
    className:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  },
  hard: {
    label: "Sulit",
    className:
      "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
  },
};

export function QuestionCard({
  question,
  selectedAnswer,
  onAnswer,
}: QuestionCardProps) {
  const diff = difficultyLabel[question.difficulty];

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm"
    >
      <div className="flex items-center justify-between mb-6">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary dark:bg-primary/20">
          <HelpCircle className="w-3.5 h-3.5" />
          {question.category}
        </span>
        <span
          className={cn(
            "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium",
            diff.className
          )}
        >
          {diff.label}
        </span>
      </div>

      <h3 className="text-lg sm:text-xl font-semibold text-foreground leading-relaxed mb-6">
        {question.question}
      </h3>

      <div className="space-y-3">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index;

          return (
            <button
              key={index}
              onClick={() => onAnswer(index)}
              className={cn(
                "w-full text-left p-4 rounded-xl border text-sm sm:text-base transition-all duration-200 flex items-start gap-3",
                isSelected
                  ? "border-primary bg-primary/5 dark:bg-primary/10 ring-1 ring-primary"
                  : "border-border bg-card hover:border-primary/50 hover:bg-muted/30 cursor-pointer"
              )}
            >
              <span
                className={cn(
                  "flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-semibold transition-colors",
                  isSelected
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {String.fromCharCode(65 + index)}
              </span>
              <span className="flex-1 pt-1.5 leading-relaxed text-foreground">
                {option}
              </span>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
