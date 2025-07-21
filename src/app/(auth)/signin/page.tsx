"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useFormik } from "formik";
import useSignIn from "@/query/useSignIn";
import { storage } from "@/utils/storageUtils";
import { useRouter } from "next/navigation";
import ROUTES from "@/routes";
import { useShowError, useShowSuccess } from "@/app/toastProvider";
import SignInDto from "@/validations/signin.validation";
import { STORAGE_KEYS } from "@/constant";
import InputFiled from "@/components/InputFiled";
import Link from "next/link";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useDispatch } from "react-redux";
import { setAuthTokens, setUser } from "@/redux/slices/userSlice";
import appLogo from "../../../../public/app-logo-1.jpeg";
import { Button } from "@/components/ui/button";

const SignIn = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const showSuccess = useShowSuccess();
  const showError = useShowError();

  const [rememberMe, setRememberMe] = useState(false);
  const [initialValues] = useState({
    email: "",
    password: "",
  });

  const { mutate, isPending } = useSignIn();

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validateOnBlur: true,
    validateOnChange: true,
    validateOnMount: true,
    validationSchema: SignInDto,
    onSubmit: (values, { resetForm }) => {
      mutate(values, {
        onSuccess: (data: any) => {
          const { access_token, refresh_token, userMedia, ...user } =
            data?.data;
          dispatch(setUser({ ...user, profileUrl: userMedia?.url }));
          dispatch(setAuthTokens({ access_token, refresh_token }));
          showSuccess("Sign In Successfully");
          router.push(ROUTES.DASHBOARD);
          if (rememberMe) {
            storage.set(STORAGE_KEYS.REMEMBER_ME, true);
            storage.set(STORAGE_KEYS.EMAIL, values.email);
            storage.set(STORAGE_KEYS.PASSWORD, values.password);
          } else {
            storage.remove(STORAGE_KEYS.REMEMBER_ME);
            storage.remove(STORAGE_KEYS.EMAIL);
            storage.remove(STORAGE_KEYS.PASSWORD);
          }
          resetForm();
        },
        onError: (err) => {
          showError(
            err?.message || "Something went wrong, please try again later."
          );
        },
      });
    },
  });

  useEffect(() => {
    const rememberMeValue = storage.get(STORAGE_KEYS.REMEMBER_ME);
    if (rememberMeValue) {
      setRememberMe(true);
      const email = storage.get(STORAGE_KEYS.EMAIL);
      const password = storage.get(STORAGE_KEYS.PASSWORD);
      initialValues.password = password || "";
      initialValues.email = email || "";
      if (email && password) {
        formik.setFieldValue("password", password);
        formik.setFieldValue("email", email);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen gap-8 lg:gap-16">
          {/* Logo Section - Mobile Top, Desktop Right */}
          <div className="hidden  order-1 lg:order-2 flex-1 md:flex justify-center items-center max-w-lg lg:max-w-2xl">
            <div className="relative w-full max-w-md lg:max-w-lg xl:max-w-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
              <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl border border-gray-100 dark:border-gray-700">
                <Image
                  src={appLogo}
                  alt="Expendo Logo"
                  width={400}
                  height={400}
                  loading="lazy"
                  className="w-full h-auto object-contain rounded-2xl"
                />
              </div>
            </div>
          </div>

          {/* Form Section - Mobile Bottom, Desktop Left */}
          <div className="order-2 lg:order-1 flex-1 w-full max-w-md lg:max-w-lg">
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-2xl rounded-3xl p-8 lg:p-10 border border-gray-200/50 dark:border-gray-700/50">
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-3">
                  Welcome Back
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-sm lg:text-base">
                  Sign in to your account to continue
                </p>
              </div>

              {/* Form */}
              <form onSubmit={formik.handleSubmit} className="space-y-6">
                {/* Email Input */}
                <div className="space-y-2">
                  <InputFiled
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    className="w-full px-4 py-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    onError={formik.touched.email && formik.errors.email}
                  />
                </div>

                {/* Password Input */}
                <div className="space-y-2">
                  <InputFiled
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    className="w-full px-4 py-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    onError={formik.touched.password && formik.errors.password}
                  />
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 text-sm">
                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="sr-only"
                      />
                      <div
                        className={`w-5 h-5 rounded border-2 transition-all duration-200 ${
                          rememberMe
                            ? "bg-blue-500 border-blue-500"
                            : "border-gray-300 dark:border-gray-600 group-hover:border-blue-400"
                        }`}
                      >
                        {rememberMe && (
                          <svg
                            className="w-3 h-3 text-white absolute top-0.5 left-0.5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300 select-none">
                      Remember me
                    </span>
                  </label>

                  <Link
                    href="/forgot-password"
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors duration-200 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full py-6 px-6 cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:transform-none disabled:cursor-not-allowed focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                >
                  {isPending ? (
                    <div className="flex items-center justify-center space-x-2">
                      <LoadingSpinner />
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    "Sign In"
                  )}
                </Button>

                {/* Sign Up Link */}
                <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Don't have an account?{" "}
                    <Link
                      href="/signup"
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition-colors duration-200 hover:underline"
                    >
                      Create one now
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

export default SignIn;
