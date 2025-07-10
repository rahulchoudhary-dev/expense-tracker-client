"use client";

import withAuth from "@/hoc/withAuth";
import useBootUser from "@/query/useBootUser";
import React from "react";

const ExpenseDashBoard = () => {
  const { email } = useBootUser();
  console.log("email", email);
  return <div>ExpenseDashBoard</div>;
};

export default withAuth(ExpenseDashBoard);
