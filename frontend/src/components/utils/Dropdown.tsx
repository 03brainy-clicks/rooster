import React, { ReactNode, useRef, useEffect } from "react";

interface DropdownProps {
  children: ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ children, open, setOpen }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [open, setOpen]);

  return (
    <div ref={dropdownRef} className="relative">
      {open && (
        <div className="absolute right-0 mt-2 rounded-sm shadow-md bg-white ring-1 ring-black ring-opacity-5 z-10 top-1">
          <div
            className=""
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
