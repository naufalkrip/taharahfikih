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
