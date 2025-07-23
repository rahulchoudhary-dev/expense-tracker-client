"use client";
import { memo, useRef } from "react";

import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Camera, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useShowError, useShowSuccess } from "@/app/toastProvider";
import { objectToFormData } from "@/utils/objectToFormData";
import LoadingSpinner from "@/components/LoadingSpinner";
import useUserProfileUpload from "@/query/user/useUploadUserProfile";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { setProfileUrl } from "@/redux/slices/userSlice";
import { itemVariants, TOAST_MESSAGES } from "@/constant";

const ProfileCard = () => {
  const { fullName, createdAt, bio, profileUrl, address } =
    useAppSelector((state) => state.user.user) || {};

  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const showSuccessToast = useShowSuccess();
  const showErrorToast = useShowError();

  const { mutate, isPending } = useUserProfileUpload();

  const uploadUserProfileHandler = async (event: any) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = objectToFormData({ file });

    mutate(formData, {
      onSuccess: (res: any) => {
        const profileUrl = res?.data?.url;
        dispatch(setProfileUrl(profileUrl));
        showSuccessToast(TOAST_MESSAGES.PROFILE_UPDATE_SUCCESS);
      },
      onError: (err) => {
        showErrorToast(err?.message || TOAST_MESSAGES.ERROR_GENERIC);
      },
    });
  };
  const handleClick = () => {
    fileInputRef.current?.click();
  };
  return (
    <motion.div variants={itemVariants}>
      <Card className="backdrop-blur-sm bg-white/95 dark:bg-gray-900/95 shadow-2xl border-0 rounded-3xl overflow-hidden">
        <CardHeader className="pb-0">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 p-6">
            {/* Avatar Section */}
            <div className="relative group hover:scale-110">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Avatar className="w-10 h-10 border-4 border-gray-300 dark:border-white  shadow-xl overflow-hidden">
                  {profileUrl ? (
                    <>
                      {isPending ? (
                        <LoadingSpinner label="Uploading..." />
                      ) : (
                        <AvatarImage
                          src={profileUrl}
                          alt={fullName}
                          className="w-50 h-50 object-cover rounded-4xl"
                        />
                      )}
                    </>
                  ) : (
                    <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                      {fullName}
                    </AvatarFallback>
                  )}
                </Avatar>
              </motion.div>
              <div className="relative">
                <Button
                  onClick={handleClick}
                  size="icon"
                  className="absolute -bottom-2 -right-2 cursor-pointer hover:scale-110 rounded-full w-10 h-10 bg-blue-600 hover:bg-blue-700 shadow-lg"
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    className="hidden"
                    onChange={(event) => uploadUserProfileHandler(event)}
                  />

                  <Camera className="h-4 w-4" color="white" />
                </Button>
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                    {fullName}
                  </h1>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <MapPin className="h-4 w-4" />
                  {address || "Unknown Location"}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Calendar className="h-4 w-4" />
                  Joined{" "}
                  {createdAt
                    ? new Date(createdAt).toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                      })
                    : "N/A"}
                </div>
              </div>

              {/* Bio */}
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed max-w-2xl">
                {bio ||
                  "Track your expenses, set goals, and stay financially fit."}
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>
    </motion.div>
  );
};

export default memo(ProfileCard);
