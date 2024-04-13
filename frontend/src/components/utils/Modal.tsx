import { XMarkIcon } from "@heroicons/react/24/outline";
import React, { useRef, useEffect, SetStateAction, Dispatch } from "react";
interface ModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
  heading: string;
}

const Modal: React.FC<ModalProps> = ({ open, setOpen, children, heading }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setOpen(!open);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [open, setOpen]);

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-40">
          <div
            className="relative bg-white rounded sm:w-96 w-full text-black"
            ref={modalRef}
          >
            <div className="p-4 flex items-center justify-between  border-b">
              <h1 className="font-bold">{heading}</h1>
              <XMarkIcon
                onClick={() => setOpen(!open)}
                className="w-4 h-4 cursor-pointer text-rooster-textSimple hover:text-red-500"
              />
            </div>
            <div className="p-4">{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
