"use client";

import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  UserCog,
  ShieldCheck,
} from "lucide-react";

const ProfileInfoGrid = ({ profileData }: any) => {
  return (
    <motion.div
      key="viewing"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      {/* Email */}
      <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
        <Mail className="h-5 w-5 text-blue-600" />
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
          <p className="font-medium">{profileData?.email || "N/A"}</p>
        </div>
      </div>

      {/* Phone */}
      <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
        <Phone className="h-5 w-5 text-blue-600" />
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Phone</p>
          <p className="font-medium">{profileData?.phone || "N/A"}</p>
        </div>
      </div>

      {/* Location */}
      <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
        <MapPin className="h-5 w-5 text-blue-600" />
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Location</p>
          <p className="font-medium">{profileData?.address || "N/A"}</p>
        </div>
      </div>

      {/* Joined Date */}
      <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
        <Calendar className="h-5 w-5 text-blue-600" />
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Joined</p>
          <p className="font-medium">
            {profileData?.createdAt
              ? new Date(profileData.createdAt).toLocaleDateString()
              : "N/A"}
          </p>
        </div>
      </div>

      {/* Role */}
      <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
        <UserCog className="h-5 w-5 text-blue-600" />
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Role</p>
          <p className="font-medium capitalize">{profileData?.role || "N/A"}</p>
        </div>
      </div>

      {/* Subscription Status */}
      <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
        <ShieldCheck className="h-5 w-5 text-blue-600" />
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Subscription
          </p>
          <p className="font-medium capitalize">
            {profileData?.subscriptionStatus || "N/A"}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileInfoGrid;
