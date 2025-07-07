"use client";

import React from "react";

interface iInputFiledProps {
  type: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  onError?: string | boolean;
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
      {onError && <p className="text-red-500 text-sm ml-2">{onError}</p>}
    </div>
  );
};

export default InputFiled;
