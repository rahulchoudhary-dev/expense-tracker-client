"use client";

import { Info } from "lucide-react";
import React from "react";

interface iInputFiledProps {
  type: string;
  name: string;
  placeholder: string;
  value: string | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  onError?: any;
}

const InputFiled = (props: iInputFiledProps) => {
  const { type, name, placeholder, value, onChange, className, onError } =
    props;

  return (
    <div className="mb-4">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={className}
      />
      {onError && (
        <span className="text-red-500 text-sm ml-2 flex items-center gap-1">
          <Info size={15} /> {onError}
        </span>
      )}
    </div>
  );
};

export default InputFiled;
