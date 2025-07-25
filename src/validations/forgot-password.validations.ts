import * as Yup from "yup";

export const emailSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
});

export const otpSchema = Yup.object({
  email: Yup.string().email().required(),
  otp: Yup.string()
    .matches(/^\d{4}$/, "OTP must be 6 digits")
    .required("OTP is required"),
});

export const resetSchema = Yup.object({
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});
