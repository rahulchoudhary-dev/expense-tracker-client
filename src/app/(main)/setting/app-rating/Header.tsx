import React from "react";
import { Heart } from "lucide-react";
import BackButton from "../_components/BackButton";

const RatingPageHeader = () => {
  return (
    <div className="mb-8">
      <div className="flex items-center mb-4">
        <BackButton />
        <div className="flex items-center">
          <Heart className="mr-3 text-red-500" size={32} />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Rate This App
          </h1>
        </div>
      </div>
      <p className="text-gray-600 dark:text-gray-400">
        Your feedback helps us improve and grow. Let us know what you think!
      </p>
    </div>
  );
};

export default RatingPageHeader;
