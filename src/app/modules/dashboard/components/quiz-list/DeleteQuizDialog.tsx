import { motion, AnimatePresence } from "motion/react";
import { Loader2, Trash2 } from "lucide-react";

interface DeleteQuizDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  deleting: boolean;
}

export function DeleteQuizDialog({ open, onClose, onConfirm, deleting }: DeleteQuizDialogProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => !deleting && onClose()}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="bg-card border border-border rounded-2xl shadow-xl w-full max-w-sm p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0">
                <Trash2 className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">Hapus Quiz</h3>
                <p className="text-xs text-muted-foreground">
                  Apakah kamu yakin ingin menghapus quiz ini?
                </p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mb-5 ml-13">
              Semua data murid yang terkait juga akan ikut terhapus. Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={onClose}
                disabled={deleting}
                className="px-4 py-2 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-muted/50 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={onConfirm}
                disabled={deleting}
                className="px-4 py-2 rounded-xl bg-red-500 text-white text-sm font-medium hover:bg-red-600 disabled:opacity-40 transition-colors inline-flex items-center gap-2"
              >
                {deleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                {deleting ? "Menghapus..." : "Hapus"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
