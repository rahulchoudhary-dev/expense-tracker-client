import { FormikProps } from "formik";
import { Calendar, Calendar1Icon, DollarSign } from "lucide-react";
import InputFiled from "@/components/InputFiled";
import FormErrorMessage from "@/components/FormErrorMessage";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import FormButtons from "./FormButtons";
import { budgetType, budgetYears } from "@/constant";
import { monthOptions } from "@/constant/dateOptions";

interface BudgetFormProps {
  formik: FormikProps<any>;
  isEditing: boolean;
}

const BudgetForm: React.FC<BudgetFormProps> = ({ formik, isEditing }) => {
  return (
    <div className="backdrop-blur-lg bg-white/80 dark:bg-gray-600 rounded-3xl shadow-2xl dark:shadow-gray-900/50 p-8 md:p-12 border border-white/30 dark:border-gray-700/30 transform transition-all duration-500 hover:shadow-3xl dark:hover:shadow-gray-900/70">
      <form onSubmit={formik.handleSubmit} className="space-y-8">
        {/* Budget Title */}
        <div className="space-y-3 group">
          <label className="flex items-center text-lg font-semibold text-gray-800 dark:text-gray-200 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-200">
            <svg
              className="w-5 h-5 mr-2 text-purple-500 dark:text-purple-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
              />
            </svg>
            Budget Title <span className="text-red-500 ml-1">*</span>
          </label>
          <div className="relative">
            <InputFiled
              type="text"
              onError={formik.touched.title && formik.errors.title}
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              placeholder="e.g., Monthly Living Expenses, Dream Vacation Fund"
              className="w-full text-lg px-5 py-4 rounded-2xl border-2 border-gray-200 dark:border-gray-600 focus:border-purple-500 dark:focus:border-purple-400 focus:ring-4 focus:ring-purple-200 dark:focus:ring-purple-700/50 transition-all duration-300 bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        {/* Budget Type with toggle-like design */}
        <div className="space-y-3 group">
          <label className="flex items-center text-lg font-semibold text-gray-800 dark:text-gray-200 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-200">
            <Calendar className="w-5 h-5 mr-2 text-purple-500 dark:text-purple-400" />
            Budget Type <span className="text-red-500 ml-1">*</span>
          </label>
          <div className="relative">
            <div className="space-y-2">
              <Select
                name="type"
                value={formik.values.type.toString()}
                onValueChange={(value) => formik.setFieldValue("type", value)}
              >
                <SelectTrigger
                  className={`w-full cursor-pointer px-5 py-8 border-2 rounded-2xl focus:ring-4 focus:ring-purple-200 dark:focus:ring-purple-700/50 focus:border-purple-500 dark:focus:border-purple-400 transition-all duration-300 appearance-none bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm text-lg font-medium text-gray-900 dark:text-white ${
                    formik.touched.type && formik.errors.type
                      ? "border-red-500 focus:ring-red-200 dark:focus:ring-red-700/50 focus:border-red-500 dark:focus:border-red-400"
                      : "border-gray-200 dark:border-gray-600"
                  }`}
                >
                  <SelectValue placeholder="Select a Budget Type">
                    {budgetType?.find(
                      (items: any) => items?.value == formik.values?.type
                    )?.value || "Select type"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 shadow-sm dark:shadow-gray-900/50 border border-gray-200 dark:border-gray-700">
                  {budgetType?.map((type: any, index) => (
                    <SelectItem
                      className="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-100 dark:focus:bg-gray-700 transition-colors duration-200"
                      key={index}
                      value={type.value}
                    >
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormErrorMessage name="type" formik={formik} />
            </div>
          </div>
        </div>

        {/* Month Selection with smooth animation */}
        {formik.values.type === "monthly" && (
          <div className="space-y-3 group">
            <label className="flex items-center text-lg font-semibold text-gray-800 dark:text-gray-200 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-200">
              <Calendar className="w-5 h-5 mr-2 text-purple-500 dark:text-purple-400" />
              Month <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="relative">
              <div className="space-y-2">
                <Select
                  name="month"
                  value={formik.values.type.toString()}
                  onValueChange={(value) =>
                    formik.setFieldValue("month", value)
                  }
                >
                  <SelectTrigger
                    className={`w-full cursor-pointer px-5 py-8 border-2 rounded-2xl focus:ring-4 focus:ring-purple-200 dark:focus:ring-purple-700/50 focus:border-purple-500 dark:focus:border-purple-400 transition-all duration-300 appearance-none bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm text-lg font-medium text-gray-900 dark:text-white ${
                      formik.touched.month && formik.errors.month
                        ? "border-red-500 focus:ring-red-200 dark:focus:ring-red-700/50 focus:border-red-500 dark:focus:border-red-400"
                        : "border-gray-200 dark:border-gray-600"
                    }`}
                  >
                    <SelectValue placeholder="Select a category">
                      {monthOptions?.find(
                        (items: any) => items?.value == formik.values?.month
                      )?.label || "Select type"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-800 shadow-sm dark:shadow-gray-900/50 border border-gray-200 dark:border-gray-700">
                    {monthOptions?.map((type: any, index) => (
                      <SelectItem
                        className="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-100 dark:focus:bg-gray-700 transition-colors duration-200"
                        key={index}
                        value={type.value}
                      >
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormErrorMessage name="type" formik={formik} />
              </div>
            </div>
          </div>
        )}

        {/* Year */}
        <div className="space-y-3 group">
          <label className="flex items-center text-lg font-semibold text-gray-800 dark:text-gray-200 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-200">
            <Calendar1Icon className="w-5 h-5 mr-2 text-purple-500 dark:text-purple-400" />
            Year <span className="text-red-500 ml-1">*</span>
          </label>
          <div className="relative">
            <div className="space-y-2">
              <Select
                name="year"
                value={formik.values.year.toString()}
                onValueChange={(value) => formik.setFieldValue("year", value)}
              >
                <SelectTrigger
                  className={`w-full cursor-pointer px-5 py-8 border-2 rounded-2xl focus:ring-4 focus:ring-purple-200 dark:focus:ring-purple-700/50 focus:border-purple-500 dark:focus:border-purple-400 transition-all duration-300 appearance-none bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm text-lg font-medium text-gray-900 dark:text-white ${
                    formik.touched.year && formik.errors.year
                      ? "border-red-500 focus:ring-red-200 dark:focus:ring-red-700/50 focus:border-red-500 dark:focus:border-red-400"
                      : "border-gray-200 dark:border-gray-600"
                  }`}
                >
                  <SelectValue placeholder="Select a year">
                    {budgetYears?.find(
                      (items: any) => items?.value == formik.values?.year
                    )?.label || "Select a year"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 shadow-sm dark:shadow-gray-900/50 border border-gray-200 dark:border-gray-700">
                  {budgetYears?.map((type: any, index) => (
                    <SelectItem
                      className="text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-100 dark:focus:bg-gray-700 transition-colors duration-200"
                      key={index}
                      value={type.value}
                    >
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormErrorMessage name="year" formik={formik} />
            </div>
          </div>
        </div>

        {/* Amount with enhanced styling */}
        <div className="space-y-3 group">
          <label className="flex items-center text-lg font-semibold text-gray-800 dark:text-gray-200 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-200">
            <DollarSign className="w-5 h-5 mr-2 text-purple-500 dark:text-purple-400" />
            Budget Amount <span className="text-red-500 ml-1">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <span className="text-purple-500 dark:text-purple-400 text-2xl font-bold">
                $
              </span>
            </div>
            <InputFiled
              type="number"
              onError={formik.touched.amount && formik.errors.amount}
              name="amount"
              value={formik.values.amount}
              onChange={formik.handleChange}
              placeholder="0.00"
              className="w-full text-lg pl-12 pr-5 py-4 rounded-2xl border-2 border-gray-200 dark:border-gray-600 focus:border-purple-500 dark:focus:border-purple-400 focus:ring-4 focus:ring-purple-200 dark:focus:ring-purple-700/50 transition-all duration-300 bg-white/70 dark:bg-gray-700/70 backdrop-blur-sm placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        <FormButtons isEditing={isEditing} formik={formik} />
      </form>
    </div>
  );
};

export default BudgetForm;
