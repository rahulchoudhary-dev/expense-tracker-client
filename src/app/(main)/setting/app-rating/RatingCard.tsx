import React, { memo } from "react";
import { CheckCircle, Edit3, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import RatingStarsSkeleton from "./RatingStarsSkeleton";

interface RatingCardProps {
  hasExistingRating: boolean;
  isEditing: boolean;
  isLoading: boolean;
  isSubmitting: boolean;
  rating: number;
  hoverRating: number;
  handleStarClick: (star: number) => void;
  handleStarHover: (star: number) => void;
  setHoverRating: (rating: number) => void;
  setIsEditing: (value: boolean) => void;
  getRatingColor: (rating: number) => string;
  getRatingText: (rating: number) => string;
  getRatingMessage: (rating: number) => string;
}

const RatingCard: React.FC<RatingCardProps> = ({
  hasExistingRating,
  isEditing,
  isLoading,
  isSubmitting,
  rating,
  hoverRating,
  handleStarClick,
  handleStarHover,
  setHoverRating,
  setIsEditing,
  getRatingColor,
  getRatingText,
  getRatingMessage,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8 mb-8">
      <div className="text-center">
        {/* Status Badge */}
        {hasExistingRating && !isEditing && (
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 mb-4">
            <CheckCircle size={16} className="mr-1" />
            Previously Rated
          </div>
        )}

        {isEditing && (
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 mb-4">
            <Edit3 size={16} className="mr-1" />
            Editing Rating
          </div>
        )}

        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          {hasExistingRating && !isEditing
            ? "Your rating"
            : isEditing
            ? "Update your rating"
            : "How would you rate your experience?"}
        </h2>

        {/* Star Rating */}
        {isLoading ? (
          <RatingStarsSkeleton />
        ) : (
          <div className="flex justify-center mb-6">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => handleStarClick(star)}
                onMouseEnter={() => handleStarHover(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="mx-2 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-full p-1"
                disabled={isSubmitting}
              >
                <Star
                  size={48}
                  className={`${
                    star <= (hoverRating || rating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300 dark:text-gray-600"
                  } transition-all duration-200 ${
                    isSubmitting ? "opacity-50" : ""
                  }`}
                />
              </button>
            ))}
          </div>
        )}

        {/* Rating Text */}
        {!isLoading && (
          <div className="mb-6">
            <p
              className={`text-xl font-semibold ${getRatingColor(
                hoverRating || rating
              )} transition-colors`}
            >
              {getRatingText(hoverRating || rating)}
            </p>
            {(hoverRating || rating) > 0 && (
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                {getRatingMessage(hoverRating || rating)}
              </p>
            )}
          </div>
        )}

        {/* Edit Button */}
        {hasExistingRating && !isEditing && (
          <Button
            onClick={() => setIsEditing(true)}
            variant="outline"
            className="mt-4"
          >
            <Edit3 size={16} className="mr-2" />
            Edit Rating
          </Button>
        )}
      </div>
    </div>
  );
};

export default memo(RatingCard);
