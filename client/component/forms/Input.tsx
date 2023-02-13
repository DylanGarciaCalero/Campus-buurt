import React, { useState } from 'react';

export interface InputProps {
  value?: string | number;
  name: string;
  type: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const Input = ({
  value,
  name,
  type,
  placeholder,
  onChange,
  onBlur,
}: InputProps) => {
  const [currentValue, setCurrentValue] = useState(value);

  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={currentValue}
      onChange={(e) => {
        if (onChange) onChange(e);
        setCurrentValue(e.target.value);
      }}
      onBlur={onBlur}
    />
  );
};

export default Input;
