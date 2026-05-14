import { useState } from "react";
import { X, Check, Copy, ExternalLink, Share2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ShareLinkModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  url: string;
}

const shareLinks = [
  {
    name: "WhatsApp",
    getUrl: (text: string) => `https://wa.me/?text=${encodeURIComponent(text)}`,
    color: "bg-[#25D366] hover:bg-[#1da851]",
  },
  {
    name: "Facebook",
    getUrl: (text: string, link: string) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}&quote=${encodeURIComponent(text)}`,
    color: "bg-[#1877F2] hover:bg-[#166fe5]",
  },
  {
    name: "Twitter / X",
    getUrl: (text: string) => `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,
    color: "bg-slate-800 hover:bg-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600",
  },
  {
    name: "Telegram",
    getUrl: (text: string) => `https://t.me/share/url?url=&text=${encodeURIComponent(text)}`,
    color: "bg-[#0088cc] hover:bg-[#0077b5]",
  },
];

export function ShareLinkModal({ open, onClose, title, url }: ShareLinkModalProps) {
  const [copiedLink, setCopiedLink] = useState(false);

  const fullText = `Quiz ${title} — Hukum Taharah\n${url}\n\nUji pemahaman tentang fikih taharah!`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch {}
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
            className="bg-card border border-border rounded-2xl shadow-xl w-full max-w-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-5 border-b border-border">
              <div className="flex items-center gap-2">
                <Share2 className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-semibold text-foreground">
                  Bagikan {title}
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              {/* Short Link */}
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                  Link Pendek
                </label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 px-3 py-2.5 rounded-xl bg-muted border border-border text-xs sm:text-sm font-mono text-foreground truncate select-all">
                    {url}
                  </div>
                  <button
                    onClick={handleCopyLink}
                    className="flex-shrink-0 p-2.5 rounded-xl border border-border text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
                  >
                    <AnimatePresence mode="wait">
                      {copiedLink ? (
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

              {/* Share Buttons */}
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-2 block">
                  Bagikan ke
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {shareLinks.map((link) => {
                    const isMultiArg = link.name === "Facebook";
                    const href = isMultiArg
                      ? link.getUrl(fullText, url)
                      : link.getUrl(fullText);
                    return (
                      <a
                        key={link.name}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-white text-xs font-medium transition-all ${link.color}`}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        {link.name}
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
