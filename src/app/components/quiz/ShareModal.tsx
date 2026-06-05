import { useState, useRef, useEffect } from "react";
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [scale, setScale] = useState(1);

  const shareText = `🏆 Quiz THAVA\n📚 ${result.topicTitle}: ${result.score}/${result.total} (${result.percentage}%)\n🕌 Saya mendapatkan skor ${result.percentage}% pada Quiz THAVA! Coba di: ${typeof window !== "undefined" ? window.location.origin : ""}/quiz`;

  const shareUrl =
    typeof window !== "undefined" ? window.location.origin + "/quiz" : "";

  const links = [
    {
      name: "WhatsApp",
      url: `https://wa.me/?text=${encodeURIComponent(shareText)}`,
      icon: "💬",
    },
    {
      name: "Instagram",
      action: "download",
      icon: "📸",
      note: "Download gambar, lalu upload ke IG Story/Post",
    },
    {
      name: "TikTok",
      action: "download",
      icon: "🎵",
      note: "Download gambar, lalu upload ke TikTok",
    },
    {
      name: "Facebook",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`,
      icon: "👍",
    },
    {
      name: "Twitter / X",
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`,
      icon: "🐦",
    },
  ];

  const linkStyles: Record<string, { background: string; hover: string }> = {
    WhatsApp: {
      background: "#25D366",
      hover: "hover:brightness-110",
    },
    Instagram: {
      background: "linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)",
      hover: "hover:opacity-90",
    },
    TikTok: {
      background: "#000",
      hover: "hover:opacity-80 dark:hover:opacity-90",
    },
    Facebook: {
      background: "#1877F2",
      hover: "hover:brightness-110",
    },
    "Twitter / X": {
      background: "#1DA1F2",
      hover: "hover:brightness-110",
    },
  };

  useEffect(() => {
    if (!open) {
      setScale(1);
      return;
    }

    const measure = () => {
      const container = containerRef.current;
      const card = cardRef.current;
      if (!container || !card) return;

      const cw = container.clientWidth;
      const ch = container.clientHeight;
      const nw = card.scrollWidth;
      const nh = card.scrollHeight;

      if (nw === 0 || nh === 0) return;

      const s = Math.min(1, cw / nw, ch / nh);
      setScale(Math.max(0.35, Math.round(s * 100) / 100));
    };

    requestAnimationFrame(measure);

    const observer = new ResizeObserver(measure);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, [open]);

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

    const card = cardRef.current;
    const originalTransform = card.style.transform;
    card.style.transform = "none";
    await new Promise((r) => setTimeout(r, 50));

    try {
      const dataUrl = await toPng(card, {
        quality: 1,
        pixelRatio: 2,
      });
      const link = document.createElement("a");
      link.download = `quiz-hukum-taharah-${result.percentage}%.png`;
      link.href = dataUrl;
      link.click();
    } catch {}

    card.style.transform = originalTransform;
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
            className="bg-card border border-border rounded-2xl shadow-xl w-full max-w-sm sm:max-w-md flex flex-col h-[90vh] max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-5 border-b border-border flex-shrink-0">
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

            <div
              ref={containerRef}
              className="flex-1 min-h-0 flex items-center justify-center overflow-hidden px-5 py-4"
            >
              <div
                style={{
                  transform: `scale(${scale})`,
                  transformOrigin: "center center",
                  flexShrink: 0,
                }}
              >
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

            <div className="flex-shrink-0 px-5 pb-5 pt-3 space-y-2 border-t border-border overflow-y-auto">
              {links.map((link) => {
                const style = linkStyles[link.name];
                return (
                  <div key={link.name}>
                    {link.action === "download" ? (
                      <button
                        onClick={handleDownload}
                        disabled={downloading}
                        className={`flex items-center justify-between w-full px-4 py-3 rounded-xl text-white text-sm font-medium transition-all duration-200 ${style?.hover ?? ""}`}
                        style={{ background: style?.background }}
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
                        className={`flex items-center justify-between w-full px-4 py-3 rounded-xl text-white text-sm font-medium transition-all duration-200 ${style?.hover ?? ""}`}
                        style={{ background: style?.background }}
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
                );
              })}

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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
