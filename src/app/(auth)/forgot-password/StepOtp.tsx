import React from "react";
import OTPVerificationPage from "./OtpInput";

const StepOtp = ({
  formik,
  userEmail,
  handleResendOtp,
  isEmailSubmitting,
}: any) => (
  <div className="space-y-4">
    <div className="text-center mb-6">
      <h2 className="text-2xl font-bold mb-2">Verify OTP</h2>
      <p className="text-gray-600 dark:text-gray-400">
        We've sent a 6-digit code to{" "}
        <span className="font-medium">{userEmail || formik.values.email}</span>
      </p>
    </div>
    <OTPVerificationPage formik={formik} />
  </div>
);

export default StepOtp;
