import React from "react";

type TextareaFieldProps = {
  value: string;
  title: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  required?: boolean;
  disabled?: boolean;
  cols?: number;
  rows?: number;
};

const TextareaField: React.FC<TextareaFieldProps> = ({
  value,
  setValue,
  title,
  required = true,
  disabled = false,
  cols = 0,
  rows = 3,
}) => {
  return (
    <div>
      <label htmlFor={title} className="text-xs text-rooster-textSimple">
        {title}
      </label>
      <textarea
        name={title}
        id=""
        cols={cols}
        rows={rows}
        className="inputField"
        required={required}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={disabled}
      ></textarea>
    </div>
  );
};

export default React.memo(TextareaField);
