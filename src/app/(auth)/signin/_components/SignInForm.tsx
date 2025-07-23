"use client";

import React, { memo, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { useFormik } from "formik";

import useSignIn from "@/query/auth/useSignIn";
import SignInDto from "@/validations/signin.validation";
import { setAuthTokens, setUser } from "@/redux/slices/userSlice";
import { storage } from "@/utils/storageUtils";
import { STORAGE_KEYS, TOAST_MESSAGES } from "@/constant";
import ROUTES from "@/routes";
import { useShowError, useShowSuccess } from "@/app/toastProvider";

import InputFiled from "@/components/InputFiled";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { SignInFormValues } from "../type";

const SignInForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const showSuccessToast = useShowSuccess();
  const showErrorToast = useShowError();

  const [rememberMe, setRememberMe] = useState(false);

  const { mutate, isPending: isSigningIn } = useSignIn();

  const [initialValues, setInitialValues] = useState<SignInFormValues>({
    email: "",
    password: "",
  });

  useEffect(() => {
    const isRemembered = storage.get(STORAGE_KEYS.REMEMBER_ME);

    if (isRemembered) {
      const storedEmail = storage.get(STORAGE_KEYS.EMAIL) || "";
      const storedPassword = storage.get(STORAGE_KEYS.PASSWORD) || "";

      setRememberMe(true);
      setInitialValues({ email: storedEmail, password: storedPassword });

      formik.setFieldValue(STORAGE_KEYS.EMAIL, storedEmail);
      formik.setFieldValue(STORAGE_KEYS.PASSWORD, storedPassword);
    }
  }, []);

  const formik = useFormik<SignInFormValues>({
    initialValues,
    enableReinitialize: true,
    validationSchema: SignInDto,
    validateOnMount: true,
    validateOnBlur: true,
    validateOnChange: true,

    onSubmit: (values, { resetForm }) => {
      mutate(values, {
        onSuccess: (response) => {
          const { access_token, refresh_token, userMedia, ...user } =
            response || {};

          dispatch(setUser({ ...user, profileUrl: userMedia?.url }));
          dispatch(setAuthTokens({ access_token, refresh_token }));

          showSuccessToast(TOAST_MESSAGES.SIGN_IN_SUCCESS);
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
          showErrorToast(err?.message || TOAST_MESSAGES.ERROR_GENERIC);
        },
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6">
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

      <Button
        type="submit"
        disabled={isSigningIn}
        className="w-full py-6 px-6 cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:transform-none disabled:cursor-not-allowed focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
      >
        {isSigningIn ? (
          <div className="flex items-center justify-center space-x-2">
            <LoadingSpinner />
            <span>Signing in...</span>
          </div>
        ) : (
          "Sign In"
        )}
      </Button>

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
  );
};

export default memo(SignInForm);
