"use client";

import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Camera,
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
  MapPin,
} from "lucide-react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const ProfileCard = ({ profileData }: any) => {
  const fullName = profileData.fullName || "User Name";
  const initials = fullName
    .split(" ")
    .map((n: any) => n[0])
    .join("")
    .toUpperCase();

  return (
    <motion.div variants={itemVariants}>
      <Card className="backdrop-blur-sm bg-white/95 dark:bg-gray-900/95 shadow-2xl border-0 rounded-3xl overflow-hidden">
        <CardHeader className="pb-0">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 p-6">
            {/* Avatar Section */}
            <div className="relative group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Avatar className="w-32 h-32 border-4 border-white shadow-xl">
                  <AvatarImage
                    src={`https://ui-avatars.com/api/?name=${fullName}&size=128&background=6366f1&color=ffffff&bold=true`}
                    alt={fullName}
                  />
                  <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                    {initials}
                  </AvatarFallback>
                </Avatar>
              </motion.div>
              <Button
                size="icon"
                className="absolute -bottom-2 -right-2 rounded-full w-10 h-10 bg-blue-600 hover:bg-blue-700 shadow-lg"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                    {fullName}
                  </h1>
                </div>

                <div className="flex gap-2 mt-4 md:mt-0">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20"
                  >
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <MapPin className="h-4 w-4" />
                  {profileData.location || "Unknown Location"}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Calendar className="h-4 w-4" />
                  Joined{" "}
                  {profileData.createdAt
                    ? new Date(profileData.createdAt).toLocaleDateString(
                        "en-US",
                        { month: "long", year: "numeric" }
                      )
                    : "N/A"}
                </div>
              </div>

              {/* Bio */}
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed max-w-2xl">
                {profileData.bio ||
                  "Track your expenses, set goals, and stay financially fit."}
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>
    </motion.div>
  );
};

export default ProfileCard;
