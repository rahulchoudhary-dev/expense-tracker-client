"use client";

import Image from "next/image";
import InputFiled from "../../../components/InputFiled";
import useSignUp from "../../../query/useSignUp";
import validationSchema from "../../../validations/signup.validation";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useShowError, useShowSuccess } from "@/app/toastProvider";
import { useRouter } from "next/navigation";
import ROUTES from "@/routes";
import Link from "next/link";
import LoadingSpinner from "@/components/LoadingSpinner";
import appLogo from "../../../../public/app-logo-1.jpeg";
import { Button } from "@/components/ui/button";

const SignUp = () => {
  const router = useRouter();
  const showSuccess = useShowSuccess();
  const showError = useShowError();
  const [initialValues] = useState({
    firstName: "Travise",
    lastName: "Head",
    email: "@gmail.com",
    password: "Pass@1234",
    confirmPassword: "Pass@1234",
  });

  const { mutate, isPending } = useSignUp();

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validateOnBlur: true,
    validateOnChange: true,
    validateOnMount: true,
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      mutate(values, {
        onSuccess: () => {
          showSuccess("User Successfully Registed");
          router.push(ROUTES.SIGN_IN);
        },
        onError: (err) => {
          showError(err?.message);
        },
      });
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen gap-8 lg:gap-16">
          {/* Logo Section - Mobile Top, Desktop Right */}
          <div className="order-1 lg:order-2 flex-1 flex justify-center items-center max-w-lg lg:max-w-2xl">
            <div className="relative w-full max-w-md lg:max-w-lg xl:max-w-xl">
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
              <div className="absolute inset-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-2xl opacity-10 animate-pulse delay-1000"></div>

              {/* Logo container */}
              <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-gray-700/50">
                <Image
                  src={appLogo}
                  alt="Expendo Logo"
                  width={400}
                  height={400}
                  loading="lazy"
                  className="w-full h-auto object-contain rounded-2xl"
                />

                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full opacity-60 animate-bounce delay-300"></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full opacity-60 animate-bounce delay-700"></div>
              </div>
            </div>
          </div>

          {/* Form Section - Mobile Bottom, Desktop Left */}
          <div className="order-2 lg:order-1 flex-1 w-full max-w-md lg:max-w-lg">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-2xl rounded-3xl p-8 lg:p-10 border border-white/20 dark:border-gray-700/50">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl mb-4 shadow-lg">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    />
                  </svg>
                </div>
                <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent mb-3">
                  Join Us Today
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-sm lg:text-base">
                  Create your account and start your journey
                </p>
              </div>

              {/* Form */}
              <form onSubmit={formik.handleSubmit} className="space-y-5">
                {/* Name Fields Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <InputFiled
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      onChange={formik.handleChange}
                      value={formik.values.firstName}
                      className="w-full px-4 py-4 bg-gray-50/80 dark:bg-gray-800/80 border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 backdrop-blur-sm"
                      onError={
                        formik.touched.firstName && formik.errors.firstName
                      }
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
                      onError={
                        formik.touched.lastName && formik.errors.lastName
                      }
                    />
                  </div>
                </div>

                {/* Email Input */}
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

                {/* Password Input */}
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

                {/* Confirm Password Input */}
                <div className="space-y-2">
                  <InputFiled
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    onChange={formik.handleChange}
                    value={formik.values.confirmPassword}
                    className="w-full px-4 py-4 bg-gray-50/80 dark:bg-gray-800/80 border border-gray-200/50 dark:border-gray-700/50 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 backdrop-blur-sm"
                    onError={
                      formik.touched.confirmPassword &&
                      formik.errors.confirmPassword
                    }
                  />
                </div>

                {/* Terms and Privacy */}
                <div className="text-xs text-gray-600 dark:text-gray-400 bg-gray-50/50 dark:bg-gray-800/50 rounded-lg p-3 border border-gray-200/30 dark:border-gray-700/30">
                  By creating an account, you agree to our{" "}
                  <Link
                    href="/terms"
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition-colors duration-200 hover:underline"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition-colors duration-200 hover:underline"
                  >
                    Privacy Policy
                  </Link>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full py-6 cursor-pointer px-6 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-700 hover:via-indigo-700 hover:to-blue-700 disabled:from-gray-400 disabled:via-gray-500 disabled:to-gray-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:transform-none disabled:cursor-not-allowed focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 relative overflow-hidden"
                >
                  {/* Button background animation */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 hover:opacity-20 transition-opacity duration-300"></div>

                  {isPending ? (
                    <div className="flex items-center justify-center space-x-2 relative z-10">
                      <LoadingSpinner />
                      <span>Creating Account...</span>
                    </div>
                  ) : (
                    <span className="relative z-10 flex items-center justify-center space-x-2">
                      <span>Create Account</span>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </span>
                  )}
                </Button>

                {/* Sign In Link */}
                <div className="text-center pt-6 border-t border-gray-200/50 dark:border-gray-700/50">
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Already have an account?{" "}
                    <Link
                      href={ROUTES.SIGN_IN}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition-colors duration-200 hover:underline"
                    >
                      <span>Sign in here</span>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                        />
                      </svg>
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
