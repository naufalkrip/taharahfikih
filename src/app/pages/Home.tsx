import { Link } from "react-router";
import {
  Droplets, BookOpen, ArrowRight, BrainCircuit, Sparkles, Star,
  ShieldCheck, GraduationCap, BarChart3, Target, HeartHandshake,
  ChevronDown, ScrollText, RotateCcw, Timer, Zap,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { useLanguage } from "../contexts/LanguageContext";

function useCountUp(end: number, duration = 2) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let start = 0;
          const step = Math.ceil(end / (duration * 60));
          const timer = setInterval(() => {
            start += step;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(start);
            }
          }, 16);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration]);

  return { count, ref };
}

const floatingShapes = [
  { size: "w-64 h-64", color: "bg-emerald-300/20 dark:bg-emerald-500/10", x: "10%", y: "15%", delay: 0 },
  { size: "w-48 h-48", color: "bg-teal-300/20 dark:bg-teal-500/10", x: "75%", y: "10%", delay: 1.5 },
  { size: "w-56 h-56", color: "bg-emerald-200/15 dark:bg-emerald-400/8", x: "85%", y: "60%", delay: 3 },
  { size: "w-40 h-40", color: "bg-teal-200/15 dark:bg-teal-400/8", x: "5%", y: "70%", delay: 2 },
  { size: "w-32 h-32", color: "bg-emerald-100/20 dark:bg-emerald-300/8", x: "50%", y: "5%", delay: 4 },
];

function FloatingBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      {floatingShapes.map((shape, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full ${shape.size} ${shape.color} blur-3xl`}
          style={{ left: shape.x, top: shape.y }}
          animate={{
            y: [0, -30, 0, 20, 0],
            x: [0, 15, -10, 5, 0],
            scale: [1, 1.05, 0.95, 1.02, 1],
          }}
          transition={{
            duration: 12 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: shape.delay,
          }}
        />
      ))}
    </div>
  );
}

function FloatingIcons() {
  const icons = [
    { Icon: Droplets, x: "15%", y: "20%", color: "text-emerald-400", size: "w-6 h-6", delay: 0 },
    { Icon: Star, x: "80%", y: "25%", color: "text-amber-400", size: "w-5 h-5", delay: 1 },
    { Icon: Sparkles, x: "70%", y: "70%", color: "text-blue-400", size: "w-5 h-5", delay: 2 },
    { Icon: BookOpen, x: "20%", y: "75%", color: "text-teal-400", size: "w-6 h-6", delay: 0.5 },
    { Icon: ShieldCheck, x: "90%", y: "45%", color: "text-emerald-400", size: "w-4 h-4", delay: 3 },
    { Icon: Target, x: "8%", y: "50%", color: "text-rose-400", size: "w-5 h-5", delay: 1.5 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none hidden sm:block">
      {icons.map(({ Icon, x, y, color, size, delay }, i) => (
        <motion.div
          key={i}
          className={`absolute ${color}`}
          style={{ left: x, top: y }}
          animate={{ y: [0, -12, 0, 8, 0], rotate: [0, 5, -5, 3, 0] }}
          transition={{
            duration: 6 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay,
          }}
        >
          <Icon className={size} />
        </motion.div>
      ))}
    </div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-xs font-semibold border border-emerald-200 dark:border-emerald-700/50 shadow-sm"
    >
      <Sparkles className="w-3.5 h-3.5" />
      {children}
    </motion.div>
  );
}

function HeroStats() {
  const { lang } = useLanguage();
  const stats = [
    { label: "Materi Lengkap", labelEn: "Complete Materials", value: "100+" },
    { label: "Quiz Interaktif", labelEn: "Interactive Quizzes", value: "500+" },
    { label: "Belajar Gratis", labelEn: "Free Learning", value: "100%" },
    { label: "Rating", labelEn: "Rating", value: "4.9" },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-3 sm:gap-3 mt-5">
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/70 dark:bg-white/5 backdrop-blur-md border border-emerald-200/50 dark:border-emerald-700/30 shadow-sm"
        >
          <span className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">{stat.value}</span>
          <span className="text-[11px] font-medium text-muted-foreground">{lang === "en" ? stat.labelEn : stat.label}</span>
        </motion.div>
      ))}
    </div>
  );
}

function ScrollIndicator() {
  const { lang } = useLanguage();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2 }}
      className="flex flex-col items-center gap-1 mt-5 text-muted-foreground/60"
    >
      <span className="text-[10px] font-medium tracking-widest uppercase">{lang === "en" ? "Scroll" : "Scroll"}</span>
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="w-4 h-4" />
      </motion.div>
    </motion.div>
  );
}

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

function SectionHeader({ badge, title, description, center = true }: {
  badge?: string; title: string; description?: string; center?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={center ? "text-center mb-6 sm:mb-8 lg:mb-10" : "mb-6 sm:mb-8"}
    >
      {badge && (
        <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-xs font-semibold mb-2 border border-emerald-200 dark:border-emerald-700/50">
          {badge}
        </span>
      )}
      <h2 className="text-foreground">{title}</h2>
      {description && (
        <p className="mt-2 text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
}

function GlassCard({ children, className = "", delay = 0 }: {
  children: React.ReactNode; className?: string; delay?: number;
}) {
  return (
    <motion.div
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={delay}
      className={`bg-white/70 dark:bg-white/[0.04] backdrop-blur-xl border border-emerald-100/50 dark:border-emerald-800/30 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 ${className}`}
    >
      {children}
    </motion.div>
  );
}

function WhySection() {
  const { lang } = useLanguage();
  const items = [
    {
      icon: HeartHandshake,
      title: "Syarat Sah Ibadah",
      titleEn: "Valid Worship Requirement",
      desc: "Bersuci adalah syarat sah shalat dan ibadah lainnya. Tanpa thaharah yang benar, ibadah seorang muslim tidak sah menurut syariat.",
      descEn: "Purification is a prerequisite for valid prayer and other worship. Without proper thaharah, a Muslim's worship is invalid.",
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      icon: ScrollText,
      title: "Dalil Al-Qur'an & Hadits",
      titleEn: "Quran & Hadith Evidence",
      desc: "Thaharah memiliki dasar yang kuat dalam Al-Qur'an dan Hadits. Allah memerintahkan bersuci dalam Surah Al-Maidah ayat 6.",
      descEn: "Thaharah has strong foundations in the Quran and Hadith. Allah commands purification in Surah Al-Maidah verse 6.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: GraduationCap,
      title: "Dasar Pemahaman Fikih",
      titleEn: "Foundation of Fiqh",
      desc: "Bab thaharah adalah pintu gerbang mempelajari fikih Islam. Menguasainya memudahkan Anda memahami bab-bab fikih selanjutnya.",
      descEn: "The chapter on thaharah is the gateway to studying Islamic fiqh. Mastering it makes understanding subsequent fiqh chapters easier.",
      gradient: "from-amber-500 to-orange-500",
    },
    {
      icon: Star,
      title: "Kesempurnaan Ibadah",
      titleEn: "Perfection of Worship",
      desc: "Dengan memahami thaharah dengan baik, ibadah Anda menjadi lebih sempurna dan khusyuk karena terbebas dari keraguan.",
      descEn: "By understanding thaharah well, your worship becomes more perfect and focused, free from doubt.",
      gradient: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <section className="relative">
      <SectionHeader
        badge={lang === "en" ? "Why is it Important?" : "Mengapa Penting?"}
        title={lang === "en" ? "Why Learn Taharah?" : "Kenapa Belajar Taharah?"}
        description={lang === "en" ? "Thaharah (purification) is the key to worship. Here is why you need to study it." : "Thaharah adalah kunci utama dalam beribadah. Berikut alasan mengapa Anda perlu mempelajarinya."}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {items.map((item, i) => {
          const Icon = item.icon;
          return (
            <GlassCard key={i} delay={i * 0.1} className="p-4 sm:p-5">
              <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br ${item.gradient} shadow-sm mb-2.5`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-heading font-bold text-foreground text-sm sm:text-base mb-1.5">{lang === "en" ? item.titleEn : item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{lang === "en" ? item.descEn : item.desc}</p>
            </GlassCard>
          );
        })}
      </div>
    </section>
  );
}

