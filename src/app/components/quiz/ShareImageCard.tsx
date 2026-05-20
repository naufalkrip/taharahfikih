import { forwardRef } from "react";

interface ShareImageCardProps {
  topicTitle: string;
  score: number;
  total: number;
  percentage: number;
  perTopic?: { topic: string; correct: number; total: number; percentage: number }[];
}

const COLORS: Record<string, string> = {
  wudhu: "#3b82f6",
  ghusl: "#10b981",
  tayammum: "#d97706",
  najis: "#ef4444",
};

const LABELS: Record<string, string> = {
  wudhu: "Wudhu",
  ghusl: "Mandi Wajib",
  tayammum: "Tayammum",
  najis: "Najis",
};

export const ShareImageCard = forwardRef<HTMLDivElement, ShareImageCardProps>(
  function ShareImageCard({ topicTitle, score, total, percentage, perTopic }, ref) {
    const topics = perTopic ?? (topicTitle ? [{ topic: topicTitle, correct: score, total, percentage }] : []);

    return (
      <div
        ref={ref}
        style={{
          width: 480,
          padding: 32,
          background: "linear-gradient(135deg, #0d9488 0%, #059669 50%, #047857 100%)",
          borderRadius: 24,
          fontFamily: "Inter, system-ui, sans-serif",
          color: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: "rgba(255,255,255,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 8px",
              fontSize: 24,
            }}
          >
            🕌
          </div>
          <h1
            style={{
              fontSize: 20,
              fontWeight: 700,
              margin: 0,
              letterSpacing: -0.5,
            }}
          >
            THAVA
          </h1>
          <p
            style={{
              fontSize: 13,
              opacity: 0.8,
              margin: "4px 0 0",
            }}
          >
            Quiz {topicTitle}
          </p>
        </div>

        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.15)",
            border: "4px solid rgba(255,255,255,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontSize: 40,
              fontWeight: 800,
              letterSpacing: -1,
            }}
          >
            {percentage}%
          </span>
        </div>

        <div style={{ width: "100%" }}>
          {topics.map((t) => {
            const color = COLORS[t.topic] ?? "#10b981";
            return (
              <div
                key={t.topic}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 12,
                }}
              >
                <span
                  style={{
                    width: 80,
                    fontSize: 12,
                    fontWeight: 600,
                    opacity: 0.9,
                    flexShrink: 0,
                    textAlign: "right",
                  }}
                >
                  {LABELS[t.topic] ?? t.topic}
                </span>
                <div
                  style={{
                    flex: 1,
                    height: 10,
                    borderRadius: 5,
                    background: "rgba(255,255,255,0.15)",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${t.percentage}%`,
                      height: "100%",
                      borderRadius: 5,
                      background: color,
                      transition: "width 0.5s ease",
                    }}
                  />
                </div>
                <span
                  style={{
                    width: 40,
                    fontSize: 13,
                    fontWeight: 700,
                    textAlign: "right",
                  }}
                >
                  {t.percentage}%
                </span>
              </div>
            );
          })}
        </div>

        <div
          style={{
            width: "100%",
            padding: "12px 16px",
            borderRadius: 12,
            background: "rgba(255,255,255,0.1)",
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: 12, margin: 0, opacity: 0.9, lineHeight: 1.5 }}>
            {percentage >= 85
              ? "🌟 Maa shaa Allah! Pemahaman luar biasa!"
              : percentage >= 70
              ? "👍 Alhamdulillah, pemahaman yang baik!"
              : percentage >= 50
              ? "💪 Tetap semangat belajar! Masih ada ruang untuk進步."
              : "📖 Jangan menyerah! Setiap langkah adalah ilmu."}
          </p>
        </div>

        <div
          style={{
            fontSize: 11,
            opacity: 0.6,
            textAlign: "center",
          }}
        >
          {score}/{total} jawaban benar
        </div>
      </div>
    );
  }
);
