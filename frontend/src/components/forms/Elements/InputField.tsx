import React from "react";

type InputFieldProps = {
  value: string;
  type: string;
  title?: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string
};

const InputField: React.FC<InputFieldProps> = ({
  value,
  setValue,
  type,
  title,
  placeholder,
  required = true,
  disabled = false,
}) => {
  return (
    <div>
      <label htmlFor="tag" className="text-xs text-rooster-textSimple">
        {title}
      </label>
      <input
        type={type}
        className="inputField"
        required={required}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={disabled}
        placeholder={placeholder}
      />
    </div>
  );
};

export default React.memo(InputField);
