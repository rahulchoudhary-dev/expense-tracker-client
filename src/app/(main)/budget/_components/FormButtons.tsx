import React from "react";
import { FormikProps } from "formik";
import { Button } from "@/components/ui/button";

interface FormButtonsProps {
  formik: FormikProps<any>;
  resetLabel?: string;
  submitLabel?: string;
  submittingLabel?: string;
}

const FormButtons: React.FC<FormButtonsProps> = ({
  formik,
  resetLabel = "🔄 Reset Form",
  submitLabel = "🚀 Create Budget",
  submittingLabel = "✨ Creating Your Budget...",
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-5 pt-10">
      <Button
        type="button"
        variant={"outline"}
        onClick={() => formik.resetForm()}
        className="flex-1 px-8 py-6 cursor-pointer border-2 border-gray-300 text-gray-700 rounded-2xl font-semibold hover:bg-gray-50 hover:border-gray-400 hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-gray-200 text-sm transform hover:scale-105"
      >
        {resetLabel}
      </Button>
      <Button
        variant={"outline"}
        type="submit"
        disabled={formik.isSubmitting || !formik.isValid}
        className={`flex-1 px-8 py-6 cursor-pointer rounded-2xl font-semibold transition-all duration-300 focus:outline-none focus:ring-4 text-sm transform hover:scale-105 ${
          formik.isSubmitting || !formik.isValid
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-xl hover:shadow-2xl focus:ring-purple-200"
        }`}
      >
        {formik.isSubmitting ? (
          <div className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-6 w-6 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            {submittingLabel}
          </div>
        ) : (
          submitLabel
        )}
      </Button>
    </div>
  );
};

export default FormButtons;
