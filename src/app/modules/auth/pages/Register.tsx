import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { Loader2, User, Lock, Eye, EyeOff, AlertCircle, Droplets, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { registerUser } from "../services/auth.service";

export function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username.trim()) { setError("Username wajib diisi"); return; }
    if (username.trim().length < 3) { setError("Username minimal 3 karakter"); return; }
    if (password.length < 6) { setError("Password minimal 6 karakter"); return; }
    if (password !== confirm) { setError("Password dan konfirmasi tidak cocok"); return; }

    setLoading(true);
    try {
      await registerUser(username, password);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message || "Gagal mendaftar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-sm">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 shadow-sm mb-3">
              <Droplets className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-lg font-bold text-foreground">Daftar Guru</h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              Buat akun untuk mulai membuat quiz
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-foreground mb-1">
                <User className="w-3.5 h-3.5 inline mr-1" />
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Buat username"
                autoComplete="username"
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-foreground mb-1">
                <Lock className="w-3.5 h-3.5 inline mr-1" />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Buat password (min 6 karakter)"
                  autoComplete="new-password"
                  required
                  className="w-full pr-10 pl-3.5 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-foreground mb-1">
                <Lock className="w-3.5 h-3.5 inline mr-1" />
                Konfirmasi Password
              </label>
              <input
                type={showPw ? "text" : "password"}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Ulangi password"
                autoComplete="new-password"
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-2 p-3 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800"
              >
                <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-red-600 dark:text-red-400">{error}</p>
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading || !username.trim() || !password || !confirm}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white text-sm font-medium hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  Daftar
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-5 pt-4 border-t border-border text-center">
            <p className="text-xs text-muted-foreground">
              Sudah punya akun?{" "}
              <Link to="/auth/login" className="text-emerald-600 dark:text-emerald-400 font-medium hover:underline">
                Masuk
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
