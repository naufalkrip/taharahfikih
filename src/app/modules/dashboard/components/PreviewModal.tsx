import { Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../../../components/ui/dialog";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { ScrollArea } from "../../../components/ui/scroll-area";

interface PreviewQuestion {
  question: string;
  options: string[];
  difficulty: string;
}

interface PreviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  questions: PreviewQuestion[];
  onGenerate: () => void;
  loading?: boolean;
}

const DIFFICULTY_STYLES: Record<string, string> = {
  easy: "bg-emerald-50 text-emerald-700 border-emerald-200",
  medium: "bg-amber-50 text-amber-700 border-amber-200",
  hard: "bg-red-50 text-red-700 border-red-200",
};

const DIFFICULTY_LABELS: Record<string, string> = {
  easy: "Mudah",
  medium: "Sedang",
  hard: "Sulit",
};

export function PreviewModal({
  open,
  onOpenChange,
  questions,
  onGenerate,
  loading,
}: PreviewModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh] p-0 rounded-3xl gap-0 overflow-hidden">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="text-lg font-semibold font-heading">
            Preview Soal
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            {questions.length} soal akan di-generate dari bank soal berdasarkan
            materi dan level yang dipilih
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1 px-6 py-2 max-h-[55vh]">
          <div className="space-y-2.5 pb-2">
            {questions.map((q, i) => (
              <div
                key={i}
                className="rounded-xl border border-border bg-card p-4 transition-colors hover:bg-muted/30"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-medium text-foreground leading-relaxed">
                    <span className="text-muted-foreground font-semibold mr-2">
                      {String(i + 1).padStart(2, "0")}.
                    </span>
                    {q.question}
                  </p>
                  <Badge
                    variant="outline"
                    className={`shrink-0 text-xs rounded-lg font-medium ${
                      DIFFICULTY_STYLES[q.difficulty] || ""
                    }`}
                  >
                    {DIFFICULTY_LABELS[q.difficulty] || q.difficulty}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <DialogFooter className="flex items-center justify-between p-6 pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground">
            {questions.length} soal
          </p>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="rounded-xl h-11 px-6 text-sm"
            >
              Tutup
            </Button>
            <Button
              onClick={onGenerate}
              disabled={loading}
              className="rounded-xl h-11 px-6 bg-gradient-to-br from-emerald-500 to-teal-600 text-white hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Menyimpan...
                </span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-1.5" />
                  Generate Quiz
                </>
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
