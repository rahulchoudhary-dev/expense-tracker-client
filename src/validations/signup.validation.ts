import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "First name must be at least 2 characters")
    .required("First name is required"),

  lastName: Yup.string()
    .min(2, "Last name must be at least 2 characters")
    .required("Last name is required"),

  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), ""], "Passwords must match")
    .required("Confirm Password is required"),
});

export default validationSchema;
