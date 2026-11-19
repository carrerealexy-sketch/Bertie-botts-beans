import { X } from "lucide-react";

export const DeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  children,
  isLoading = false,
  confirmLabel = "Confirmer",
  cancelLabel = "Annuler",
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4"
      onClick={() => !isLoading && onClose()}
    >
      <div
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 p-6"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h2 id="modal-title" className="text-lg font-bold text-slate-900">
              {title}
            </h2>

            {description && (
              <p className="text-sm text-slate-500 leading-relaxed mt-1">
                {description}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            aria-label="Fermer la fenêtre"
            className="text-slate-400 hover:text-slate-700 transition-colors disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        <div>{children}</div>

        <div className="flex items-center justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors disabled:opacity-50"
          >
            {cancelLabel}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="px-4 py-2 text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow-sm transition-colors disabled:opacity-50"
          >
            {isLoading ? "Chargement..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
