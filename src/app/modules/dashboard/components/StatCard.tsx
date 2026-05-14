import { motion } from "motion/react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  color: string;
  gradient: string;
}

export function StatCard({ title, value, icon: Icon, gradient }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative overflow-hidden rounded-2xl p-5 text-white ${gradient} shadow-sm`}
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3" />
      <div className="relative">
        <div className="flex items-center justify-between mb-3">
          <Icon className="w-5 h-5 text-white/70" />
        </div>
        <p className="text-2xl sm:text-3xl font-bold tabular-nums">{value}</p>
        <p className="text-xs sm:text-sm text-white/80 mt-1">{title}</p>
      </div>
    </motion.div>
  );
}
