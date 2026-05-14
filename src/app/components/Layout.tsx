import { Link, Outlet, useLocation, useNavigate } from "react-router";
import { BookOpen, Droplets, Menu, X, ChevronUp, Moon, Sun, LayoutDashboard, LogIn, LogOut, Languages } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "next-themes";
import { cn } from "./ui/utils";
import { useLanguage } from "../contexts/LanguageContext";
import { isAuthenticated, logoutUser } from "../modules/auth/services/auth.service";

export function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const { t, lang, setLang } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const isFullscreen = location.pathname.match(/^\/quiz\/(?!results)/) ? true : false;

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => { setLoggedIn(isAuthenticated()); }, [location.pathname]);

  const navigation = [
    { key: "nav.beranda", href: "/" },
    { key: "nav.wudhu", href: "/wudhu" },
    { key: "nav.mandi-wajib", href: "/ghusl" },
    { key: "nav.tayammum", href: "/tayammum" },
    { key: "nav.najis", href: "/najis" },
    { key: "nav.quiz", href: "/quiz" },
    ...(loggedIn
      ? [{ key: "nav.dashboard", href: "/dashboard" }]
      : [{ key: "nav.masuk", href: "/auth/login" }]
    ),
  ];

  const handleLogout = () => {
    logoutUser();
    setLoggedIn(false);
    navigate("/");
  };

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
    setShowBackToTop(window.scrollY > 500);

    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    setReadingProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  if (isFullscreen) {
    return (
      <div className="min-h-screen bg-background">
        <Outlet />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[60] h-1 bg-emerald-500/80 dark:bg-emerald-400/80 origin-left"
        style={{ scaleX: readingProgress / 100 }}
      />

      {/* Sticky Navbar */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-border shadow-sm"
            : "bg-white dark:bg-slate-900"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                <Droplets className="w-5 h-5 text-white" />
              </div>
              <span className="font-heading font-bold text-lg text-foreground">
                {t("logo.prefix")}<span className="text-emerald-600 dark:text-emerald-400">{t("logo.suffix")}</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.key}
                  to={item.href}
                  className={cn(
                    "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 relative",
                    isActive(item.href)
                      ? "text-emerald-700 dark:text-emerald-300"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                  )}
                >
                  {isActive(item.href) && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{t(item.key)}</span>
                </Link>
              ))}
            </nav>

            {/* Right side: Dark mode + Mobile menu */}
            <div className="flex items-center gap-2">
              {/* Dark Mode Toggle */}
              {mounted && (
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="p-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all duration-200"
                  aria-label="Toggle dark mode"
                >
                  {theme === "dark" ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}
                </button>
              )}

              {/* Language Toggle */}
              <div
                onClick={() => setLang(lang === "id" ? "en" : "id")}
                className="flex items-center cursor-pointer select-none"
                aria-label="Ganti Bahasa"
              >
                <div className="relative h-7 w-16 rounded-full bg-muted transition-colors">
                  <div
                    className={cn(
                      "absolute top-0.5 flex h-6 w-8 items-center justify-center rounded-full bg-white shadow-sm text-xs font-semibold transition-all duration-200",
                      lang === "id" ? "left-0.5 text-emerald-600" : "left-[calc(100%-2.125rem)] text-blue-600"
                    )}
                  >
                    {lang === "id" ? "Idn" : "Eng"}
                  </div>
                </div>
              </div>

              {/* Logout Button */}
              {loggedIn && (
                <button
                  onClick={handleLogout}
                  className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all duration-200"
                  title={t("nav.keluar")}
                >
                  <LogOut className="w-4 h-4" />
                  <span>{t("nav.keluar")}</span>
                </button>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all duration-200"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
              className="md:hidden border-t border-border overflow-hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl"
            >
              <nav className="px-4 py-4 space-y-1">
                {navigation.map((item, i) => (
                  <motion.div
                    key={item.key}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.2 }}
                  >
                    <Link
                      to={item.href}
                      onClick={closeMobileMenu}
                      className={cn(
                        "block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                        isActive(item.href)
                          ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                      )}
                    >
                      {t(item.key)}
                    </Link>
                  </motion.div>
                ))}
                {loggedIn && (
                  <motion.div
                    key="keluar"
                    className="pt-3 border-t border-border mt-3"
                  >
                    <button
                      onClick={() => { handleLogout(); closeMobileMenu(); }}
                      className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all duration-200"
                    >
                      <LogOut className="w-5 h-5" />
                      {t("nav.keluar")}
                    </button>
                  </motion.div>
                )}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              <span className="font-heading font-semibold text-sm text-foreground">
                {t("logo.prefix")} {t("logo.suffix")}
              </span>
            </div>
            <p className="text-sm text-muted-foreground text-center max-w-md">
              {t("footer.desc")}
            </p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span>© {new Date().getFullYear()} Hukum Taharah</span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
              <span>{t("footer.tagline")}</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 p-3 rounded-xl bg-emerald-600 dark:bg-emerald-500 text-white shadow-lg hover:bg-emerald-700 dark:hover:bg-emerald-400 hover:shadow-xl transition-all duration-200"
            aria-label="Back to top"
          >
            <ChevronUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
