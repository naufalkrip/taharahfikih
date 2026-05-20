import { useState, useRef } from "react";
import {
  X,
  Check,
  Copy,
  Download,
  ExternalLink,
  Share2,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toPng } from "html-to-image";
import { ShareImageCard } from "./ShareImageCard";
import type { QuizHistoryItem } from "../../hooks/useQuizHistory";

interface ShareModalProps {
  open: boolean;
  onClose: () => void;
  result: {
    topicTitle: string;
    score: number;
    total: number;
    percentage: number;
  };
  perTopic?: { topic: string; correct: number; total: number; percentage: number }[];
}

export function ShareModal({ open, onClose, result, perTopic }: ShareModalProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const shareText = `🏆 Quiz THAVA\n📚 ${result.topicTitle}: ${result.score}/${result.total} (${result.percentage}%)\n🕌 Saya mendapatkan skor ${result.percentage}% pada Quiz THAVA! Coba di: ${typeof window !== "undefined" ? window.location.origin : ""}/quiz`;

  const shareUrl =
    typeof window !== "undefined" ? window.location.origin + "/quiz" : "";

  const links = [
    {
      name: "WhatsApp",
      url: `https://wa.me/?text=${encodeURIComponent(shareText)}`,
      icon: "💬",
      color: "bg-green-500 hover:bg-green-600",
    },
    {
      name: "Instagram",
      action: "download",
      icon: "📸",
      color: "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600",
      note: "Download gambar, lalu upload ke IG Story/Post",
    },
    {
      name: "TikTok",
      action: "download",
      icon: "🎵",
      color: "bg-black hover:bg-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700",
      note: "Download gambar, lalu upload ke TikTok",
    },
    {
      name: "Facebook",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`,
      icon: "👍",
      color: "bg-blue-600 hover:bg-blue-700",
    },
    {
      name: "Twitter / X",
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`,
      icon: "🐦",
      color: "bg-slate-800 hover:bg-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600",
    },
  ];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setDownloading(true);
    try {
      const dataUrl = await toPng(cardRef.current, {
        quality: 1,
        pixelRatio: 2,
      });
      const link = document.createElement("a");
      link.download = `quiz-hukum-taharah-${result.percentage}%.png`;
      link.href = dataUrl;
      link.click();
    } catch {}
    setDownloading(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="bg-card border border-border rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-border">
              <div className="flex items-center gap-2">
                <Share2 className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-semibold text-foreground">
                  Bagikan Hasil
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-5">
              {/* Preview Card */}
              <div className="flex justify-center">
                <div className="rounded-xl overflow-hidden shadow-lg" style={{ maxWidth: 320 }}>
                  <ShareImageCard
                    ref={cardRef}
                    topicTitle={result.topicTitle}
                    score={result.score}
                    total={result.total}
                    percentage={result.percentage}
                    perTopic={perTopic}
                  />
                </div>
              </div>

              {/* Share Buttons */}
              <div className="space-y-2">
                {links.map((link) => (
                  <div key={link.name}>
                    {link.action === "download" ? (
                      <button
                        onClick={handleDownload}
                        disabled={downloading}
                        className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-white text-sm font-medium transition-all duration-200"
                        style={{
                          background:
                            link.name === "Instagram"
                              ? "linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)"
                              : link.name === "TikTok"
                              ? "#000"
                              : undefined,
                        }}
                      >
                        <span className="flex items-center gap-2">
                          <span>{link.icon}</span>
                          <span>{link.name}</span>
                        </span>
                        <Download className="w-4 h-4" />
                      </button>
                    ) : (
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-white text-sm font-medium transition-all duration-200"
                        style={
                          link.name === "WhatsApp"
                            ? { background: "#25D366" }
                            : link.name === "Facebook"
                            ? { background: "#1877F2" }
                            : link.name === "Twitter / X"
                            ? { background: "#1DA1F2" }
                            : undefined
                        }
                      >
                        <span className="flex items-center gap-2">
                          <span>{link.icon}</span>
                          <span>{link.name}</span>
                        </span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    {link.note && (
                      <p className="text-[10px] text-muted-foreground mt-0.5 px-1">
                        {link.note}
                      </p>
                    )}
                  </div>
                ))}

                {/* Copy Text */}
                <button
                  onClick={handleCopy}
                  className="flex items-center justify-between w-full px-4 py-3 rounded-xl border border-border text-foreground text-sm font-medium hover:bg-muted/50 transition-all duration-200"
                >
                  <span className="flex items-center gap-2">
                    <span>📋</span>
                    <span>Salin Teks</span>
                  </span>
                  <AnimatePresence mode="wait">
                    {copied ? (
                      <motion.span
                        key="check"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <Check className="w-4 h-4 text-emerald-500" />
                      </motion.span>
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
