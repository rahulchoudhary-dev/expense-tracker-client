"use client";

import { motion } from "framer-motion";
import { containerVariants } from "@/constant";
import React from "react";

export default function AnimatedWrapper({
  children,
}: //   className = "",
{
  children: React.ReactNode;
}) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-4xl mx-auto px-4 -mt-32 relative z-10"
    >
      {children}
    </motion.div>
  );
}
