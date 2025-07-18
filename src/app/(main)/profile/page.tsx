"use client";

import React, { useState, useCallback, memo } from "react";
import InputField from "@/components/InputFiled";
import { motion, AnimatePresence } from "framer-motion";
import { Edit3, User } from "lucide-react";

import withAuth from "@/hoc/withAuth";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import useBootUser from "@/hooks/useBootUser";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useFormik } from "formik";
import { profileValidationSchema } from "@/validations/profile.validation";
import useUpdateUserMutation from "@/query/useUpdateUser";
import { storage } from "@/utils/storageUtils";
import { useShowError, useShowSuccess } from "@/app/toastProvider";
import { containerVariants, itemVariants } from "@/constant";
import ProfileHeader from "./_components/ProfileHeader";
import ProfileCard from "./_components/ProfileCard";
import ProfileInfoGrid from "./_components/ProfileInfoGrid";
import ProfileActions from "./_components/ProfileActions";
import { Textarea } from "@/components/ui/textarea";
import FormErrorMessage from "@/components/FormErrorMessage";

function Profile() {
  const { user } = useBootUser();
  if (!user) return null;
  const [isEditing, setIsEditing] = useState(false);
  const {
    fullName,
    firstName,
    lastName,
    email,
    createdAt,
    address,
    bio,
    isActive,
    phone,
    role,
    subscriptionStatus,
  } = user;
  const [profileData, setProfileData] = useState({
    fullName: fullName || "",
    firstName: firstName || "",
    lastName: lastName || "",
    email: email || "",
    createdAt: createdAt || "",
    phone: phone || "",
    address: address || "",
    bio: bio || "",
    role: role || "",
    isActive: isActive || "",
    subscriptionStatus: subscriptionStatus || "",
  });

  const { mutate: updateUserMutation } = useUpdateUserMutation();
  const showSuccess = useShowSuccess();
  const showError = useShowError();

  const handleValuesChange = (values: any) => {
    setProfileData((prevValues) => ({
      ...values,
    }));
  };

  const formik = useFormik({
    initialValues: profileData,
    enableReinitialize: true,
    validationSchema: profileValidationSchema,
    validateOnBlur: true,
    validateOnChange: true,
    validateOnMount: true,
    onSubmit: (values, { resetForm }) => {
      updateUserMutation(values, {
        onSuccess: (data) => {
          handleValuesChange(data.data);
          storage.set("user", data.data);
          showSuccess("User profile updated successfully");
          setIsEditing(false);
        },
        onError: (err) => {
          setIsEditing(false);
          showError(err?.message || "Failed to update user profile");
        },
      });
      resetForm();
    },
  });

  const handleEdit = useCallback(() => {
    setIsEditing(true);
  }, [profileData]);

  const handleCancel = useCallback(() => {
    setIsEditing(false);
  }, [profileData]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-500 $">
      <ProfileHeader />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto px-4 -mt-32 relative z-10"
      >
        <ProfileCard profileData={profileData} />
        <form onSubmit={formik.handleSubmit}>
          <div className="w-full space-y-6 mt-6">
            <div className="lg:col-span-1 ">
              <motion.div variants={itemVariants}>
                <Card className="backdrop-blur-sm bg-white/95 dark:bg-gray-900/95 border-0 rounded-2xl shadow-lg">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                      <User className="h-5 w-5 text-blue-600" />
                      Contact Information
                    </h3>
                    <AnimatePresence mode="wait">
                      {!isEditing ? (
                        <motion.div
                          key="edit"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                        >
                          <Button
                            variant="ghost"
                            type="button"
                            size="sm"
                            onClick={handleEdit}
                            className="hover:bg-blue-50 dark:hover:bg-blue-900/20"
                          >
                            <Edit3 className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                        </motion.div>
                      ) : (
                        <ProfileActions onCancel={handleCancel} />
                      )}
                    </AnimatePresence>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <AnimatePresence mode="wait">
                      {isEditing ? (
                        <motion.div
                          key="editing"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="grid grid-cols-1 md:grid-cols-2 gap-4"
                        >
                          <div>
                            <Label htmlFor="firstName">First Name</Label>
                            <InputField
                              name="firstName"
                              type="text"
                              placeholder="First Name"
                              value={formik.values.firstName}
                              onChange={formik.handleChange}
                              className="border border-gray-300 rounded-2xl p-4 w-full mt-2"
                              onError={
                                formik.touched.firstName &&
                                formik.errors.firstName
                              }
                            />
                          </div>
                          <div>
                            <Label htmlFor="lastName">Last Name</Label>
                            <InputField
                              name="lastName"
                              type="text"
                              placeholder="Last Name"
                              value={formik.values.lastName}
                              onChange={formik.handleChange}
                              className="border border-gray-300 rounded-2xl p-4 w-full mt-2"
                              onError={
                                formik.touched.lastName &&
                                formik.errors.lastName
                              }
                            />
                          </div>
                          <div>
                            <Label htmlFor="email">Email</Label>
                            <InputField
                              name="email"
                              type="text"
                              placeholder="email"
                              value={formik.values.email}
                              onChange={formik.handleChange}
                              className="border border-gray-300 rounded-2xl p-4 w-full mt-2"
                              onError={
                                formik.touched.email && formik.errors.email
                              }
                            />
                          </div>
                          <div>
                            <Label htmlFor="phone">Phone</Label>
                            <InputField
                              name="phone"
                              type="text"
                              placeholder="phone"
                              value={formik.values.phone}
                              onChange={formik.handleChange}
                              className="border border-gray-300 rounded-2xl p-4 w-full mt-2"
                              onError={
                                formik.touched.phone && formik.errors.phone
                              }
                            />
                          </div>
                          <div className="md:col-span-2">
                            <Label htmlFor="address">address</Label>
                            <InputField
                              name="address"
                              type="text"
                              placeholder="address"
                              value={formik.values.address}
                              onChange={formik.handleChange}
                              className="border border-gray-300 rounded-2xl p-4 w-full mt-2"
                              onError={
                                formik.touched.address && formik.errors.address
                              }
                            />
                          </div>
                          <div className="md:col-span-2">
                            <Label htmlFor="bio">Bio</Label>
                            <Textarea
                              name="bio"
                              placeholder="bio"
                              value={formik.values.bio}
                              onChange={formik.handleChange}
                              className="border border-gray-300 rounded-2xl p-4 w-full mt-2"
                            />
                            <FormErrorMessage name="bio" formik={formik} />
                          </div>
                        </motion.div>
                      ) : (
                        <ProfileInfoGrid profileData={profileData} />
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default withAuth(memo(Profile));
