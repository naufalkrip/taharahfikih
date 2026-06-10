import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type Language = "id" | "en";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<string, Record<Language, string>> = {
  "nav.beranda": { id: "Beranda", en: "Home" },
  "nav.wudhu": { id: "Wudhu", en: "Ablution" },
  "nav.mandi-wajib": { id: "Mandi Wajib", en: "Full Ablution" },
  "nav.tayammum": { id: "Tayammum", en: "Tayammum" },
  "nav.najis": { id: "Najis & Bersuci", en: "Impurity & Purification" },
  "nav.quiz": { id: "Quiz", en: "Quiz" },
  "nav.dashboard": { id: "Dashboard", en: "Dashboard" },
  "nav.masuk": { id: "Masuk", en: "Login" },
  "nav.keluar": { id: "Keluar", en: "Logout" },
  "logo.prefix": { id: "Hukum", en: "Fiqh of" },
  "logo.suffix": { id: "Taharah", en: "Purification" },
  "footer.desc": {
    id: "Panduan lengkap thaharah (bersuci) dalam Fikih Islam — disusun berdasarkan rujukan fikih yang umum digunakan untuk pembelajaran mahasiswa dan dosen.",
    en: "A complete guide to thaharah (purification) in Islamic Fiqh — compiled based on commonly used fiqh references for student and lecturer learning.",
  },
  "footer.tagline": { id: "Panduan Dasar Thaharah", en: "Basic Purification Guide" },
  "notFound.title": { id: "Halaman Tidak Ditemukan", en: "Page Not Found" },
  "notFound.desc": {
    id: "Maaf, halaman yang Anda cari tidak tersedia atau mungkin telah dipindahkan.",
    en: "Sorry, the page you are looking for is not available or may have been moved.",
  },
  "notFound.back": { id: "Kembali ke Dashboard", en: "Back to Dashboard" },

  // Auth - Login
  "auth.login.title": { id: "Masuk sebagai Guru", en: "Login as Teacher" },
  "auth.login.subtitle": { id: "Masuk untuk mengelola quiz", en: "Login to manage quizzes" },
  "auth.login.username": { id: "Username", en: "Username" },
  "auth.login.usernamePlaceholder": { id: "Masukkan username", en: "Enter username" },
  "auth.login.password": { id: "Password", en: "Password" },
  "auth.login.passwordPlaceholder": { id: "Masukkan password", en: "Enter password" },
  "auth.login.submit": { id: "Masuk", en: "Login" },
  "auth.login.prompt": { id: "Belum punya akun?", en: "Don't have an account?" },
  "auth.login.registerLink": { id: "Daftar", en: "Register" },
  "auth.login.error": { id: "Login gagal", en: "Login failed" },

  // Auth - Register
  "auth.register.title": { id: "Daftar Guru", en: "Register Teacher" },
  "auth.register.subtitle": { id: "Buat akun untuk mulai membuat quiz", en: "Create an account to start making quizzes" },
  "auth.register.username": { id: "Username", en: "Username" },
  "auth.register.usernamePlaceholder": { id: "Buat username", en: "Create username" },
  "auth.register.password": { id: "Password", en: "Password" },
  "auth.register.passwordPlaceholder": { id: "Buat password (min 6 karakter)", en: "Create password (min 6 characters)" },
  "auth.register.confirmPassword": { id: "Konfirmasi Password", en: "Confirm Password" },
  "auth.register.confirmPlaceholder": { id: "Ulangi password", en: "Repeat password" },
  "auth.register.submit": { id: "Daftar", en: "Register" },
  "auth.register.prompt": { id: "Sudah punya akun?", en: "Already have an account?" },
  "auth.register.loginLink": { id: "Masuk", en: "Login" },
  "auth.register.validation.usernameRequired": { id: "Username wajib diisi", en: "Username is required" },
  "auth.register.validation.usernameMin": { id: "Username minimal 3 karakter", en: "Username must be at least 3 characters" },
  "auth.register.validation.passwordMin": { id: "Password minimal 6 karakter", en: "Password must be at least 6 characters" },
  "auth.register.validation.passwordMatch": { id: "Password dan konfirmasi tidak cocok", en: "Passwords do not match" },
  "auth.register.error": { id: "Gagal mendaftar", en: "Registration failed" },

  // Quiz - Hub
  "quiz.title": { id: "Quiz Interaktif", en: "Interactive Quiz" },
  "quiz.subtitle": { id: "Uji pemahaman Anda tentang fikih taharah melalui quiz interaktif. Pilih materi yang ingin diuji.", en: "Test your understanding of fiqh taharah through interactive quizzes. Choose the material you want to test." },
  "quiz.overallScore": { id: "Nilai Keseluruhan", en: "Overall Score" },
  "quiz.overallDesc": { id: "Rata-rata dari semua quiz yang telah dikerjakan", en: "Average of all completed quizzes" },
  "quiz.allMaterial": { id: "Semua Materi", en: "All Materials" },
  "quiz.allMaterialDesc": { id: "Quiz gabungan dari seluruh materi (Wudhu, Mandi Wajib, Tayammum, Najis)", en: "Combined quiz from all materials (Ablution, Full Ablution, Tayammum, Impurity)" },
  "quiz.start": { id: "Mulai", en: "Start" },
  "quiz.perMaterial": { id: "Pilih Per Materi", en: "Choose Per Material" },
  "quiz.perMaterialDesc": { id: "Atau pilih quiz per materi tertentu", en: "Or choose a quiz per specific material" },
  "quiz.notStarted": { id: "Belum dikerjakan", en: "Not started" },
  "quiz.startQuiz": { id: "Mulai Quiz", en: "Start Quiz" },
  "quiz.share": { id: "Bagikan", en: "Share" },

  // Quiz - Player
  "quizPlayer.back": { id: "Kembali", en: "Back" },
  "quizPlayer.answered": { id: "{count} terjawab", en: "{count} answered" },
  "quizPlayer.previous": { id: "Sebelumnya", en: "Previous" },
  "quizPlayer.next": { id: "Selanjutnya", en: "Next" },
  "quizPlayer.finish": { id: "Selesai", en: "Finish" },
  "quizPlayer.exitTitle": { id: "Yakin ingin keluar?", en: "Are you sure you want to exit?" },
  "quizPlayer.exitDesc": { id: "Progress quiz akan hilang jika Anda keluar sekarang.", en: "Quiz progress will be lost if you exit now." },
  "quizPlayer.continue": { id: "Lanjutkan Quiz", en: "Continue Quiz" },
  "quizPlayer.confirmExit": { id: "Ya, Keluar", en: "Yes, Exit" },
  "quizPlayer.notFound": { id: "Topik quiz tidak ditemukan", en: "Quiz topic not found" },
  "quizPlayer.backToQuiz": { id: "Kembali ke Quiz", en: "Back to Quiz" },
  "quizPlayer.noQuestions": { id: "Belum ada pertanyaan untuk topik ini", en: "No questions for this topic" },
  "quizPlayer.quizLabel": { id: "Quiz", en: "Quiz" },

  // Quiz - Results
  "quizResults.emptyTitle": { id: "Belum Ada Hasil Quiz", en: "No Quiz Results Yet" },
  "quizResults.emptyDesc": { id: "Selesaikan quiz terlebih dahulu untuk melihat hasil.", en: "Complete the quiz first to see the results." },
  "quizResults.startQuiz": { id: "Mulai Quiz", en: "Start Quiz" },
  "quizResults.back": { id: "Kembali ke Quiz", en: "Back to Quiz" },
  "quizResults.title": { id: "Hasil Quiz", en: "Quiz Results" },

  // Quiz - Review
  "quizReview.notFound": { id: "Detail Tidak Ditemukan", en: "Detail Not Found" },
  "quizReview.notFoundDesc": { id: "Hasil quiz tidak tersedia atau sudah dihapus.", en: "Quiz results are not available or have been deleted." },
  "quizReview.backToQuiz": { id: "Kembali ke Quiz", en: "Back to Quiz" },
  "quizReview.title": { id: "Detail Hasil Quiz", en: "Quiz Result Detail" },
  "quizReview.correct": { id: "{count} benar", en: "{count} correct" },
  "quizReview.retry": { id: "Ulangi Quiz", en: "Retry Quiz" },
  "quizReview.answers": { id: "Jawaban", en: "Answers" },
  "quizReview.explanation": { id: "Penjelasan:", en: "Explanation:" },
  "quizReview.backToResults": { id: "Kembali ke Hasil", en: "Back to Results" },

  // Topics
  "topic.wudhu": { id: "Wudhu", en: "Ablution" },
  "topic.ghusl": { id: "Mandi Wajib", en: "Full Ablution" },
  "topic.tayammum": { id: "Tayammum", en: "Tayammum" },
  "topic.najis": { id: "Najis & Bersuci", en: "Impurity & Purification" },
  "topic.all": { id: "Semua Materi", en: "All Materials" },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem("lang");
    return (saved === "id" || saved === "en") ? saved : "id";
  });

  useEffect(() => {
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const t = (key: string): string => {
    return translations[key]?.[lang] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
