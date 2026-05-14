import { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronLeft, User, LogOut } from "lucide-react";
import { supabase } from "../../../lib/supabase";
import { logoutUser } from "../../auth/services/auth.service";

export function Settings() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    if (!name.trim()) return;
    setSaving(true);
    const { data: user } = await supabase.auth.getUser();
    if (user.user) {
      await supabase.from("users").update({ name: name.trim() }).eq("id", user.user.id);
    }
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleLogout = async () => {
    logoutUser();
    navigate("/auth/login");
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-foreground">Pengaturan Akun</h1>
        <p className="text-sm text-muted-foreground mt-1">Kelola profil dan pengaturan akun</p>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 flex items-center justify-center">
            <User className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-foreground">Profil</h2>
            <p className="text-xs text-muted-foreground">Update nama pengguna</p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Nama</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nama lengkap"
            className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleSave}
            disabled={saving || !name.trim()}
            className="flex-1 px-6 py-2.5 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white text-sm font-medium hover:shadow-lg disabled:opacity-40 transition-all duration-200"
          >
            {saving ? "Menyimpan..." : saved ? "Tersimpan ✓" : "Simpan"}
          </button>
        </div>
      </div>

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
