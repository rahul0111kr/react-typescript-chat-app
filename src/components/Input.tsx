import React from "react";

type InputProps = {
  name: string;
  value?: string;
  type?: string;
  onChange?: (e: any) => void;
  className?: string;
  onKeyDown?: (e: any) => void;
  disabled?: boolean;
};

export default function Input({
  type = "text",
  name,
  value,
  onChange,
  className,
  onKeyDown,
  disabled,
}: InputProps) {
  return (
    <input
      value={value}
      type={type}
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder={`Enter ${name}`}
      disabled={disabled}
      className={`flex-1 placeholder-grey-300 bg-transparent px-3 py-1 border-2 rounded-full ${className}`}
    />
  );
}
