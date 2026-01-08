import { ReactNode } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  showBackButton?: boolean;
  children: ReactNode;
};

const Modal = ({
  isOpen,
  onClose,
  title,
  showBackButton = false,
  children,
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div
        className="absolute inset-0"
        aria-hidden="true"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-lg rounded-xl bg-white p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {(title || showBackButton) && (
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {showBackButton && (
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Go back"
                  className="rounded-full border border-gray-200 p-2 text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                >
                  ←
                </button>
              )}
              {title && (
                <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
        )}

        {children}
      </div>
    </div>
  );
};

export default Modal;
