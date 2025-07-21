"use client";

import { motion } from "framer-motion";
import withAuth from "@/hoc/withAuth";

import { containerVariants } from "@/constant";
import ProfileHeader from "./_components/ProfileHeader";
import ProfileCard from "./_components/ProfileCard";
import ProfileForm from "./_components/ProfileForm";

function Profile() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-500 $">
      <ProfileHeader />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto px-4 -mt-32 relative z-10"
      >
        <ProfileCard />
        <ProfileForm />
      </motion.div>
    </div>
  );
}

export default withAuth(Profile);
