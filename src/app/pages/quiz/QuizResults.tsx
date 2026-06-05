import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link, useSearchParams } from "react-router";
import { ChevronLeft, BrainCircuit } from "lucide-react";
import { motion } from "motion/react";
import { useQuizHistory } from "../../hooks/useQuizHistory";
import { ResultCard } from "../../components/quiz/ResultCard";
import { ShareModal } from "../../components/quiz/ShareModal";
import { ResultCharts } from "../../components/quiz/ResultCharts";
import { QuizHistory } from "../../components/quiz/QuizHistory";

interface ResultState {
  score: number;
  total: number;
  percentage: number;
  topicTitle: string;
  timeSpent: number;
  topic?: string;
  perTopic?: { topic: string; correct: number; total: number; percentage: number }[];
}

export function QuizResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const state = location.state as ResultState | null;
  const { getTopicStats, history, addResult } = useQuizHistory();

  const topicFromUrl = searchParams.get("topic");
  const [currentResult, setCurrentResult] = useState<ResultState | null>(state);
  const [shareOpen, setShareOpen] = useState(false);

  const isAll = topicFromUrl === "all";
  const topicStats = getTopicStats();

  const correct = currentResult?.score ?? 0;
  const total = currentResult?.total ?? 0;
  const percentage = currentResult?.percentage ?? 0;
  const topicTitle = currentResult?.topicTitle ?? "";

  const handleRetry = () => {
    if (topicFromUrl) {
      navigate(`/quiz/${topicFromUrl}`);
    }
  };

  const handleBackToHub = () => {
    navigate("/quiz");
  };

  const handleHistoryRetry = (topic: string) => {
    navigate(`/quiz/${topic}`);
  };

  const handleViewDetail = (attemptId: string) => {
    navigate(`/quiz/review/${attemptId}`);
  };

  if (!currentResult && history.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4 max-w-md mx-auto px-4">
          <BrainCircuit className="w-12 h-12 text-muted-foreground mx-auto opacity-50" />
          <h2 className="text-xl font-bold text-foreground">Belum Ada Hasil Quiz</h2>
          <p className="text-sm text-muted-foreground">
            Selesaikan quiz terlebih dahulu untuk melihat hasil.
          </p>
          <Link
            to="/quiz"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white text-sm font-medium shadow-lg"
          >
            Mulai Quiz
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="space-y-8">
          {/* Back Button */}
          <Link
            to="/quiz"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Kembali ke Quiz
          </Link>

          {/* Results Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-2"
          >
            <h1 className="text-foreground">Hasil Quiz</h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              {topicTitle}
            </p>
          </motion.div>

          {/* Result Card */}
          <div className="max-w-md mx-auto">
            <ResultCard
              score={correct}
              total={total}
              percentage={percentage}
              onRetry={handleRetry}
              onShare={() => setShareOpen(true)}
            />
          </div>

          {/* Per-Topic Chart for "All Materials" */}
          {currentResult?.perTopic && currentResult.perTopic.length > 1 && (
            <ResultCharts
              correct={correct}
              incorrect={total - correct}
              topicStats={currentResult.perTopic.map((t) => ({
                topic: t.topic,
                title:
                  t.topic === "wudhu"
                    ? "Wudhu"
                    : t.topic === "ghusl"
                    ? "Mandi Wajib"
                    : t.topic === "tayammum"
                    ? "Tayammum"
                    : t.topic === "najis"
                    ? "Najis"
                    : t.topic,
                percentage: t.percentage,
              }))}
            />
          )}

          {/* History */}
          <QuizHistory history={history} onRetry={handleHistoryRetry} onViewDetail={handleViewDetail} />
        </div>
      </div>

      {/* Share Modal */}
      {currentResult && (
        <ShareModal
          open={shareOpen}
          onClose={() => setShareOpen(false)}
          result={{
            topicTitle,
            score: correct,
            total,
            percentage,
          }}
          perTopic={currentResult.perTopic}
        />
      )}
    </div>
  );
}
