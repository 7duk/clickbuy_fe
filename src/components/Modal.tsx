import React, { useEffect, useRef } from "react";
import type { ModalProps } from "../types/components/ModalProps";

const Modal: React.FC<ModalProps> = ({ children, isOpen, onClose }) => {
  // Close the modal when clicking outside of it
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-opacity-90 backdrop-blur-[3px]"></div>
      <div
        ref={modalRef}
        className="bg-white p-6 rounded-lg shadow-lg w-3/5 z-10 border border-slate-200 flex flex-col justify-between"
      >
        {children}
      </div>
    </div>
  ) : null;
};

export default Modal;
