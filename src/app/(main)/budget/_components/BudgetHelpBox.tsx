import React from "react";

interface BudgetHelpBoxProps {
  linkUrl?: string;
  linkText?: string;
  message?: string;
}

const BudgetHelpBox: React.FC<BudgetHelpBoxProps> = ({
  linkUrl = "#",
  linkText = "comprehensive budget planning guide",
  message = "Need assistance? Explore our",
}) => {
  return (
    <div className="mt-10 text-center">
      <div className="inline-flex items-center px-6 py-3 bg-white/60 backdrop-blur-sm rounded-full border border-white/30 shadow-lg">
        <svg
          className="w-5 h-5 text-purple-500 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p className="text-base text-gray-600">
          {message}{" "}
          <a
            href={linkUrl}
            className="text-purple-600 hover:text-purple-800 font-semibold transition-colors duration-200 underline decoration-purple-300 hover:decoration-purple-500"
          >
            {linkText}
          </a>
        </p>
      </div>
    </div>
  );
};

export default BudgetHelpBox;
