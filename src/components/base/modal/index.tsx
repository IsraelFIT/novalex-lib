"use client";

import { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/80">
      {/* Modal Container */}
      <div className="bg-white dark:bg-black-light rounded-lg h-[80%] w-full max-w-2xl relative overflow-y-scroll no-scrollbar">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="sticky z-10 top-1 right-4 float-right text-3xl text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          &times;
        </button>

        {/* Modal Content */}
        {children}
      </div>
    </div>
  );
}
