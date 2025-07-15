"use client";

import withAuth from "@/hoc/withAuth";
import useBootUser, { User } from "@/hooks/useBootUser";
import React, { useState, memo, useCallback } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useFormik } from "formik";
import { Button } from "@/components/ui/button";
import InputField from "@/components/InputFiled";
import useUpdateUserMutation from "@/query/useUpdateUser";
import { useShowError, useShowSuccess } from "@/app/toastProvider";
import { profileValidationSchema } from "@/validations/profile.validation";
import { storage } from "@/utils/storageUtils";

const Profile = () => {
  const showSuccess = useShowSuccess();
  const showError = useShowError();
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useBootUser();

  if (!user) return null;

  const { fullName, firstName, lastName, email, createdAt } = user;
  const { mutate: updateUserMutation } = useUpdateUserMutation();

  const [initialValues, setInitialValues] = useState({
    fullName: fullName || "",
    firstName: firstName || "",
    lastName: lastName || "",
    email: email || "",
    createdAt: createdAt || "",
  });

  const handleValuesChange = useCallback((values: User) => {
    setInitialValues((prevValues) => ({
      ...prevValues,
      fullName: values.fullName || "",
      firstName: values.firstName || "",
      lastName: values.lastName || "",
      email: values.email || "",
    }));
  }, []);

  const formik = useFormik({
    initialValues: initialValues,
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

  const handleCancel = useCallback(() => {
    setIsEditing(false);
    formik.resetForm();
  }, [formik]);

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4">
      <form onSubmit={formik.handleSubmit}>
        <Card className="shadow-2xl rounded-2xl dark:bg-gray-900 shadow-gray-300">
          <CardHeader className="flex items-center gap-4 p-6">
            <Avatar className="h-16 w-16">
              <AvatarImage
                src={`https://ui-avatars.com/api/?name=${fullName}`}
                alt={fullName}
              />
              <AvatarFallback>
                {initialValues.firstName?.charAt(0)}
                {initialValues.lastName?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-xl font-bold">
                {initialValues.fullName || "User Profile"}
              </CardTitle>
              <p className="text-muted-foreground text-sm">
                {initialValues.email}
              </p>
            </div>
          </CardHeader>
          <Separator />
          {isEditing ? (
            <CardContent className="grid grid-cols-1 gap-4 p-6">
              <InputField
                name="firstName"
                type="text"
                placeholder="First Name"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                className="border border-gray-300 rounded-2xl p-4 w-full"
                onError={formik.touched.firstName && formik.errors.firstName}
              />
              <InputField
                name="lastName"
                type="text"
                placeholder="Last Name"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                className="border border-gray-300 rounded-2xl p-4 w-full"
                onError={formik.touched.lastName && formik.errors.lastName}
              />
              <InputField
                name="email"
                type="email"
                placeholder="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                className="border border-gray-300 rounded-2xl p-4 w-full"
                onError={formik.touched.email && formik.errors.email}
              />
            </CardContent>
          ) : (
            <>
              <CardContent className="grid grid-cols-2 gap-4 text-sm p-6">
                <div>
                  <p className="font-semibold text-muted-foreground">
                    First Name
                  </p>
                  <p>{initialValues.firstName}</p>
                </div>
                <div>
                  <p className="font-semibold text-muted-foreground">
                    Last Name
                  </p>
                  <p>{initialValues.lastName}</p>
                </div>
                <div>
                  <p className="font-semibold text-muted-foreground">
                    Joined On
                  </p>
                  <p>{format(new Date(createdAt), "dd MMM yyyy, hh:mm a")}</p>
                </div>
              </CardContent>
            </>
          )}
          <CardFooter className="flex justify-end gap-4 p-6">
            {isEditing && (
              <>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleCancel}
                  className="dark:bg-gray-800 dark:text-white cursor-pointer"
                >
                  Cancel
                </Button>
                <Button
                  disabled={formik.isSubmitting}
                  variant="outline"
                  type="submit"
                  className="dark:bg-gray-800 dark:text-white cursor-pointer"
                >
                  Save Changes
                </Button>
              </>
            )}
            {!isEditing && (
              <Button
                onClick={() => setIsEditing(!isEditing)}
                variant="outline"
                className="dark:bg-gray-800 dark:text-white cursor-pointer"
              >
                Edit Profile
              </Button>
            )}
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default withAuth(memo(Profile));
