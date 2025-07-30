// components/BackButton.tsx

"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  label?: string;
  className?: string;
}

const BackButton: React.FC<BackButtonProps> = ({
  label = "",
  className = "",
}) => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className={`mr-4 cursor-pointer p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors ${className}`}
    >
      <ArrowLeft size={24} />
      {label && <span className="ml-2">{label}</span>}
    </button>
  );
};

export default BackButton;
