"use client";

import React from "react";

interface iInputFiledProps {
  type: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // ✅ Required
  className?: string;
  onError?: string | boolean;
}

const InputFiled = (props: iInputFiledProps) => {
  const { type, name, placeholder, value, onChange, className, onError } =
    props;
  console.log(onError);

  return (
    <div className="mb-4">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange} // ✅ FIXED: this was missing
        className={className}
      />
      {onError && <p className="text-red-500 text-sm ml-2">{onError}</p>}
    </div>
  );
};

export default InputFiled;
