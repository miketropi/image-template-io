import { FC } from 'react';

interface SelectFieldProps {
  label?: string;
  value: string | number;
  onChange: (value: string) => void;
  options: Array<{
    value: string | number;
    label: string;
  }>;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  required?: boolean;
}

const SelectField: FC<SelectFieldProps> = ({
  label,
  value,
  onChange,
  options,
  placeholder,
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
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={`
            w-full
            px-3
            py-2
            pr-10
            rounded-lg
            border
            bg-white
            placeholder-gray-400
            transition-colors
            duration-200
            appearance-none
            ${error ? 'border-red-500' : 'border-gray-300'}
            ${disabled ? 'bg-gray-50 text-gray-500' : 'text-gray-900'}
            ${!disabled && !error && 'hover:border-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'}
            disabled:cursor-not-allowed
            outline-none
          `}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
          <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default SelectField;
