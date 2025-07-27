import * as Yup from "yup";
const currentYear = new Date().getFullYear();

const createBudgetDto = Yup.object({
  title: Yup.string()
    .required("Budget title is required")
    .min(3, "Title must be at least 3 characters")
    .max(50, "Title must be less than 50 characters"),
  type: Yup.string()
    .oneOf(["monthly", "yearly"], "Invalid budget type")
    .required("Budget type is required"),
  month: Yup.number().when("type", {
    is: "monthly",
    then: (schema) =>
      schema
        .required("Month is required for monthly budget")
        .min(1, "Month must be between 1 and 12")
        .max(12, "Month must be between 1 and 12"),
    otherwise: (schema) => schema.nullable(),
  }),
  year: Yup.number()
    .required("Year is required")
    .min(2020, "Year must be 2020 or later")
    .max(currentYear + 10, `Year must be ${currentYear + 10} or earlier`),
  amount: Yup.number()
    .required("Amount is required")
    .positive("Amount must be positive")
    .min(1, "Amount must be at least $1")
    .max(1000000, "Amount must be less than $1,000,000"),
});

export default createBudgetDto;
