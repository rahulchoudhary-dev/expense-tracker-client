"use client";

import React, { memo, useEffect, useState } from "react";
import { DollarSign } from "lucide-react";

import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { Label } from "../../../../components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "../../../../components/ui/input";
import { Textarea } from "../../../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormik } from "formik";
import useGetCategory from "@/query/category/useGetCategory";
import usePaymentMethods from "@/query/payment/useGetPaymentMethod";
import useAddExpenseMutation from "@/query/expense/useAddExpense";
import {
  useDismissToast,
  useShowError,
  useShowLoading,
  useShowSuccess,
} from "@/app/toastProvider";
import ExpenseDrawerHeader from "../../../../components/ExpenseDrawerHeader";
import { addExpenseSchema } from "@/validations/addExpense.validation";
import FormErrorMessage from "../../../../components/FormErrorMessage";
import useUpdateExpenseMutation from "@/query/expense/useUpdateExpense";
import DatePickerField from "./DatePickerField";
import FormActionButtons from "./FormActionButtons";
import useBootUser from "@/hooks/useBootUser";
import useUploadExpenseAttachments from "@/query/attachment/uploadExpenseAttachments";
import AttachmentUploader from "./AttachmentUploader";
import { AddExpenseDrawerProps, ExpenseFormData } from "./types";
import { TOAST_MESSAGES } from "@/constant";

