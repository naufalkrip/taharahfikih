import { type ReactNode, type ElementType, useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { BookOpen, Play, Pause } from "lucide-react";
import { cn } from "./ui/utils";
import { useLanguage } from "../contexts/LanguageContext";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function ScrollReveal({ children, className, delay = 0 }: ScrollRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function FadeIn({ children, className, delay = 0 }: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface SectionCardProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function SectionCard({ children, className, id }: SectionCardProps) {
  return (
    <ScrollReveal>
      <div
        id={id}
        className={cn(
          "bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow duration-300",
          className
        )}
      >
        {children}
      </div>
    </ScrollReveal>
  );
}

interface DalilBoxProps {
  arabic: string;
  translation: string;
  source: string;
}

export function DalilBox({ arabic, translation, source }: DalilBoxProps) {
  const { lang } = useLanguage();
  return (
    <ScrollReveal>
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-6 sm:p-8">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-200/20 dark:bg-emerald-700/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-6 bg-emerald-500 rounded-full" />
            <h3 className="text-sm font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              {lang === "en" ? "Quranic Evidence" : "Dalil Al-Qur'an"}
            </h3>
          </div>
          <div className="bg-white/80 dark:bg-card/80 backdrop-blur-sm rounded-xl p-5 sm:p-6 border border-emerald-200/50 dark:border-emerald-700/30">
            <p className="text-right leading-loose text-lg sm:text-xl text-foreground mb-4 font-arabic" dir="rtl">
              {arabic}
            </p>
            <div className="border-t border-emerald-200/50 dark:border-emerald-700/30 pt-4 mt-4">
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed italic">
                "{translation}"
              </p>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-2 font-medium">
                — {source}
              </p>
            </div>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}

interface InfoBoxProps {
  icon: ElementType;
  title: string;
  children: ReactNode;
  variant?: "info" | "warning" | "tip";
}

export function InfoBox({ icon: Icon, title, children, variant = "info" }: InfoBoxProps) {
  const variants = {
    info: {
      bg: "bg-blue-50 dark:bg-blue-950/30",
      border: "border-blue-200 dark:border-blue-800",
      icon: "text-blue-600 dark:text-blue-400",
      badge: "bg-blue-600/10 text-blue-700 dark:text-blue-300",
    },
    warning: {
      bg: "bg-amber-50 dark:bg-amber-950/30",
      border: "border-amber-200 dark:border-amber-800",
      icon: "text-amber-600 dark:text-amber-400",
      badge: "bg-amber-600/10 text-amber-700 dark:text-amber-300",
    },
    tip: {
      bg: "bg-emerald-50 dark:bg-emerald-950/30",
      border: "border-emerald-200 dark:border-emerald-800",
      icon: "text-emerald-600 dark:text-emerald-400",
      badge: "bg-emerald-600/10 text-emerald-700 dark:text-emerald-300",
    },
  };

  const v = variants[variant];

  return (
    <ScrollReveal>
      <div className={`relative overflow-hidden rounded-xl p-5 sm:p-6 border ${v.bg} ${v.border}`}>
        <div className="flex gap-4">
          <div className="flex-shrink-0 mt-0.5">
            <Icon className={`w-5 h-5 ${v.icon}`} />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className={`text-sm font-semibold mb-2 ${v.badge}`}>
              {title}
            </h4>
            <div className="text-muted-foreground text-sm sm:text-base leading-relaxed space-y-1.5">
              {children}
            </div>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}

interface NumberedStepProps {
  number: number;
  title: string;
  description?: string;
  color?: "emerald" | "blue" | "amber";
  children?: ReactNode;
}

export function NumberedStep({ number, title, description, color = "emerald", children }: NumberedStepProps) {
  const colors = {
    emerald: "bg-emerald-600 text-white",
    blue: "bg-blue-600 text-white",
    amber: "bg-amber-600 text-white",
  };

  return (
    <div className="flex gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted/80 transition-colors duration-200">
      <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold ${colors[color]}`}>
        {number}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-foreground mb-0.5">{title}</h4>
        {description && (
          <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        )}
        {children}
      </div>
    </div>
  );
}

interface ChecklistItemProps {
  children: ReactNode;
  color?: "emerald" | "amber" | "red";
}

export function ChecklistItem({ children, color = "emerald" }: ChecklistItemProps) {
  const colors = {
    emerald: "text-emerald-600",
    amber: "text-amber-600",
    red: "text-red-500",
  };

  return (
    <li className="flex items-start gap-3">
      <svg className={`w-5 h-5 flex-shrink-0 mt-0.5 ${colors[color]}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
      </svg>
      <span className="text-sm sm:text-base text-muted-foreground leading-relaxed">{children}</span>
    </li>
  );
}

interface SectionHeaderProps {
  icon?: ElementType;
  title: string;
  description?: string;
  imageSrc?: string;
}

export function SectionHeader({ icon: Icon, title, description, imageSrc }: SectionHeaderProps) {
  return (
    <FadeIn>
      <div className="text-center space-y-4 mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/40 dark:to-teal-900/40 shadow-sm">
          {imageSrc ? (
            <img src={imageSrc} alt={title} className="w-9 h-9 object-contain" />
          ) : Icon ? (
            <Icon className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
          ) : null}
        </div>
        <h1 className="text-foreground">{title}</h1>
        {description && (
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </FadeIn>
  );
}

interface ListWithIconsProps {
  icon: ElementType;
  items: string[];
  color?: "emerald" | "blue" | "amber" | "red";
}

export function ListWithIcons({ icon: Icon, items, color = "emerald" }: ListWithIconsProps) {
  const colors = {
    emerald: "text-emerald-600",
    blue: "text-blue-600",
    amber: "text-amber-600",
    red: "text-red-500",
  };

  return (
    <ul className="space-y-2.5">
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-3">
          <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${colors[color]}`} />
          <span className="text-sm sm:text-base text-muted-foreground leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
}

interface SectionTitleProps {
  children: ReactNode;
  icon?: ElementType;
}

export function SectionTitle({ children, icon: Icon }: SectionTitleProps) {
  return (
    <div className="flex items-center gap-3 mb-5">
      {Icon && <Icon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
      <h2 className="text-foreground">{children}</h2>
    </div>
  );
}

interface KasusKhususProps {
  kasus: {
    icon: ElementType;
    title: string;
    desc: string;
  }[];
  color?: "emerald" | "blue" | "amber" | "red";
}

export function KasusKhususSection({ kasus, color = "emerald" }: KasusKhususProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const borderColors = {
    emerald: "border-emerald-200 dark:border-emerald-700/50",
    blue: "border-blue-200 dark:border-blue-700/50",
    amber: "border-amber-200 dark:border-amber-700/50",
    red: "border-red-200 dark:border-red-700/50",
  };

  const bgColors = {
    emerald: "bg-emerald-50/50 dark:bg-emerald-950/10",
    blue: "bg-blue-50/50 dark:bg-blue-950/10",
    amber: "bg-amber-50/50 dark:bg-amber-950/10",
    red: "bg-red-50/50 dark:bg-red-950/10",
  };

  const iconBgColors = {
    emerald: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400",
    blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
    amber: "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400",
    red: "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400",
  };

  return (
    <div className="space-y-2">
      {kasus.map((item, index) => {
        const Icon = item.icon;
        const isOpen = openIndex === index;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className={`rounded-xl border ${borderColors[color]} overflow-hidden`}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className={`w-full flex items-center gap-3 p-4 sm:p-5 text-left transition-colors ${bgColors[color]} hover:brightness-95`}
            >
              <div className={`flex-shrink-0 w-9 h-9 rounded-lg ${iconBgColors[color]} flex items-center justify-center`}>
                <Icon className="w-4.5 h-4.5" />
              </div>
              <span className="flex-1 text-sm sm:text-base font-semibold text-foreground">
                {item.title}
              </span>
              <motion.svg
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                className="w-4.5 h-4.5 text-muted-foreground flex-shrink-0"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
              </motion.svg>
            </button>
            <motion.div
              initial={false}
              animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="overflow-hidden"
            >
              <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-1">
                <div className="pl-12">
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}

interface RujukanItem {
  title: string;
  titleEn?: string;
  sumber: string;
  sumberEn?: string;
  keterangan: string;
  keteranganEn?: string;
  arabic?: string;
  translation?: string;
  translationEn?: string;
}

export function RujukanSection({ rujukan }: { rujukan: RujukanItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { lang } = useLanguage();

  return (
    <ScrollReveal>
      <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <BookOpen className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <h2 className="text-foreground">{lang === "en" ? "References" : "Daftar Rujukan"}</h2>
        </div>
        <div className="space-y-3">
          {rujukan.map((item, i) => {
            const isOpen = openIndex === i;
            const hasAyat = !!item.arabic && !!item.translation;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className={`w-full flex items-start gap-3 p-4 rounded-xl text-left transition-all border ${isOpen ? "bg-emerald-50/80 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-700/50" : "bg-muted/40 hover:bg-muted/60 border-border/50"}`}
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mt-0.5">
                    <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <h4 className="font-semibold text-foreground text-sm sm:text-base mb-0.5">
                      {lang === "en" && item.titleEn ? item.titleEn : item.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-emerald-600 dark:text-emerald-400 font-medium mb-1">
                      {lang === "en" && item.sumberEn ? item.sumberEn : item.sumber}
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {lang === "en" && item.keteranganEn ? item.keteranganEn : item.keterangan}
                    </p>
                  </div>
                  {hasAyat && (
                    <motion.svg
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                      className="w-4.5 h-4.5 text-muted-foreground flex-shrink-0 mt-2"
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                    </motion.svg>
                  )}
                </button>
                {hasAyat && (
                  <motion.div
                    initial={false}
                    animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 pt-2">
                      <div className="bg-white/80 dark:bg-card/80 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-emerald-200/50 dark:border-emerald-700/30">
                        <p className="text-right leading-loose text-lg sm:text-xl text-foreground mb-3 font-arabic" dir="rtl">
                          {item.arabic}
                        </p>
                        <div className="border-t border-emerald-200/50 dark:border-emerald-700/30 pt-3">
                          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed italic">
                            "{lang === "en" && item.translationEn ? item.translationEn : item.translation}"
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </ScrollReveal>
  );
}

interface NiatInlineProps {
  arabic: string;
  translation: string;
  audioSrc: string;
}

export function NiatInline({ arabic, translation, audioSrc }: NiatInlineProps) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(audioSrc);
      audioRef.current.onended = () => setPlaying(false);
    }

    if (playing) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setPlaying(false);
    } else {
      audioRef.current.play();
      setPlaying(true);
    }
  };

  return (
    <div className="mt-4 pt-4 border-t border-purple-200 dark:border-purple-800">
      <p className="text-center leading-loose text-lg sm:text-xl text-foreground font-arabic" dir="rtl">
        {arabic}
      </p>
      <p className="text-center text-xs sm:text-sm text-muted-foreground italic mt-2">
        "{translation}"
      </p>
      <div className="flex justify-center mt-4">
        <motion.button
          onClick={togglePlay}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          className="relative w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 text-white shadow-md hover:shadow-lg transition-shadow duration-300 flex items-center justify-center"
        >
          <motion.span
            className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-600/30 to-pink-600/30"
            animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          {playing ? (
            <Pause className="w-5 h-5 relative z-10" />
          ) : (
            <Play className="w-5 h-5 ml-0.5 relative z-10" />
          )}
        </motion.button>
      </div>
    </div>
  );
}
