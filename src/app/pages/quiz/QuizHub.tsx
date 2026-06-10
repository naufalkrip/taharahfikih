import { Link } from "react-router";
import { useState } from "react";
import {
  BrainCircuit,
  ArrowRight,
  Trophy,
  Layers,
  Share2,
} from "lucide-react";
import { motion } from "motion/react";
import { useLanguage } from "../../contexts/LanguageContext";
import { ScrollReveal, FadeIn } from "../../components/shared";
import { ShareLinkModal } from "../../components/quiz/ShareLinkModal";
import { topicInfo } from "../../data/quiz-questions";
import { useQuizHistory } from "../../hooks/useQuizHistory";

export function QuizHub() {
  const { t } = useLanguage();
  const { getOverallPercentage, getTopicStats } = useQuizHistory();
  const overall = getOverallPercentage();
  const topicStats = getTopicStats();
  const [shareTopic, setShareTopic] = useState<{ key: string; title: string } | null>(null);

  const topics = Object.entries(topicInfo).map(([key, info]) => {
    const stat = topicStats.find((s) => s.topic === key);
    return {
      key,
      ...info,
      href: `/quiz/${key}`,
      percentage: stat?.percentage,
    };
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="space-y-10">
          {/* Header */}
          <FadeIn>
            <div className="text-center space-y-4">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center justify-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-200/50 dark:shadow-emerald-900/30">
                  <img src="/assets/quiz.png" alt="Quiz" className="w-9 h-9 object-contain" />
                </div>
              </motion.div>
              <h1 className="text-foreground">{t("quiz.title")}</h1>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                {t("quiz.subtitle")}
              </p>
            </div>
          </FadeIn>

          {/* Overall Score */}
          {overall > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative overflow-hidden bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 sm:p-8 text-white shadow-lg"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3" />
              <div className="relative flex items-center gap-5">
                <div className="flex-shrink-0 w-20 h-20 rounded-full bg-white/20 flex items-center justify-center border-2 border-white/30">
                  <span className="text-2xl font-extrabold">{overall}%</span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Trophy className="w-5 h-5" />
                    <h3 className="text-lg font-bold">{t("quiz.overallScore")}</h3>
                  </div>
                  <p className="text-sm text-white/80 leading-relaxed">
                    {t("quiz.overallDesc")}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* All Materials Card */}
          <ScrollReveal>
            <Link
              to="/quiz/all"
              className="group block bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl p-6 sm:p-7 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center gap-5">
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center border border-white/30">
                  <Layers className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-heading text-lg font-bold mb-1">
                    {t("quiz.allMaterial")}
                  </h3>
                  <p className="text-sm text-white/80 leading-relaxed">
                    {t("quiz.allMaterialDesc")}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/60 group-hover:text-white transition-colors">
                  <span>{t("quiz.start")}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </ScrollReveal>

          {/* Topics Grid */}
          <div>
            <ScrollReveal>
              <div className="text-center mb-6">
                <h2 className="text-foreground">{t("quiz.perMaterial")}</h2>
                <p className="text-muted-foreground text-sm sm:text-base mt-2">
                  {t("quiz.perMaterialDesc")}
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {topics.map((topic, index) => {
                return (
                  <ScrollReveal key={topic.key} delay={index * 0.1}>
                    <div className="group block bg-card border border-border rounded-2xl p-6 sm:p-7 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative">
                      <Link to={topic.href} className="block">
                        <div className="flex items-start gap-4">
                          <div
                            className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${topic.gradient} shadow-sm flex items-center justify-center`}
                          >
                            <img src={topic.imageSrc} alt={t("topic." + topic.key)} className="w-7 h-7 object-contain" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-heading text-lg font-bold text-foreground mb-1">
                              {t("topic." + topic.key)}
                            </h3>
                            <div className="flex items-center gap-2">
                              {topic.percentage !== undefined ? (
                                <>
                                  <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                                    {topic.percentage}%
                                  </span>
                                  <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden max-w-[100px]">
                                    <motion.div
                                      initial={{ width: 0 }}
                                      whileInView={{ width: `${topic.percentage}%` }}
                                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
                                    />
                                  </div>
                                </>
                              ) : (
                                <span className="text-xs text-muted-foreground">
                                  {t("quiz.notStarted")}
                                </span>
                              )}
                            </div>
                            <div className="mt-3 flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity">
                              <span>{t("quiz.startQuiz")}</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </div>
                          </div>
                        </div>
                      </Link>
                      <button
                        onClick={() => setShareTopic({ key: topic.key, title: t("topic." + topic.key) })}
                        className="absolute top-3 right-3 p-2 rounded-lg text-muted-foreground/60 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-all opacity-0 group-hover:opacity-100"
                        title={t("quiz.share")}
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {shareTopic && (
        <ShareLinkModal
          open={!!shareTopic}
          onClose={() => setShareTopic(null)}
          title={shareTopic.title}
          url={`${typeof window !== "undefined" ? window.location.origin : ""}/quiz/${shareTopic.key}`}
        />
      )}
    </div>
  );
}
