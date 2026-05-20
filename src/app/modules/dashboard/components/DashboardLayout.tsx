import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router";
import {
  LayoutDashboard,
  PlusCircle,
  ListChecks,
  Users,
  FileText,
  Settings,
  LogOut,
  ChevronLeft,
  Menu,
  Droplets,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../../../components/ui/utils";
import { logoutUser } from "../../auth/services/auth.service";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Buat Soal", href: "/dashboard/create", icon: PlusCircle },
  { name: "Daftar Soal", href: "/dashboard/quizzes", icon: ListChecks },
  { name: "Hasil Murid", href: "/dashboard/results", icon: Users },
  { name: "Daftar Nilai", href: "/dashboard/export", icon: FileText },

  { name: "Pengaturan", href: "/dashboard/settings", icon: Settings },
];

export function DashboardLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logoutUser();
    navigate("/auth/login");
  };

  const isActive = (href: string) => {
    if (href === "/dashboard") return location.pathname === "/dashboard";
    return location.pathname.startsWith(href);
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 px-4 h-16 border-b border-border">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center flex-shrink-0">
          <Droplets className="w-4 h-4 text-white" />
        </div>
        {!collapsed && (
          <div className="flex flex-col">
            <span className="font-heading font-bold text-sm text-foreground truncate leading-tight">
              THAVA
            </span>
            <span className="text-[9px] text-muted-foreground truncate leading-tight">Taharah Virtual Academy</span>
          </div>
        )}
      </div>

      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                active
                  ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="px-2 py-4 border-t border-border">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all duration-200"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span>Keluar</span>}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden md:flex flex-col fixed left-0 top-0 bottom-0 border-r border-border bg-card transition-all duration-300 z-40",
          collapsed ? "w-16" : "w-60"
        )}
      >
        <div className="flex-1 flex flex-col min-h-0">
          <SidebarContent />
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 border-t border-border text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className={cn("w-4 h-4 mx-auto transition-transform", collapsed && "rotate-180")} />
        </button>
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 md:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              className="absolute top-0 left-0 bottom-0 w-60 bg-card border-r border-border"
              onClick={(e) => e.stopPropagation()}
            >
              <SidebarContent />
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer for fixed sidebar */}
      <div className={cn("hidden md:block flex-shrink-0 transition-all duration-300", collapsed ? "w-16" : "w-60")} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center gap-3 px-4 h-14 border-b border-border bg-card">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <Droplets className="w-5 h-5 text-emerald-600" />
            <span className="font-heading font-bold text-sm">Dashboard</span>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
