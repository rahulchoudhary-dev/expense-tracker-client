"use client";

import React, { useState } from "react";
import { CalendarIcon, DollarSign } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { cn } from "@/utils";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormik } from "formik";
import useGetCategory from "@/query/useGetCategory";
import usePaymentMethods from "@/query/useGetPaymentMethod";
import useAddExpenseMutation from "@/query/useAddExpense";
import { useShowError, useShowSuccess } from "@/app/toastProvider";
import ExpenseDrawerHeader from "./ExpenseDrawerHeader";
import OpenExpenseDrawerButton from "./OpenExpenseDrawerButton";
import { iExpenseFormData } from "@/interfaces/expense";
import useBootUser from "@/hooks/useBootUser";
import { addExpenseSchema } from "@/validations/addExpense.validation";
import FormErrorMessage from "./FormErrorMessage";

export function AddExpenseDrawer() {
  const showSuccessToast = useShowSuccess();
  const showErrorToast = useShowError();
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState<boolean>(false);

  const [expenseForm, setExpenseForm] = useState<iExpenseFormData>({
    date: new Date(),
    description: "",
    amount: "",
    categoryId: "",
    paymentMethodId: "",
  });
  const { id: userId } = useBootUser();

  const { data: categories } = useGetCategory();
  const { data: paymentMethods } = usePaymentMethods();
  const { mutate } = useAddExpenseMutation();

  const formik = useFormik({
    initialValues: expenseForm,
    enableReinitialize: true,
    validationSchema: addExpenseSchema,
    validateOnBlur: true,
    validateOnMount: true,
    validateOnChange: true,
    onSubmit: (values, { resetForm }) => {
      mutate(
        { ...values, userId },
        {
          onSuccess: () => {
            showSuccessToast("Expense Added SuccessFully");
            resetForm();
            setIsExpenseModalOpen(false);
          },
          onError: (err) => {
            showErrorToast(err?.message);
          },
        }
      );
    },
  });

  return (
    <Drawer open={isExpenseModalOpen}>
      <DrawerTrigger asChild>
        <OpenExpenseDrawerButton onClick={() => setIsExpenseModalOpen(true)} />
      </DrawerTrigger>
      <DrawerContent className="max-w-2xl mb-12 mx-auto">
        <form onSubmit={formik.handleSubmit}>
          <ExpenseDrawerHeader />
          <div className="px-4 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal cursor-pointer",
                        !formik.values.date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {expenseForm.date
                        ? format(formik.values.date, "PPP")
                        : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      autoFocus={true}
                      mode="single"
                      selected={formik.values?.date}
                      onSelect={(date) =>
                        date && formik.setFieldValue("date", date)
                      }
                    />
                  </PopoverContent>
                </Popover>
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
                  value={formik.values.categoryId}
                  onValueChange={(value) =>
                    formik.setFieldValue("categoryId", value)
                  }
                >
                  <SelectTrigger className="w-full cursor-pointer">
                    <SelectValue placeholder="Select a category">
                      {categories?.find(
                        (items: any) => items?.id == formik.values?.categoryId
                      )?.name || "Select category"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {categories?.map((cat: any) => (
                      <SelectItem
                        className="text-white"
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
                  value={formik.values.paymentMethodId}
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
                  <SelectContent>
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

          <div className="grid grid-cols-2 gap-4 w-auto mx-4 mt-4">
            <Button
              onClick={() => setIsExpenseModalOpen(false)}
              type="reset"
              className="bg-red-500 hover:bg-red-400 w-full cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="w-full cursor-pointer bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700"
            >
              Submit
            </Button>
          </div>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
