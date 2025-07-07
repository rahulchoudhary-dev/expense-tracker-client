"use client";

import Image from "next/image";
import InputFiled from "../../../components/InputFiled";
import useSignUp from "../../../query/useSignUp";
import validationSchema from "../../../validations/signup.validation";
import { useFormik } from "formik";
import React, { useState } from "react";

const SignUp = () => {
  const [initialValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const mutation = useSignUp();

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validateOnBlur: true,
    validateOnChange: true,
    validateOnMount: true,
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      mutation.mutate(values, {
        onSuccess: () => resetForm(),
      });
    },
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 font-sans">
      {/* Left - Form */}
      <div className="flex p-12 justify-center items-center h-screen">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
          <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
            Create Your Account
          </h2>
          <form onSubmit={formik.handleSubmit}>
            <InputFiled
              type="text"
              name="firstName"
              placeholder="First Name"
              onChange={formik.handleChange}
              value={formik.values.firstName}
              className="border border-gray-300 rounded-2xl p-4 w-full"
              onError={formik.touched.firstName && formik.errors.firstName}
            />
            <InputFiled
              type="text"
              name="lastName"
              placeholder="Last Name"
              onChange={formik.handleChange}
              value={formik.values.lastName}
              className="border border-gray-300 rounded-2xl p-4 w-full"
              onError={formik.touched.lastName && formik.errors.lastName}
            />
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
            <InputFiled
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
              className="border border-gray-300 rounded-2xl p-4 w-full"
              onError={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 cursor-pointer rounded-lg w-full mt-4 font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>

      {/* Right - Image */}
      <div className="hidden md:block h-screen">
        <Image
          width={100}
          height={100}
          loading="lazy"
          src="https://images.unsplash.com/photo-1709534486708-fb8f94150d0a?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Signup Visual"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default SignUp;
