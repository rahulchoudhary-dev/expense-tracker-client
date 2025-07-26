"use client";

import { useFormik } from "formik";
import React, { useState } from "react";
import { useShowError, useShowSuccess } from "@/app/toastProvider";
import { useRouter } from "next/navigation";
import ROUTES from "@/routes";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import useSignUp from "@/query/auth/useSignUp";
import signUpDto from "@/validations/signup.validation";
import InputFiled from "@/components/InputFiled";
import TermsNotice from "./TermsNotice";
import { MoveRight } from "lucide-react";
import AlreadyHaveAccountNotice from "../../_components/AlreadyHaveAccountNotice";
import { TOAST_MESSAGES } from "@/constant";
import { SignUpFormValues } from "../type";

const SignUpForm = () => {
  const router = useRouter();

  const showSuccessToast = useShowSuccess();
  const showErrorToast = useShowError();

  const [initialValues] = useState<SignUpFormValues>({
    firstName: "Travise",
    lastName: "Head",
    email: "@gmail.com",
    password: "Pass@1234",
    confirmPassword: "Pass@1234",
  });

  const { mutate, isPending } = useSignUp();

  const formik = useFormik<SignUpFormValues>({
    initialValues,
    enableReinitialize: true,
    validateOnBlur: true,
    validateOnChange: true,
    validateOnMount: true,
    validationSchema: signUpDto,
    onSubmit: (values, { resetForm }) => {
      mutate(values, {
        onSuccess: () => {
          resetForm();
          showSuccessToast(TOAST_MESSAGES.SIGN_UP_SUCCESS);
          router.push(ROUTES.SIGN_IN);
        },
        onError: (err) => {
          showErrorToast(err?.message);
        },
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <InputFiled
            type="text"
            name="firstName"
            placeholder="First Name"
            onChange={formik.handleChange}
            value={formik.values.firstName}
            className="w-full px-4 py-4 bg-gray-50/80 dark:bg-gray-800/80 border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 backdrop-blur-sm"
            onError={formik.touched.firstName && formik.errors.firstName}
          />
        </div>

        <div className="space-y-2">
          <InputFiled
            type="text"
            name="lastName"
            placeholder="Last Name"
            onChange={formik.handleChange}
            value={formik.values.lastName}
            className="w-full px-4 py-4 bg-gray-50/80 dark:bg-gray-800/80 border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 backdrop-blur-sm"
            onError={formik.touched.lastName && formik.errors.lastName}
          />
        </div>
      </div>

      <div className="space-y-2">
        <InputFiled
          type="email"
          name="email"
          placeholder="Enter your email address"
          onChange={formik.handleChange}
          value={formik.values.email}
          className="w-full px-4 py-4 bg-gray-50/80 dark:bg-gray-800/80 border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 backdrop-blur-sm"
          onError={formik.touched.email && formik.errors.email}
        />
      </div>

      <div className="space-y-2">
        <InputFiled
          type="password"
          name="password"
          placeholder="Create a strong password"
          onChange={formik.handleChange}
          value={formik.values.password}
          className="w-full px-4 py-4 bg-gray-50/80 dark:bg-gray-800/80 border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 backdrop-blur-sm"
          onError={formik.touched.password && formik.errors.password}
        />
      </div>

      <div className="space-y-2">
        <InputFiled
          type="password"
          name="confirmPassword"
          placeholder="Confirm your password"
          onChange={formik.handleChange}
          value={formik.values.confirmPassword}
          className="w-full px-4 py-4 bg-gray-50/80 dark:bg-gray-800/80 border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 backdrop-blur-sm"
          onError={
            formik.touched.confirmPassword && formik.errors.confirmPassword
          }
        />
      </div>
      <TermsNotice />
      <Button
        type="submit"
        disabled={isPending}
        className="w-full py-6 cursor-pointer px-6 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-700 hover:via-indigo-700 hover:to-blue-700 disabled:from-gray-400 disabled:via-gray-500 disabled:to-gray-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:transform-none disabled:cursor-not-allowed focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
        {isPending ? (
          <div className="flex items-center justify-center space-x-2 relative z-10">
            <LoadingSpinner />
            <span>Creating Account...</span>
          </div>
        ) : (
          <span className="relative z-10 flex items-center justify-center space-x-2">
            <span>Create Account</span>
            <MoveRight />
          </span>
        )}
      </Button>
      <AlreadyHaveAccountNotice lable={"Already have an account?"} />
    </form>
  );
};

export default SignUpForm;
