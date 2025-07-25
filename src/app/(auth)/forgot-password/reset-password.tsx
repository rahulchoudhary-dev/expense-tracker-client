"use client";

import React, { memo } from "react";

import InputFiled from "@/components/InputFiled";

const ResetPassword = ({ formik }: any) => {
  return (
    <>
      <div className="space-y-2">
        <InputFiled
          type="password"
          name="password"
          placeholder="Enter New Password"
          onChange={formik.handleChange}
          value={formik.values.password}
          className="w-full px-4 py-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          onError={formik.touched.password && formik.errors.password}
        />
      </div>
      <div className="space-y-2">
        <InputFiled
          type="confirmPassword"
          name="confirmPassword"
          placeholder="Confirm New Password"
          onChange={formik.handleChange}
          value={formik.values.confirmPassword}
          className="w-full px-4 py-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          onError={
            formik.touched.confirmPassword && formik.errors.confirmPassword
          }
        />
      </div>
    </>
  );
};

export default memo(ResetPassword);
