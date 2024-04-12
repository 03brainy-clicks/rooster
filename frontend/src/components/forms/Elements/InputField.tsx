import React from "react";

type InputFieldProps = {
  value: string;
  type: string;
  title: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  required?: boolean;
  disabled?: boolean;
};

const InputField: React.FC<InputFieldProps> = ({
  value,
  setValue,
  type,
  title,
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
      />
    </div>
  );
};

export default React.memo(InputField);
