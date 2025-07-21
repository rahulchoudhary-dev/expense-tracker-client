import { memo } from "react";

const ProfileWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-500">
    {children}
  </div>
);

export default memo(ProfileWrapper);
