import { FC } from 'react';

interface TextAreaFieldProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  disabled?: boolean;
  error?: string;
  required?: boolean;
}

const TextAreaField: FC<TextAreaFieldProps> = ({
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
  disabled = false,
  error,
  required = false
}) => {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        className={`
          w-full
          px-3
          py-2
          rounded-lg
          border
          bg-white
          placeholder-gray-400
          transition-colors
          duration-200
          ${error ? 'border-red-500' : 'border-gray-300'}
          ${disabled ? 'bg-gray-50 text-gray-500' : 'text-gray-900'}
          ${!disabled && !error && 'hover:border-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'}
          disabled:cursor-not-allowed
          outline-none
          resize-none
        `}
      />
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default TextAreaField;
