"use client";

import React from "react";
import { useFormik } from "formik";
import createBudgetDto from "@/validations/createBudget.dto";
import BudgetHeader from "./CreateBudgetFormHeader";
import BudgetForm from "./BudgetForm";
import BudgetGuide from "./BudgetGuide";
import useCreateBudgetMutation from "@/query/budget/useCreateBudget";
import useUpdateBudgetMutation from "@/query/budget/useUpdateBudget";
import { useShowError, useShowSuccess } from "@/app/toastProvider";
import { TOAST_MESSAGES } from "@/constant";
import { Button } from "@/components/ui/button";
import { Budget, BudgetFormValues } from "../types";

type CreateBudgetProps = {
  setIsCreateBudget: React.Dispatch<React.SetStateAction<boolean>>;
  editBudgetData?: Budget;
  setEditBudgetData: React.Dispatch<React.SetStateAction<any>>;
};

const CreateBudget: React.FC<CreateBudgetProps> = ({
  setIsCreateBudget,
  editBudgetData,
  setEditBudgetData,
}) => {
  const isEditing = !!editBudgetData;

  const currentYear = new Date().getFullYear();
  const showSuccessToast = useShowSuccess();
  const showErrorToast = useShowError();
  const { mutate: createBudget } = useCreateBudgetMutation();
  const { mutate: updateBudget } = useUpdateBudgetMutation();

  const formik = useFormik<BudgetFormValues>({
    initialValues: {
      title: editBudgetData?.title || "",
      type: editBudgetData?.type || "yearly",
      month:
        editBudgetData?.type === "monthly"
          ? editBudgetData?.month?.toString() || ""
          : null,
      year: editBudgetData?.year?.toString() || currentYear.toString(),
      amount: editBudgetData?.amount?.toString() || "",
    },
    validationSchema: createBudgetDto,
    enableReinitialize: true,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      if (values.type === "yearly") values.month = null;

      const payload = { ...values };

      const onSuccess = () => {
        showSuccessToast(
          editBudgetData
            ? TOAST_MESSAGES.BUDGET_UPDATED
            : TOAST_MESSAGES.BUDGET_CREATED
        );
        resetForm();
        setSubmitting(false);
        setIsCreateBudget(false);
      };

      const onError = (error: any) => {
        setSubmitting(false);
        showErrorToast(error.message || TOAST_MESSAGES.ERROR_GENERIC);
      };

      if (editBudgetData) {
        updateBudget(
          { ...payload, id: editBudgetData.id },
          { onSuccess, onError }
        );
      } else {
        createBudget(payload, { onSuccess, onError });
      }
    },
  });

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <BudgetHeader />
        <Button
          type="button"
          onClick={() => {
            setIsCreateBudget(false);
            setEditBudgetData(null);
          }}
          variant="outline"
          className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
        >
          Show Budget List
        </Button>
      </div>
      {editBudgetData && (
        <div className="mb-6 w-full px-6 py-3 border-l-4 border-blue-500 bg-blue-50 text-blue-700 rounded shadow-sm">
          <strong>Editing Budget:</strong> You are now editing the budget titled
          "<span className="font-semibold">{editBudgetData.title}</span>". Make
          your changes and click "Update".
        </div>
      )}

      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center relative overflow-hidden">
        {/* Background decorative pulses */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-br from-green-400 to-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000" />
        </div>

        {/* Form and Guide */}
        <div className="flex flex-col lg:flex-row gap-10 items-start justify-between w-full max-w-5xl z-10">
          <BudgetForm isEditing={isEditing} formik={formik} />
          <BudgetGuide />
        </div>
      </div>
    </>
  );
};

export default CreateBudget;
