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
import appLogo from "../../../../public/app-logo-2.jpeg";

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
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen bg-gradient-to-br from-purple-300 via-blue-200 to-pink-100 font-sans">
      {/* Left - Form */}
      <div className="flex py-12 px-6 justify-center items-center h-screen">
        <div className="w-full dark:bg-gray-900 bg-white shadow-2xl max-w-md rounded-3xl p-6">
          <h2 className="text-3xl font-bold text-center text-muted mb-6">
            Sign In To Your Account
          </h2>
          <form onSubmit={formik.handleSubmit}>
            <InputFiled
              type="email"
              name="email"
              placeholder="Email"
              onChange={formik.handleChange}
              value={formik.values.email}
              className="border border-gray-300 rounded-2xl p-4 w-full"
              onError={formik.touched.email && formik.errors.email}
            />
            <InputFiled
              type="password"
              name="password"
              placeholder="Password"
              onChange={formik.handleChange}
              value={formik.values.password}
              className="border border-gray-300 rounded-2xl p-4 w-full"
              onError={formik.touched.password && formik.errors.password}
            />

            <div className="flex justify-between items-center mt-2 mb-4 text-sm">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="form-checkbox text-blue-500"
                />
                <span className="text-gray-700 dark:text-white">
                  Remember Me
                </span>
              </label>
              <Link
                href="/forgot-password"
                className="text-blue-600 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="disabled:bg-gray-400 spin-in bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 cursor-pointer rounded-lg w-full mt-2 font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
            >
              {isPending ? <LoadingSpinner /> : "Sign In"}
            </button>

            <p className="text-center mt-4 text-sm text-gray-700 dark:text-white">
              Don't have an account?{" "}
              <Link href="/signup" className="text-blue-600 hover:underline">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Right - Image */}
      <div className="hidden md:block h-screen">
        <Image
          src={appLogo}
          alt="Expendo Logo"
          width={1000}
          height={1000}
          loading="lazy"
          className="object-contain"
        />
      </div>
    </div>
  );
};

export default SignIn;
