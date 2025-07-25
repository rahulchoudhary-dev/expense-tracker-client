import React from "react";
import InputFiled from "@/components/InputFiled";

const StepEmail = ({ formik }: any) => (
  <div className="space-y-4">
    <div className="text-center mb-6">
      <h2 className="text-2xl font-bold mb-2">Forgot Password?</h2>
      <p className="text-gray-600 dark:text-gray-400">
        Enter your email address and we'll send you an OTP to reset your
        password.
      </p>
    </div>
    <InputFiled
      type="email"
      name="email"
      placeholder="Enter your email address"
      onChange={formik.handleChange}
      value={formik.values.email}
      className="w-full px-4 py-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500"
      onError={formik?.touched?.email && formik.errors.email}
    />
  </div>
);

export default StepEmail;
