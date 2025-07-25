"use client";

import React, { memo, useState } from "react";
import { useFormik } from "formik";
import { useShowError, useShowSuccess } from "@/app/toastProvider";
import { Button } from "@/components/ui/button";
import useForgotPassword from "@/query/auth/useForgotPassword";
import useVerifyOTP from "@/query/auth/useVerifyOtp";
import useResetPassword from "@/query/auth/useResetPassword";
import { useRouter } from "next/navigation";
import ROUTES from "@/routes";
import { getCurrentValidationSchema } from "./utils";
import StepIndicator from "./StepIndicator";
import StepBackButton from "./StepBackButton";
import StepReset from "./StepReset";
import StepOtp from "./StepOtp";
import StepEmail from "./StepEmail";

const ForgotPasswordForm = () => {
  const router = useRouter();
  const showSuccessToast = useShowSuccess();
  const showErrorToast = useShowError();

  const [step, setStep] = useState<"email" | "otp" | "reset">("email");
  const [resetPassToken, setResetPassToken] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");

  const { mutate: forgotPassMutation, isPending: isEmailSubmitting } =
    useForgotPassword();
  const { mutate: otpVerifyMutation, isPending: isOtpVerifying } =
    useVerifyOTP();
  const { mutate: resetPassMutation, isPending: isResetPass } =
    useResetPassword();

  const formik = useFormik({
    initialValues: {
      email: "",
      otp: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: getCurrentValidationSchema(step),
    enableReinitialize: true,
    validateOnMount: false,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async (values) => {
      try {
        if (step === "email") {
          forgotPassMutation(
            { email: values.email },
            {
              onSuccess: (response: any) => {
                showSuccessToast(response?.message || "OTP sent successfully");
                setUserEmail(values.email);
                setStep("otp");
                formik.setFieldValue("otp", "");
              },
              onError: (err: any) => {
                showErrorToast(err?.message || "Failed to send OTP");
              },
            }
          );
        } else if (step === "otp") {
          otpVerifyMutation(
            { email: userEmail || values.email, otp: values.otp },
            {
              onSuccess: (response: any) => {
                console.log("OTP Verification Response:", response);
                const token = response?.data?.resetPassToken;
                if (!token) {
                  showErrorToast(
                    "Invalid response from server. Please try again."
                  );
                  return;
                }
                setResetPassToken(token);
                showSuccessToast(
                  response?.message || "OTP verified successfully"
                );
                setStep("reset");
                formik.setFieldValue("password", "");
                formik.setFieldValue("confirmPassword", "");
              },
              onError: (err: any) => {
                showErrorToast(
                  err?.message || "Invalid OTP. Please try again."
                );
              },
            }
          );
        } else if (step === "reset") {
          if (!resetPassToken) {
            showErrorToast("Session expired. Please start over.");
            handleBackToEmail();
            return;
          }
          resetPassMutation(
            {
              email: userEmail || values.email,
              otp: values.otp,
              password: values.password,
              resetPassToken: resetPassToken,
            },
            {
              onSuccess: (response: any) => {
                showSuccessToast(
                  response?.message || "Password reset successfully"
                );
                formik.resetForm();
                setResetPassToken("");
                setUserEmail("");
                router.push(ROUTES.SIGN_IN);
              },
              onError: (err: any) => {
                showErrorToast(err?.message || "Failed to reset password");
              },
            }
          );
        }
      } catch (error) {
        showErrorToast("An unexpected error occurred. Please try again.");
      }
    },
  });

  const handleBackToEmail = () => {
    setStep("email");
    setResetPassToken("");
    setUserEmail("");
    formik.resetForm();
  };

  const handleBackToPrevious = () => {
    if (step === "otp") {
      setStep("email");
    } else if (step === "reset") {
      setStep("otp");
      formik.setFieldValue("password", "");
      formik.setFieldValue("confirmPassword", "");
    }
  };

  const getButtonText = () => {
    switch (step) {
      case "email":
        return isEmailSubmitting ? "Sending OTP..." : "Send OTP";
      case "otp":
        return isOtpVerifying ? "Verifying..." : "Verify OTP";
      case "reset":
        return isResetPass ? "Resetting Password..." : "Reset Password";
      default:
        return "Continue";
    }
  };

  const isFormValid = () => {
    switch (step) {
      case "email":
        return formik.values.email && !formik.errors.email;
      case "otp":
        return formik.values.otp && !formik.errors.otp;
      case "reset":
        return (
          formik.values.password &&
          formik.values.confirmPassword &&
          !formik.errors.password &&
          !formik.errors.confirmPassword
        );
      default:
        return false;
    }
  };
  const isLoading = isEmailSubmitting || isOtpVerifying || isResetPass;
  return (
    <div className="w-full max-w-md mx-auto">
      <StepIndicator step={step} />
      <StepBackButton
        step={step}
        handleBack={handleBackToPrevious}
        isLoading={isLoading}
      />
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {step === "email" && <StepEmail formik={formik} />}
        {step === "otp" && (
          <StepOtp
            formik={formik}
            userEmail={userEmail}
            isEmailSubmitting={isEmailSubmitting}
          />
        )}
        {step === "reset" && <StepReset formik={formik} />}
        <Button
          type="submit"
          disabled={isLoading || !isFormValid()}
          className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-xl shadow-lg hover:scale-[1.02] disabled:hover:scale-100 transition-all duration-200 disabled:cursor-not-allowed"
        >
          {getButtonText()}
        </Button>

        {step === "otp" && (
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Didn't receive the code?{" "}
              <button
                type="button"
                onClick={() => {
                  formik.setFieldValue("otp", "");
                  forgotPassMutation(
                    { email: userEmail || formik.values.email },
                    {
                      onSuccess: (response: any) => {
                        showSuccessToast("OTP resent successfully");
                      },
                      onError: (err: any) => {
                        showErrorToast("Failed to resend OTP");
                      },
                    }
                  );
                }}
                disabled={isEmailSubmitting}
                className="text-blue-600 hover:text-blue-800 font-medium disabled:text-gray-400 disabled:cursor-not-allowed"
              >
                {isEmailSubmitting ? "Resending..." : "Resend OTP"}
              </button>
            </p>
          </div>
        )}
      </form>
    </div>
  );
};

export default memo(ForgotPasswordForm);
