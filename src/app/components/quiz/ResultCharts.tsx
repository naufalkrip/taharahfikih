import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  Sector,
} from "recharts";
import { useState } from "react";

interface ResultChartsProps {
  correct: number;
  incorrect: number;
  topicStats: { topic: string; title: string; percentage: number }[];
}

const COLORS = {
  emerald: "#10b981",
  blue: "#3b82f6",
  amber: "#d97706",
  red: "#ef4444",
};

function getColorForTopic(topic: string): string {
  const map: Record<string, string> = {
    wudhu: COLORS.blue,
    ghusl: COLORS.emerald,
    tayammum: COLORS.amber,
    najis: COLORS.red,
  };
  return map[topic] ?? COLORS.emerald;
}

export function ResultCharts({ correct, incorrect, topicStats }: ResultChartsProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const doughnutData = [
    { name: "Benar", value: correct, color: "#10b981" },
    { name: "Salah", value: incorrect, color: "#ef4444" },
  ];

  const barData = topicStats.map((t) => ({
    name: t.title,
    percentage: t.percentage,
    fill: getColorForTopic(t.topic),
  }));

  const renderActiveShape = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    return (
      <g>
        <text x={cx} y={cy - 8} textAnchor="middle" fill="currentColor" className="text-xs font-medium">
          Total
        </text>
        <text x={cx} y={cy + 16} textAnchor="middle" fill="currentColor" className="text-2xl font-bold">
          {correct + incorrect}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 6}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
      </g>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Doughnut Chart */}
      <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
        <h4 className="text-sm font-semibold text-foreground mb-1">Total Jawaban</h4>
        <p className="text-xs text-muted-foreground mb-4">Perbandingan benar dan salah</p>
        <div className="flex flex-col items-center">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={doughnutData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={85}
                dataKey="value"
                onMouseEnter={(_, index) => setActiveIndex(index)}
              >
                {doughnutData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-6 mt-2">
            {doughnutData.map((d) => (
              <div key={d.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }} />
                <span className="text-xs text-muted-foreground">
                  {d.name}: {d.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
        <h4 className="text-sm font-semibold text-foreground mb-1">Skor per Materi</h4>
        <p className="text-xs text-muted-foreground mb-4">Persentase jawaban benar per topik</p>
        {barData.length > 0 ? (
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={barData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                domain={[0, 100]}
                tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${v}%`}
              />
              <Tooltip
                formatter={(value: number) => [`${value}%`, "Skor"]}
                contentStyle={{
                  backgroundColor: "var(--color-card)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Bar dataKey="percentage" radius={[6, 6, 0, 0]} maxBarSize={50}>
                {barData.map((entry, index) => (
                  <Cell key={index} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-[220px] text-sm text-muted-foreground">
            Belum ada data quiz
          </div>
        )}
      </div>
    </div>
  );
}
