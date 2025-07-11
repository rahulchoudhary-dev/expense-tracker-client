import * as Yup from "yup";

export const addExpenseSchema = Yup.object().shape({
  date: Yup.date()
    .required("Date is required")
    .typeError("Invalid date format"),

  description: Yup.string()
    .required("Description is required")
    .min(3, "Description must be at least 3 characters"),

  amount: Yup.string()
    .required("Amount is required")
    .matches(/^\d+$/, "Amount must be a valid number"),

  categoryId: Yup.string()
    .required("Category is required")
    .notOneOf(["0"], "Please select a valid category"),

  paymentMethodId: Yup.string()
    .required("Payment method is required")
    .notOneOf(["0", ""], "Please select a valid payment method"),
});
