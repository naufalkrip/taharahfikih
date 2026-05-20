import { useState } from "react";
import { useNavigate } from "react-router";
import { User, Lock, LogOut, Loader2, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { getSession, updateUsername, changePassword, logoutUser } from "../../auth/services/auth.service";

export function Settings() {
  const navigate = useNavigate();
  const session = getSession();

  // Ganti Nama
  const [newName, setNewName] = useState("");
  const [savingName, setSavingName] = useState(false);

  // Ganti Sandi
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [savingPassword, setSavingPassword] = useState(false);
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSaveName = async () => {
    if (!newName.trim() || !session) return;
    setSavingName(true);
    try {
      await updateUsername(session.id, newName.trim());
      toast.success("Nama berhasil diubah");
      setNewName("");
    } catch (err: any) {
      toast.error(err.message || "Gagal mengubah nama");
    }
    setSavingName(false);
  };

  const handleSavePassword = async () => {
    if (!oldPassword || !newPassword || !confirmPassword || !session) return;
    if (newPassword !== confirmPassword) {
      toast.error("Konfirmasi sandi tidak cocok");
      return;
    }
    setSavingPassword(true);
    try {
      await changePassword(session.id, oldPassword, newPassword);
      toast.success("Sandi berhasil diubah");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      toast.error(err.message || "Gagal mengubah sandi");
    }
    setSavingPassword(false);
  };

  const handleLogout = () => {
    logoutUser();
    navigate("/auth/login");
  };

  if (!session) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-card border border-border rounded-2xl p-10 text-center">
          <p className="text-muted-foreground text-sm">Sesi tidak ditemukan. Silakan login ulang.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-foreground">Pengaturan Akun</h1>
        <p className="text-sm text-muted-foreground mt-1">Kelola username dan sandi akun</p>
      </div>

      {/* Ganti Nama */}
      <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-4 mb-2">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 flex items-center justify-center">
            <User className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-foreground">Ganti Nama</h2>
            <p className="text-xs text-muted-foreground">Username saat ini: <span className="font-medium text-foreground">{session.username}</span></p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Nama baru</label>
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Masukkan username baru"
            className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>

        <button
          onClick={handleSaveName}
          disabled={savingName || !newName.trim()}
          className="w-full px-6 py-2.5 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white text-sm font-medium hover:shadow-lg disabled:opacity-40 transition-all duration-200"
        >
          {savingName ? (
            <span className="inline-flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" />Menyimpan...</span>
          ) : "Simpan"}
        </button>
      </div>

      {/* Ganti Sandi */}
      <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-4 mb-2">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 flex items-center justify-center">
            <Lock className="w-6 h-6 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-foreground">Ganti Sandi</h2>
            <p className="text-xs text-muted-foreground">Perbarui sandi akun kamu</p>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Sandi lama</label>
            <div className="relative">
              <input
                type={showOld ? "text" : "password"}
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="Masukkan sandi lama"
                className="w-full px-4 py-2.5 pr-10 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <button
                type="button"
                onClick={() => setShowOld(!showOld)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showOld ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Sandi baru</label>
            <div className="relative">
              <input
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Minimal 6 karakter"
                className="w-full px-4 py-2.5 pr-10 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Konfirmasi sandi baru</label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Ulangi sandi baru"
                className="w-full px-4 py-2.5 pr-10 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={handleSavePassword}
          disabled={savingPassword || !oldPassword || !newPassword || !confirmPassword}
          className="w-full px-6 py-2.5 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white text-sm font-medium hover:shadow-lg disabled:opacity-40 transition-all duration-200"
        >
          {savingPassword ? (
            <span className="inline-flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" />Menyimpan...</span>
          ) : "Simpan"}
        </button>
      </div>

      {/* Logout */}
      <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
        <h2 className="text-sm font-semibold text-foreground mb-4">Keamanan</h2>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 text-sm font-medium hover:bg-red-100 dark:hover:bg-red-950/40 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Keluar dari Akun
        </button>
      </div>
    </div>
  );
}
