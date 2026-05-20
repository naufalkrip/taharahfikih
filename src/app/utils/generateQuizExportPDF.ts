import jsPDF from "jspdf";
import { applyPlugin } from "jspdf-autotable";

applyPlugin(jsPDF);

interface QuestionData {
  id: string;
  question: string;
  options: string[];
  correct_index: number;
  difficulty: string;
}

interface AttemptData {
  student_name: string;
  student_number: string;
  score: number;
  total_questions: number;
  percentage: number;
  time_spent: number;
}

export function generateQuizExportPDF(
  quizTitle: string,
  quizTopic: string,
  quizCategory: string,
  questions: QuestionData[],
  attempts: AttemptData[],
) {
  const doc = new jsPDF();

  // Header
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("THAVA", 14, 22);
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.text("Taharah Virtual Academy", 14, 28);

  doc.setDrawColor(0, 150, 136);
  doc.setLineWidth(0.5);
  doc.line(14, 30, 196, 30);

  // Quiz Info
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text(quizTitle, 14, 42);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text(`Materi: ${quizTopic || "Semua"}  |  Kelas: ${quizCategory || "Tanpa Kelas"}`, 14, 50);

  // Recap Box
  const totalStudents = attempts.length;
  const avg = totalStudents > 0
    ? Math.round(attempts.reduce((s, a) => s + Number(a.percentage), 0) / totalStudents)
    : 0;
  const sorted = [...attempts].sort((a, b) => Number(b.percentage) - Number(a.percentage));
  const highest = sorted.length > 0 ? Math.round(Number(sorted[0].percentage)) : 0;
  const lowest = sorted.length > 0 ? Math.round(Number(sorted[sorted.length - 1].percentage)) : 0;

  const boxX = 14;
  const boxY = 56;
  const boxW = 174;
  const boxH = 30;

  doc.setFillColor(0, 150, 136);
  doc.roundedRect(boxX, boxY, boxW, boxH, 4, 4, "F");

  doc.setTextColor(255);
  doc.setFont("helvetica", "bold");

  doc.setFontSize(9);
  doc.text("REKAP NILAI", boxX + boxW / 2, boxY + 9, { align: "center" });

  doc.setFontSize(10);

  const leftLabelX = 22; const leftColonX = 58; const leftValX = 64;
  const rightLabelX = 100; const rightColonX = 136; const rightValX = 142;

  const recapLines = [
    { label: "Total Siswa",  left: `${totalStudents}`,  rightLabel: "Rata-rata",  rightVal: `${avg}%` },
    { label: "Tertinggi",    left: `${highest}%`,    rightLabel: "Terendah",   rightVal: `${lowest}%` },
  ];

  let ry = 73;
  for (const r of recapLines) {
    doc.text(r.label, leftLabelX, ry);
    doc.text(":", leftColonX, ry);
    doc.text(r.left, leftValX, ry);
    doc.text(r.rightLabel, rightLabelX, ry);
    doc.text(":", rightColonX, ry);
    doc.text(r.rightVal, rightValX, ry);
    ry += 7;
  }

  doc.setTextColor(0);

  // Student Scores Table
  if (attempts.length > 0) {
    const scoreData = attempts.map((a, i) => [
      i + 1,
      a.student_name,
      a.student_number || "-",
      `${Math.round(Number(a.percentage))}%`,
      `${a.score}/${a.total_questions}`,
    ]);

    (doc as any).autoTable({
      startY: 94,
      head: [["No", "Nama", "No. Absen", "Nilai", "Benar"]],
      body: scoreData,
      theme: "grid",
      headStyles: { fillColor: [0, 150, 136], textColor: 255, fontSize: 9, fontStyle: "bold" },
      bodyStyles: { fontSize: 8 },
      columnStyles: { 0: { cellWidth: 10 }, 1: { cellWidth: 60 }, 2: { cellWidth: 30 }, 3: { cellWidth: 25 }, 4: { cellWidth: 20 } },
      alternateRowStyles: { fillColor: [240, 250, 248] },
    });
  }

  // Questions Section
  const questionsStartY = attempts.length > 0 ? (doc as any).lastAutoTable.finalY + 15 : 95;

  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("DAFTAR SOAL", 14, questionsStartY);

  const questionLabels = ["A", "B", "C", "D", "E"];

  const questionRows = questions.map((q, i) => {
    const correctLabel = q.options[q.correct_index]
      ? `${questionLabels[q.correct_index] || q.correct_index}. ${q.options[q.correct_index]}`
      : "-";

    const formattedOptions = q.options
      .map((opt, oi) => `${questionLabels[oi] || oi}. ${opt}`)
      .join("\n");

    return [i + 1, q.question, formattedOptions, correctLabel];
  });

  (doc as any).autoTable({
    startY: questionsStartY + 8,
    head: [["No", "Soal", "Pilihan", "Kunci Jawaban"]],
    body: questionRows,
    theme: "grid",
    headStyles: { fillColor: [0, 150, 136], textColor: 255, fontSize: 9, fontStyle: "bold" },
    bodyStyles: { fontSize: 8 },
    columnStyles: { 0: { cellWidth: 10 }, 1: { cellWidth: 65 }, 2: { cellWidth: 65 }, 3: { cellWidth: 40 } },
    alternateRowStyles: { fillColor: [240, 250, 248] },
  });

  // Page numbers
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text(
      `Halaman ${i} dari ${pageCount}`,
      doc.internal.pageSize.width / 2,
      doc.internal.pageSize.height - 10,
      { align: "center" },
    );
  }

  const safeName = quizTitle.replace(/[^a-zA-Z0-9]/g, "_").toLowerCase();
  doc.save(`export-${safeName}.pdf`);
}
