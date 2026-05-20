import jsPDF from "jspdf";
import { applyPlugin } from "jspdf-autotable";

applyPlugin(jsPDF);

interface AnswerData {
  id: string;
  selected_index: number;
  is_correct: boolean;
  questions?: {
    question: string;
    options: string[];
    correct_index: number;
  };
}

export function generateQuizPDF(
  studentName: string,
  studentNumber: string,
  studentClass: string,
  score: number,
  total: number,
  percentage: number,
  answers: AnswerData[],
) {
  const doc = new jsPDF();

  // Header
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("THAVA", 14, 22);
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.text("Taharah Virtual Academy", 14, 28);

  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("Detail Hasil Quiz Murid", 14, 42);

  doc.setDrawColor(0, 150, 136);
  doc.setLineWidth(0.5);
  doc.line(14, 45, 196, 45);

  // Unified Info + Score Box
  const boxX = 14;
  const boxY = 48;
  const boxW = 174;
  const boxH = 40;

  doc.setFillColor(0, 150, 136);
  doc.roundedRect(boxX, boxY, boxW, boxH, 4, 4, "F");

  doc.setTextColor(255);
  doc.setFont("helvetica", "bold");

  const now = new Date();
  const dateStr = now.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Left column — student info
  const labelX = 22;
  const colonX = 58;
  const valueX = 64;

  doc.setFontSize(10);

  const infoLines = [
    { label: "Nama",      value: studentName },
    { label: "Kelas",     value: studentClass || "-" },
    { label: "No. Absen", value: studentNumber || "-" },
    { label: "Status",    value: "Selesai" },
    { label: "Tanggal",   value: dateStr },
  ];

  let iy = 60;
  for (const l of infoLines) {
    doc.text(l.label, labelX, iy);
    doc.text(":", colonX, iy);
    doc.text(l.value, valueX, iy);
    iy += 6;
  }

  // Divider
  doc.setDrawColor(255);
  doc.setLineWidth(0.3);
  doc.line(107, 54, 107, 84);

  // Right column — score
  const scoreCenterX = 152;

  doc.setFontSize(8);
  doc.text("NILAI", scoreCenterX, 60, { align: "center" });

  doc.setFontSize(22);
  doc.text(`${Math.round(percentage)}%`, scoreCenterX, 76, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.text(`(${score}/${total} benar)`, scoreCenterX, 83, { align: "center" });

  doc.setTextColor(0);

  const tableData = answers.map((a, i) => {
    const questionText = a.questions?.question ?? `Pertanyaan ${i + 1}`;
    const selectedLabel =
      a.selected_index !== undefined && a.questions?.options
        ? `${String.fromCharCode(65 + a.selected_index)}. ${a.questions.options[a.selected_index]}`
        : "-";
    const correctLabel =
      a.questions?.correct_index !== undefined && a.questions?.options
        ? `${String.fromCharCode(65 + a.questions.correct_index)}. ${a.questions.options[a.questions.correct_index]}`
        : "-";
    return [
      i + 1,
      questionText,
      selectedLabel,
      correctLabel,
      a.is_correct ? "Benar" : "Salah",
    ];
  });

  (doc as any).autoTable({
    startY: 96,
    head: [["No", "Soal", "Jawaban", "Kunci", "Status"]],
    body: tableData,
    theme: "grid",
    headStyles: {
      fillColor: [0, 150, 136],
      textColor: 255,
      fontSize: 9,
      fontStyle: "bold",
    },
    bodyStyles: { fontSize: 8 },
    columnStyles: {
      0: { cellWidth: 10 },
      1: { cellWidth: 70 },
      2: { cellWidth: 45 },
      3: { cellWidth: 45 },
      4: { cellWidth: 16 },
    },
    alternateRowStyles: { fillColor: [240, 250, 248] },
  });

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

  const safeName = studentName.replace(/[^a-zA-Z0-9]/g, "_").toLowerCase();
  doc.save(`hasil-quiz-${safeName}.pdf`);
}
