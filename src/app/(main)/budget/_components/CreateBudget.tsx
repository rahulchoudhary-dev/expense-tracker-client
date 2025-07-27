"use client";

import React from "react";
import { useFormik } from "formik";
import createBudgetDto from "@/validations/createBudget.dto";
import BudgetHeader from "./CreateBudgetFormHeader";

import BudgetForm from "./BudgetForm";
import BudgetGuide from "./BudgetGuide";
import useCreateBudgetMutation from "@/query/budget/useCreateBudget";
import { useShowError, useShowSuccess } from "@/app/toastProvider";
import { TOAST_MESSAGES } from "@/constant";
import { Button } from "@/components/ui/button";
type CreateBudgetProps = {
  setIsCreateBudget: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateBudget: React.FC<CreateBudgetProps> = ({ setIsCreateBudget }) => {
  const currentYear = new Date().getFullYear();
  const showSuccessToast = useShowSuccess();
  const showErrorToast = useShowError();
  const { mutate } = useCreateBudgetMutation();

  const formik = useFormik<BudgetFormValues>({
    initialValues: {
      title: "",
      type: "yearly",
      month: null,
      year: currentYear.toString(),
      amount: "",
    },
    validationSchema: createBudgetDto,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      if (values.type === "yearly") {
        values.month = null;
      }

      mutate(values, {
        onSuccess: () => {
          showSuccessToast("Budget Created Successfully");
          resetForm();
          setSubmitting(false);
        },
        onError: (error) => {
          setSubmitting(false);
          showErrorToast(error.message || TOAST_MESSAGES.ERROR_GENERIC);
        },
      });
    },
  });
  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <BudgetHeader />
        </div>
        <div className="">
          <Button
            type="button"
            onClick={() => setIsCreateBudget(false)}
            variant={"outline"}
            className="bg-gradient-to-r cursor-pointer from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Show Budget List{" "}
          </Button>
        </div>
      </div>
      <div className="min-h-screen gap-6 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center relative overflow-hidden">
        {/* Background decorative elements */}

        <div>
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-br from-green-400 to-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
          </div>
          <div className="flex items-center justify-between"></div>
          <BudgetForm formik={formik} />

          {/* Enhanced Help Text */}
          {/* </div> */}
        </div>
        <div>
          <BudgetGuide />
        </div>
      </div>
    </>
  );
};

export default CreateBudget;
