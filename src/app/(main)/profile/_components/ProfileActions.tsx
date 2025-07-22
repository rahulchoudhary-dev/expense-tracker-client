"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { X, Save } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProfileActions {
  onCancel: () => void;
}

const ProfileActions = ({ onCancel }: ProfileActions) => {
  return (
    <motion.div
      key="actions"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="flex gap-2"
    >
      <Button
        variant="ghost"
        size="sm"
        type="button"
        onClick={onCancel}
        className="hover:bg-red-50 dark:hover:bg-red-900/20"
      >
        <X className="h-4 w-4 mr-2" />
        Cancel
      </Button>
      <Button
        size="sm"
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 cursor-pointer"
      >
        <Save className="h-4 w-4 mr-2" />
        Save
      </Button>
    </motion.div>
  );
};

export default memo(ProfileActions);
