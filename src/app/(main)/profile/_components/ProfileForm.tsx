"use client";
import { useFormik } from "formik";
import { useCallback, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { setUser } from "@/redux/slices/userSlice";
import { profileDto } from "@/validations/profile.validation";
import useUpdateUserMutation from "@/query/useUpdateUser";
import { useShowError, useShowSuccess } from "@/app/toastProvider";
import { itemVariants, TOAST_MESSAGES } from "@/constant";
import { Textarea } from "@/components/ui/textarea";
import FormErrorMessage from "@/components/FormErrorMessage";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Edit3, User } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ProfileActions from "./ProfileActions";
import { Label } from "@/components/ui/label";
import InputField from "@/components/InputFiled";
import ProfileInfoGrid from "./ProfileInfoGrid";

const ProfileForm = () => {
  const dispatch = useAppDispatch();

  const showSuccessToast = useShowSuccess();
  const showErrorToast = useShowError();

  const [isEditing, setIsEditing] = useState<Boolean>(false);

  const { user } = useAppSelector((state) => state.user);
  const profileUrl = user?.profileUrl || "";

  const { mutate: updateUserMutation } = useUpdateUserMutation();

  const formik = useFormik({
    initialValues: { ...user },
    enableReinitialize: true,
    validationSchema: profileDto,
    validateOnMount: true,
    onSubmit: (values, { resetForm }) => {
      updateUserMutation(values, {
        onSuccess: (data) => {
          dispatch(setUser({ ...data, profileUrl }));
          showSuccessToast(TOAST_MESSAGES.PROFILE_UPDATE_SUCCESS);
          setIsEditing(false);
        },
        onError: (err) => {
          showErrorToast(err?.message || TOAST_MESSAGES.ERROR_GENERIC);
          setIsEditing(false);
        },
      });
      resetForm();
    },
  });

  const handleEdit = useCallback(() => setIsEditing(true), []);
  const handleCancel = useCallback(() => setIsEditing(false), []);

  return (
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
                            formik.touched.firstName && formik.errors.firstName
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
                            formik.touched.lastName && formik.errors.lastName
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
                          onError={formik.touched.email && formik.errors.email}
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
                          onError={formik.touched.phone && formik.errors.phone}
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
                    <ProfileInfoGrid />
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </form>
  );
};

export default ProfileForm;
