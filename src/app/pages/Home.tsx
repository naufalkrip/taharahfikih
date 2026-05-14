import { Link } from "react-router";
import { Droplets, BookOpen, ArrowRight, BrainCircuit } from "lucide-react";
import { motion } from "motion/react";
import { ScrollReveal, FadeIn } from "../components/shared";

export function Home() {
  const topics = [
    {
      title: "Wudhu",
      description: "Pelajari tata cara berwudhu, syarat, rukun, dan hal-hal yang membatalkan wudhu.",
      imageSrc: "/assets/wudhu.png",
      gradient: "from-blue-500 to-cyan-500",
      bgLight: "bg-blue-50 dark:bg-blue-950/30",
      borderHover: "group-hover:border-blue-300 dark:group-hover:border-blue-700",
      href: "/wudhu",
    },
    {
      title: "Mandi Wajib",
      description: "Memahami hukum, tata cara, dan hal-hal yang mewajibkan mandi (ghusl).",
      imageSrc: "/assets/mandi.png",
      gradient: "from-emerald-500 to-teal-500",
      bgLight: "bg-emerald-50 dark:bg-emerald-950/30",
      borderHover: "group-hover:border-emerald-300 dark:group-hover:border-emerald-700",
      href: "/ghusl",
    },
    {
      title: "Tayammum",
      description: "Bersuci dengan debu sebagai pengganti air dalam kondisi tertentu.",
      imageSrc: "/assets/tayamum.png",
      gradient: "from-amber-500 to-orange-500",
      bgLight: "bg-amber-50 dark:bg-amber-950/30",
      borderHover: "group-hover:border-amber-300 dark:group-hover:border-amber-700",
      href: "/tayammum",
    },
    {
      title: "Najis & Bersuci",
      description: "Mengenal jenis-jenis najis dan cara mensucikannya menurut syariat Islam.",
      imageSrc: "/assets/najis.png",
      gradient: "from-red-500 to-rose-500",
      bgLight: "bg-red-50 dark:bg-red-950/30",
      borderHover: "group-hover:border-red-300 dark:group-hover:border-red-700",
      href: "/najis",
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-20">
      {/* Hero Section */}
      <FadeIn>
        <div className="text-center space-y-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="inline-flex items-center justify-center"
          >
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-200/50 dark:shadow-emerald-900/30">
                <Droplets className="w-10 h-10 text-white" />
              </div>
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center shadow-sm"
              >
                <BookOpen className="w-3.5 h-3.5 text-white" />
              </motion.div>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight"
          >
            Hukum{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-300 bg-clip-text text-transparent">
              Taharah
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Panduan lengkap tentang thaharah (bersuci) dalam Islam. Pelajari
            dasar-dasar bersuci yang merupakan kunci diterimanya ibadah.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            <Link
              to="/wudhu"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm shadow-lg shadow-emerald-200/50 dark:shadow-emerald-900/30 transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5"
            >
              Mulai Belajar
              <ArrowRight className="w-4 h-4" />
            </Link>

          </motion.div>
        </div>
      </FadeIn>

      {/* Introduction */}
      <ScrollReveal>
        <div className="relative overflow-hidden bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-950/20 dark:to-emerald-950/20 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-6 sm:p-8 lg:p-10">
          <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-200/20 dark:bg-emerald-700/10 rounded-full -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-teal-200/20 dark:bg-teal-700/10 rounded-full translate-y-1/2 -translate-x-1/3" />
          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-8 bg-emerald-500 rounded-full" />
              <h2 className="text-foreground">Pentingnya Bersuci</h2>
            </div>
            <div className="space-y-4 text-muted-foreground leading-relaxed max-w-3xl">
              <p>
                Bersuci atau <strong className="text-foreground">thaharah</strong> adalah salah satu syarat sahnya
                ibadah dalam Islam. Tanpa bersuci yang benar, beberapa ibadah seperti shalat tidak akan sah. Oleh karena
                itu, memahami bab bersuci sangatlah penting bagi setiap muslim.
              </p>
              <p>
                Thaharah mencakup bersuci dari hadas (baik hadas kecil maupun hadas besar) dan bersuci dari najis.
                Keduanya memiliki tata cara dan ketentuan yang berbeda sesuai dengan dalil-dalil dari Al-Qur'an dan
                Hadits.
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Topics Grid */}
      <div>
        <ScrollReveal>
          <div className="text-center mb-8">
            <h2 className="text-foreground">Materi Pembelajaran</h2>
            <p className="text-muted-foreground text-sm sm:text-base mt-2">
              Pilih materi yang ingin Anda pelajari
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {topics.map((topic, index) => {
            return (
              <ScrollReveal key={topic.title} delay={index * 0.1}>
                <Link
                  to={topic.href}
                  className={`group block bg-card border border-border rounded-2xl p-6 sm:p-7 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${topic.borderHover}`}
                >
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${topic.gradient} shadow-sm mb-4`}
                  >
                    <img src={topic.imageSrc} alt={topic.title} className="w-7 h-7 object-contain" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-foreground mb-2 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
                    {topic.title}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {topic.description}
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Pelajari selengkapnya</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </div>

      {/* Quiz Section */}
      <ScrollReveal>
        <div className="relative overflow-hidden bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 sm:p-8 lg:p-10 text-white shadow-lg">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/3" />
          <div className="relative flex flex-col sm:flex-row items-center gap-6">
            <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center border border-white/30">
              <BrainCircuit className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">
                Uji Pemahaman Anda
              </h2>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                Ikuti quiz interaktif untuk mengukur pemahaman Anda tentang fikih
                taharah. Dapatkan skor dan lihat hasil belajar Anda!
              </p>
            </div>
            <Link
              to="/quiz"
              className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-emerald-700 font-medium text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
            >
              Mulai Quiz
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </ScrollReveal>

      {/* Note */}
      <ScrollReveal>
        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-xl p-5 sm:p-6">
          <div className="flex gap-3">
            <div className="w-2 h-2 rounded-full bg-amber-500 flex-shrink-0 mt-2" />
            <p className="text-xs sm:text-sm text-amber-800 dark:text-amber-200 leading-relaxed">
              <strong>Catatan:</strong> Materi ini disusun berdasarkan rujukan fikih yang umum digunakan. Untuk
              pendalaman lebih lanjut, disarankan untuk berkonsultasi dengan ulama atau ustadz terpercaya di lingkungan
              Anda.
            </p>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
