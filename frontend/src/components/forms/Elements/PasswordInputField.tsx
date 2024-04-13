import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";

type PasswordInputFieldProps = {
  value: string;
  title: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
};

const PasswordInputField: React.FC<PasswordInputFieldProps> = ({
  value,
  setValue,
  title,
  required = true,
  disabled = false,
  placeholder,
}) => {
  const [toggle, setToggle] = useState(false);

  const handleToggle = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setToggle((prev) => !prev);
  };

  return (
    <div>
      <label htmlFor={title} className="text-xs text-rooster-textSimple">
        {title}
      </label>

      <div className="flex gap-3">
        <input
          type={toggle ? "text" : "password"}
          className="inputField"
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={disabled}
        />
        {toggle ? (
          <EyeIcon
            onClick={handleToggle}
            className="w-5 cursor-pointer transition-all duration-300"
          />
        ) : (
          <EyeSlashIcon
            onClick={handleToggle}
            className="w-5 text-rooster-textSimple cursor-pointer transition-all duration-300"
          />
        )}
      </div>
    </div>
  );
};

export default React.memo(PasswordInputField);
