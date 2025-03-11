import React, { useState } from 'react';

interface UnderlineInputProps {
  label: string;
  color?: string;
  [key: string]: any;
}

const UnderlineInput: React.FC<UnderlineInputProps> = ({ label, color = '#3B82F6', ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const handleChange = (e: { target: { value: any; }; }) => setHasValue(!!e.target.value);

  return (
    <div className="relative w-full">
      {/* Input */}
      <input
        {...props}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        className="w-full pt-6 pb-2 bg-transparent border-0 border-b-2 outline-none focus:ring-0 transition-colors"
        style={{
          borderBottomColor: isFocused || hasValue ? color : '#D1D5DB', // Color del borde
        }}
      />
      {/* Label */}
      <label
        className={`absolute left-0 top-5 transition-all transform pointer-events-none ${
          isFocused || hasValue
            ? 'text-xs -translate-y-4'
            : 'text-sm translate-y-0'
        }`}
        style={{
          color: isFocused || hasValue ? color : '#9CA3AF', // Color del label
        }}
      >
        {label}
      </label>
      {/* Borde animado */}
      <div
        className="absolute bottom-0 left-0 w-0 h-[2px] transition-all duration-300"
        style={{
          width: isFocused ? '100%' : '0%',
          backgroundColor: color, // Color de la animación
        }}
      />
    </div>
  );
};

export default UnderlineInput;