function TopicsSection() {
  const { lang } = useLanguage();
  const topics = [
    {
      title: "Wudhu",
      titleEn: "Wudhu",
      key: "nav.wudhu",
      lessons: "12",
      duration: "45 min",
      imageSrc: "/assets/wudhu.png",
      gradient: "from-emerald-500 to-teal-500",
      bgLight: "bg-emerald-50 dark:bg-emerald-950/30",
      borderHover: "group-hover:border-emerald-300 dark:group-hover:border-emerald-700",
      href: "/wudhu",
      desc: "Pelajari tata cara berwudhu, syarat, rukun, dan hal-hal yang membatalkan wudhu.",
      descEn: "Learn the procedures, conditions, pillars, and nullifiers of ablution.",
    },
    {
      title: "Mandi Wajib",
      titleEn: "Full Ablution (Ghusl)",
      key: "nav.mandi-wajib",
      lessons: "10",
      duration: "40 min",
      imageSrc: "/assets/mandi.png",
      gradient: "from-blue-500 to-cyan-500",
      bgLight: "bg-blue-50 dark:bg-blue-950/30",
      borderHover: "group-hover:border-blue-300 dark:group-hover:border-blue-700",
      href: "/ghusl",
      desc: "Memahami hukum, tata cara, dan hal-hal yang mewajibkan mandi (ghusl).",
      descEn: "Understand the rulings, procedures, and obligations of full ablution (ghusl).",
    },
    {
      title: "Tayammum",
      titleEn: "Tayammum",
      key: "nav.tayammum",
      lessons: "8",
      duration: "35 min",
      imageSrc: "/assets/tayamum.png",
      gradient: "from-amber-500 to-orange-500",
      bgLight: "bg-amber-50 dark:bg-amber-950/30",
      borderHover: "group-hover:border-amber-300 dark:group-hover:border-amber-700",
      href: "/tayammum",
      desc: "Bersuci dengan debu sebagai pengganti air dalam kondisi tertentu.",
      descEn: "Dry purification with dust as a substitute for water in certain conditions.",
    },
    {
      title: "Najis & Bersuci",
      titleEn: "Impurity & Purification",
      key: "nav.najis",
      lessons: "10",
      duration: "40 min",
      imageSrc: "/assets/najis.png",
      gradient: "from-red-500 to-rose-500",
      bgLight: "bg-red-50 dark:bg-red-950/30",
      borderHover: "group-hover:border-red-300 dark:group-hover:border-red-700",
      href: "/najis",
      desc: "Mengenal jenis-jenis najis dan cara mensucikannya menurut syariat Islam.",
      descEn: "Learn the types of impurities and how to purify them according to Islamic law.",
    },
  ];

  return (
    <section className="relative">
      <SectionHeader
        badge={lang === "en" ? "Learning Materials" : "Materi Belajar"}
        title={lang === "en" ? "Choose Your Topic" : "Pilih Materi Pembelajaran"}
        description={lang === "en" ? "Each topic includes evidence, procedures, and complete explanations." : "Setiap materi dilengkapi dengan dalil, tata cara, dan penjelasan lengkap."}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        {topics.map((topic, index) => {
          return (
            <motion.div
              key={topic.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                to={topic.href}
                className={`group block bg-white/80 dark:bg-white/[0.04] backdrop-blur-xl border border-emerald-100/50 dark:border-emerald-800/30 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-400 hover:-translate-y-1.5 ${topic.borderHover}`}
              >
                <div className="relative h-28 sm:h-32 bg-gradient-to-br from-muted to-background flex items-center justify-center overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${topic.gradient} opacity-[0.08] dark:opacity-[0.12]`} />
                  <motion.img
                    src={topic.imageSrc}
                    alt={topic.title}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-contain relative z-10"
                    whileHover={{ scale: 1.1, rotate: -3 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  />
                  <div className="absolute top-3 right-3 z-10">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-semibold ${topic.bgLight} text-foreground border border-border/50 backdrop-blur-sm`}>
                      {topic.lessons} {lang === "en" ? "Modules" : "Modul"}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <h3 className="font-heading text-base sm:text-lg font-bold text-foreground group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
                      {lang === "en" ? topic.titleEn : topic.title}
                    </h3>
                    <Timer className="w-3.5 h-3.5 text-muted-foreground/60" />
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                    {lang === "en" ? topic.descEn : topic.desc}
                  </p>
                  <div className="mt-3 flex items-center gap-2.5">
                    <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500"
                        initial={{ width: 0 }}
                        whileInView={{ width: "0%" }}
                        viewport={{ once: true }}
                      />
                    </div>
                    <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                      {lang === "en" ? "Start Learning" : "Mulai Belajar"}
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

function FeaturesSection() {
  const { lang } = useLanguage();
  const features = [
    {
      icon: BrainCircuit,
      title: "Quiz Interaktif",
      titleEn: "Interactive Quiz",
      desc: "Uji pemahaman dengan quiz berbasis AI yang memberikan skor dan analisis hasil belajar.",
      descEn: "Test your understanding with AI-based quizzes that provide scores and learning analytics.",
      gradient: "from-violet-500 to-purple-500",
      delay: 0,
    },
    {
      icon: BookOpen,
      title: "Materi Lengkap",
      titleEn: "Complete Materials",
      desc: "Materi disusun dari dalil, pengertian, syarat, rukun, hingga hal-hal yang membatalkan.",
      descEn: "Materials arranged from evidence, definitions, conditions, pillars, to nullifiers.",
      gradient: "from-emerald-500 to-teal-500",
      delay: 0.1,
    },
    {
      icon: BarChart3,
      title: "Dashboard Belajar",
      titleEn: "Learning Dashboard",
      desc: "Pantau progres belajar dan hasil quiz melalui dashboard yang informatif.",
      descEn: "Track your learning progress and quiz results through an informative dashboard.",
      gradient: "from-blue-500 to-cyan-500",
      delay: 0.2,
    },
    {
      icon: RotateCcw,
      title: "Akses Selamanya",
      titleEn: "Lifetime Access",
      desc: "Belajar kapan saja, di mana saja. Materi dapat diakses gratis tanpa batas.",
      descEn: "Learn anytime, anywhere. Materials are accessible for free without limits.",
      gradient: "from-amber-500 to-orange-500",
      delay: 0.3,
    },
    {
      icon: ShieldCheck,
      title: "Rujukan Terpercaya",
      titleEn: "Trusted References",
      desc: "Bersumber dari kitab fikih yang diakui dan digunakan di pesantren & universitas.",
      descEn: "Sourced from recognized fiqh books used in Islamic schools and universities.",
      gradient: "from-rose-500 to-pink-500",
      delay: 0.4,
    },
    {
      icon: Zap,
      title: "Responsif & Cepat",
      titleEn: "Fast & Responsive",
      desc: "Tampilan modern yang responsif di semua perangkat dengan loading super cepat.",
      descEn: "Modern responsive design on all devices with blazing-fast loading.",
      gradient: "from-sky-500 to-indigo-500",
      delay: 0.5,
    },
  ];

  return (
    <section className="relative">
      <SectionHeader
        badge={lang === "en" ? "Features" : "Fitur"}
        title={lang === "en" ? "Platform Features" : "Fitur Platform"}
        description={lang === "en" ? "Enjoy an interactive and fun learning experience." : "Nikmati pengalaman belajar yang interaktif dan menyenangkan."}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {features.map((feat, i) => {
          const Icon = feat.icon;
          return (
            <GlassCard key={i} delay={feat.delay} className="p-4 sm:p-5">
              <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br ${feat.gradient} shadow-sm mb-2.5`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-heading font-bold text-foreground text-sm sm:text-base mb-1.5">{lang === "en" ? feat.titleEn : feat.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{lang === "en" ? feat.descEn : feat.desc}</p>
            </GlassCard>
          );
        })}
      </div>
    </section>
  );
}

function HowToLearnSection() {
  const { lang } = useLanguage();
  const steps = [
    { num: "01", icon: BookOpen, title: "Pilih Materi", titleEn: "Choose Material", desc: "Pilih topik thaharah yang ingin dipelajari dari 4 materi utama.", descEn: "Choose the thaharah topic you want to study from 4 main subjects." },
    { num: "02", icon: GraduationCap, title: "Pelajari", titleEn: "Study", desc: "Baca dan pahami materi lengkap dengan dalil dan penjelasan.", descEn: "Read and understand complete materials with evidence and explanations." },
    { num: "03", icon: BrainCircuit, title: "Uji Pemahaman", titleEn: "Test Yourself", desc: "Kerjakan quiz interaktif untuk mengukur pemahaman Anda.", descEn: "Take interactive quizzes to measure your understanding." },
    { num: "04", icon: BarChart3, title: "Evaluasi", titleEn: "Evaluate", desc: "Lihat hasil dan analisis untuk mengetahui area yang perlu ditingkatkan.", descEn: "View results and analysis to identify areas needing improvement." },
  ];

  return (
    <section className="relative">
      <SectionHeader
        badge={lang === "en" ? "Guide" : "Panduan"}
        title={lang === "en" ? "How to Learn" : "Cara Belajar"}
        description={lang === "en" ? "Follow these easy steps to start your thaharah learning journey." : "Ikuti langkah mudah berikut untuk memulai perjalanan belajar thaharah."}
      />
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative text-center p-4"
            >
              <div className="text-4xl sm:text-5xl font-heading font-black text-emerald-200 dark:text-emerald-800/40 leading-none mb-2">
                {step.num}
              </div>
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-sm mb-2">
                <Icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-heading font-bold text-foreground text-sm sm:text-base mb-1">{lang === "en" ? step.titleEn : step.title}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{lang === "en" ? step.descEn : step.desc}</p>
              {i < steps.length - 1 && (
                <div className="hidden sm:block absolute top-8 right-[-8px] text-emerald-300 dark:text-emerald-700">
                  <ArrowRight className="w-5 h-5" />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

function StatsSection() {
  const { lang } = useLanguage();
  const stats = [
    { value: 100, suffix: "+", label: "Materi Pembelajaran", labelEn: "Learning Materials", icon: BookOpen },
    { value: 500, suffix: "+", label: "Quiz Tersedia", labelEn: "Available Quizzes", icon: BrainCircuit },
    { value: 100, suffix: "%", label: "Gratis & Akses Terbuka", labelEn: "Free & Open Access", icon: HeartHandshake },
    { value: 4.9, suffix: "", label: "Rating Kepuasan", labelEn: "Satisfaction Rating", icon: Star },
  ];

  return (
    <section className="relative">
      <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-lg overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.15),transparent_60%)]" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/3 translate-x-1/4 blur-2xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/3 -translate-x-1/4 blur-2xl" />
        <div className="relative z-10">
          <SectionHeader
            badge={lang === "en" ? "Platform" : "Platform"}
            title={lang === "en" ? "Platform Statistics" : "Statistik Platform"}
            description={lang === "en" ? "Join thousands of learners who have used this platform." : "Bergabung dengan ribuan pelajar yang telah menggunakan platform ini."}
          />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              const { count, ref } = useCountUp(stat.value);
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-white/15 backdrop-blur-sm border border-white/20 mb-2">
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white">
                    <span ref={ref}>{count}</span>{stat.suffix}
                  </div>
                  <div className="text-xs sm:text-sm text-white/80 mt-1 font-medium">{lang === "en" ? stat.labelEn : stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function QuizCtaSection() {
  const { lang } = useLanguage();
  return (
    <section className="relative">
      <GlassCard delay={0} className="p-5 sm:p-6 lg:p-8 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 dark:from-emerald-500/10 dark:to-teal-500/5" />
        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-200/20 dark:bg-emerald-500/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-xl" />
        <div className="relative flex flex-col sm:flex-row items-center gap-5">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg"
          >
            <BrainCircuit className="w-7 h-7 text-white" />
          </motion.div>
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-lg sm:text-xl font-bold text-foreground mb-1">
              {lang === "en" ? "Test Your Understanding" : "Uji Pemahaman Anda"}
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-lg">
              {lang === "en" ? "Take interactive quizzes to measure your understanding of thaharah fiqh. Get scores and see your learning results!" : "Ikuti quiz interaktif untuk mengukur pemahaman Anda tentang fikih taharah. Dapatkan skor dan lihat hasil belajar Anda!"}
            </p>
          </div>
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Link
              to="/quiz"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-medium text-sm shadow-lg hover:shadow-xl transition-all duration-200"
            >
              {lang === "en" ? "Start Quiz" : "Mulai Quiz"}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </GlassCard>
    </section>
  );
}

export function Home() {
  const { lang } = useLanguage();
  return (
    <div className="space-y-14 sm:space-y-16 lg:space-y-20 pb-12 sm:pb-16 relative">
      <FloatingBackground />

      {/* Hero Section */}
      <section className="relative pt-8 sm:pt-12 lg:pt-16 text-center">
        <FloatingIcons />

        <div className="relative z-10 max-w-4xl mx-auto">
          <Badge>{lang === "en" ? "Modern Islamic Learning Platform" : "Platform Pembelajaran Islam Modern"}</Badge>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="font-heading text-4xl sm:text-5xl lg:text-7xl font-extrabold text-foreground tracking-tight mt-4 leading-[1.05]"
          >
            {lang === "en" ? "Learn" : "Belajar"}{" "}
            <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-400 dark:from-emerald-400 dark:via-teal-300 dark:to-emerald-300 bg-clip-text text-transparent">
              Thaharah
            </span>
            <br />
            <span className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-muted-foreground/80">
              {lang === "en" ? "with Ease & Fun" : "dengan Mudah & Menyenangkan"}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mt-3"
          >
            {lang === "en" ? "An interactive fiqh thaharah learning platform. Learn the procedures of purification complete with evidence, quizzes, and a learning progress dashboard." : "Platform pembelajaran fikih thaharah interaktif. Pelajari tata cara bersuci lengkap dengan dalil, quiz, dan dashboard progres belajar."}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="flex flex-wrap items-center justify-center gap-3 mt-5"
          >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/wudhu"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold text-sm shadow-lg shadow-emerald-200/50 dark:shadow-emerald-900/30 transition-all duration-200 hover:shadow-xl"
              >
                {lang === "en" ? "Start Learning Now" : "Mulai Belajar Sekarang"}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
            <Link
              to="/quiz"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/80 dark:bg-white/10 backdrop-blur-sm border border-emerald-200 dark:border-emerald-700/50 text-foreground font-medium text-sm hover:bg-white dark:hover:bg-white/20 transition-all duration-200 shadow-sm"
            >
              <BrainCircuit className="w-4 h-4" />
              {lang === "en" ? "Try Quiz" : "Coba Quiz"}
            </Link>
          </motion.div>

          <HeroStats />
          <ScrollIndicator />
        </div>
      </section>

      {/* Kenapa Belajar Taharah Penting */}
      <WhySection />

      {/* Materi Pembelajaran */}
      <TopicsSection />

      {/* Fitur Platform */}
      <FeaturesSection />

      {/* Cara Belajar */}
      <HowToLearnSection />

      {/* Statistik Platform */}
      <StatsSection />

      {/* Quiz CTA */}
      <QuizCtaSection />

      {/* Note */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-amber-50/70 dark:bg-amber-950/20 backdrop-blur-sm border border-amber-200/50 dark:border-amber-800/50 rounded-xl p-4 sm:p-5"
      >
        <div className="flex gap-3">
          <div className="w-2 h-2 rounded-full bg-amber-500 flex-shrink-0 mt-2" />
          <p className="text-xs sm:text-sm text-amber-800 dark:text-amber-200 leading-relaxed">
            <strong>{lang === "en" ? "Note:" : "Catatan:"}</strong>{" "}
            {lang === "en" ? "These materials are compiled based on widely used fiqh references. For further study, it is recommended to consult with trusted scholars or teachers in your community." : "Materi ini disusun berdasarkan rujukan fikih yang umum digunakan. Untuk pendalaman lebih lanjut, disarankan untuk berkonsultasi dengan ulama atau ustadz terpercaya di lingkungan Anda."}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
