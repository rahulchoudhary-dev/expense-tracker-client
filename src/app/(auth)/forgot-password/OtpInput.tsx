import React, { useState } from "react";
import OtpInput from "react-otp-input";

export default function OTPVerificationPage({ formik }: any) {
  console.log("formik", formik);
  return (
    <div className="flex items-center justify-center h-96 bg-gray-50 px-4">
      <div className="bg-white p-6 rounded-xl shadow-md max-w-sm w-full">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
          Enter OTP
        </h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          We've sent a 4-digit verification code to your email.
        </p>
        <OtpInput
          value={formik.values.otp}
          onChange={(otp) => formik.setFieldValue("otp", otp)}
          numInputs={4}
          inputStyle={{
            width: "3rem",
            height: "3rem",
            margin: "0 0.25rem",
            fontSize: "1.5rem",
            borderRadius: "0.5rem",
            border: "1px solid #ccc",
            textAlign: "center",
          }}
          renderSeparator={<span className="mx-1">-</span>}
          renderInput={(props) => <input {...props} />}
        />
      </div>
    </div>
  );
}