const AddExpenseDrawer: React.FC<AddExpenseDrawerProps> = ({
  open,
  onOpenChange,
  expenseData,
  isEditMode,
}) => {
  const [attachmentFiles, setAttachmentFiles] = useState<File[]>([]);
  const { userId } = useBootUser();
  const showSuccessToast = useShowSuccess();
  const showErrorToast = useShowError();
  const showLaoding = useShowLoading();
  const dismissToast = useDismissToast();
  const [expenseForm, setExpenseForm] = useState<ExpenseFormData>({
    date: new Date(),
    description: "",
    amount: 0,
    categoryId: 0,
    paymentMethodId: 0,
  });

  useEffect(() => {
    if (expenseData && isEditMode) {
      setExpenseForm({
        date: new Date(),
        description: expenseData.description,
        amount: expenseData.amount,
        categoryId: expenseData.Category.id,
        paymentMethodId: expenseData.PaymentMethod.id,
      });
    }
  }, [isEditMode, expenseData]);

  const { data: categories } = useGetCategory();
  const { data: paymentMethods } = usePaymentMethods();
  const { mutate: addExpenseMutation } = useAddExpenseMutation();

  const { mutate: updateExpenseMutation } = useUpdateExpenseMutation(
    Number(expenseData?.id)
  );
  const { mutate: uploadExpenseAttachmentsMutation } =
    useUploadExpenseAttachments();

  const uploadAttachmenthandler = (expenseId: number) => {
    const toastId = showLaoding(TOAST_MESSAGES.EXPENSE_UPLOAD_LOADING);

    const formData = new FormData();

    attachmentFiles.forEach((file) => {
      formData.append("files", file);
    });

    formData.append("expenseId", expenseId.toString());

    // 🔍 Log each key-value in FormData
    for (let [key, value] of formData.entries()) {
      // console.log(`${key}:`, value);
    }

    uploadExpenseAttachmentsMutation(formData, {
      onSuccess: () => {
        setAttachmentFiles([]);
        showSuccessToast(TOAST_MESSAGES.EXPENSE_UPLOAD_SUCCESS);
        dismissToast(toastId);
      },
      onError: (err) => {
        setAttachmentFiles([]);
        showErrorToast(err?.message);
      },
    });
  };

  const formik = useFormik({
    initialValues: expenseForm,
    enableReinitialize: true,
    validationSchema: addExpenseSchema,
    validateOnBlur: true,
    validateOnMount: true,
    validateOnChange: true,
    onSubmit: (values, { resetForm }) => {
      try {
        if (isEditMode) {
          updateExpenseMutation(
            { ...values, id: expenseData.id },
            {
              onSuccess: () => {
                showSuccessToast(TOAST_MESSAGES.EXPENSE_UPDATE_SUCCESS);
              },
              onError: (err) => {
                showErrorToast(err?.message);
              },
            }
          );
        } else {
          addExpenseMutation(
            { ...values, userId },
            {
              onSuccess: (res) => {
                if (attachmentFiles?.length) {
                  uploadAttachmenthandler(res?.data?.id);
                } else {
                  showSuccessToast(TOAST_MESSAGES.EXPENSE_ADD_SUCCESS);
                }
              },
              onError: (err) => {
                showErrorToast(err?.message);
              },
            }
          );
        }
      } catch (error) {
      } finally {
        resetForm();
        onOpenChange();
      }
    },
  });

  return (
    <Drawer open={open}>
      {" "}
      <DrawerContent className="max-w-2xl mb-12 mx-auto pt-4 md:pt-0 min-h-[400px]">
        <Tabs defaultValue="details" className="w-full px-4">
          {!isEditMode && (
            <TabsList className="w-full">
              <TabsTrigger value="details" className="cursor-pointer">
                Expense Details
              </TabsTrigger>
              {/* <Separator v /> */}
              <TabsTrigger value="attachments" className="cursor-pointer">
                Attachments
              </TabsTrigger>
            </TabsList>
          )}

          <TabsContent value="details">
            {" "}
            <ExpenseDrawerHeader />
            <form onSubmit={formik.handleSubmit}>
              <div className="px-4 space-y-6 ">
                <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
                  <div className="space-y-2 ">
                    <Label htmlFor="date">Date *</Label>
                    <DatePickerField formik={formik} />
                    <FormErrorMessage name="date" formik={formik} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount *</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        id="amount"
                        type="number"
                        name="amount"
                        value={formik.values.amount}
                        onChange={formik.handleChange}
                        className="pl-10"
                      />
                    </div>
                    <FormErrorMessage name="amount" formik={formik} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="What did you spend on?"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    className="resize-none"
                    rows={5}
                    cols={5}
                  />
                  <FormErrorMessage name="description" formik={formik} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      name="categoryId"
                      value={formik.values.categoryId.toString()}
                      onValueChange={(value) =>
                        formik.setFieldValue("categoryId", value)
                      }
                    >
                      <SelectTrigger className="w-full cursor-pointer">
                        <SelectValue placeholder="Select a category">
                          {categories?.find(
                            (items: any) =>
                              items?.id == formik.values?.categoryId
                          )?.name || "Select category"}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-gray-800 shadow-sm">
                        {categories?.map((cat: any) => (
                          <SelectItem
                            className="text-black dark:text-white"
                            key={cat.id}
                            value={cat.id}
                          >
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormErrorMessage name="categoryId" formik={formik} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="paymentMethod">Payment Method *</Label>
                    <Select
                      name="paymentMethodId"
                      value={formik.values.paymentMethodId.toString()}
                      onValueChange={(value) =>
                        formik.setFieldValue("paymentMethodId", value)
                      }
                    >
                      <SelectTrigger className="w-full cursor-pointer">
                        <SelectValue placeholder="Select a payment method">
                          {paymentMethods?.find(
                            (items: any) =>
                              items?.id == formik.values?.paymentMethodId
                          )?.name || "Select Payment Method"}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-gray-800 shadow-sm">
                        {paymentMethods?.map((payType: any) => (
                          <SelectItem key={payType.id} value={payType.id}>
                            {payType.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormErrorMessage name="paymentMethodId" formik={formik} />
                  </div>
                </div>
              </div>
              <FormActionButtons onCancel={() => onOpenChange()} />
            </form>
          </TabsContent>
          <TabsContent value="attachments" className="w-full mt-4">
            <AttachmentUploader
              attachmentFiles={attachmentFiles}
              setAttachmentFiles={setAttachmentFiles}
            />
          </TabsContent>
        </Tabs>
      </DrawerContent>
    </Drawer>
  );
};
export default memo(AddExpenseDrawer);
