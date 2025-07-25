import React from "react";
import ResetPassword from "./reset-password";

const StepReset = ({ formik }: any) => (
  <div className="space-y-4">
    <div className="text-center mb-6">
      <h2 className="text-2xl font-bold mb-2">Reset Password</h2>
      <p className="text-gray-600 dark:text-gray-400">
        Create a new password for your account
      </p>
    </div>
    <ResetPassword formik={formik} />
  </div>
);

export default StepReset;
