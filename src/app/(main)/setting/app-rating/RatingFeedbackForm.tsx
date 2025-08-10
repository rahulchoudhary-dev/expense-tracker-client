import React, { memo } from "react";
import { MessageSquare, Loader2, Send } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface RatingFeedbackFormProps {
  rating: number;
  comment: string;
  hasExistingRating: boolean;
  isEditing: boolean;
  isSubmitting: boolean;
  handleCommentChange: (value: string) => void;
  handleCreateRatings: () => void;
  handleCancelEdit: () => void;
  hasChanges: () => boolean;
}

const RatingFeedbackForm: React.FC<RatingFeedbackFormProps> = ({
  rating,
  comment,
  hasExistingRating,
  isEditing,
  isSubmitting,
  handleCommentChange,
  handleCreateRatings,
  handleCancelEdit,
  hasChanges,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8 mb-8">
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <MessageSquare
            className="text-blue-600 dark:text-blue-400 mr-3"
            size={24}
          />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {hasExistingRating ? "Your feedback" : "Tell us more"} (optional)
          </h3>
        </div>
        <Textarea
          value={comment}
          onChange={(e) => handleCommentChange(e.target.value)}
          rows={6}
          disabled={isSubmitting || (hasExistingRating && !isEditing)}
          className={`w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all ${
            hasExistingRating && !isEditing
              ? "opacity-75 cursor-not-allowed"
              : ""
          }`}
          placeholder={
            rating <= 2
              ? "What can we do to improve your experience?"
              : rating === 3
              ? "What features would you like to see improved?"
              : "What do you love most about the app? Any suggestions?"
          }
        />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        {(!hasExistingRating || isEditing) && (
          <Button
            onClick={handleCreateRatings}
            disabled={
              rating === 0 ||
              isSubmitting ||
              (hasExistingRating && !hasChanges())
            }
            className="flex-1 flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="mr-2 animate-spin" />
                {hasExistingRating ? "Updating..." : "Submitting..."}
              </>
            ) : (
              <>
                <Send size={18} className="mr-2" />
                {hasExistingRating ? "Update Rating" : "Submit Rating"}
              </>
            )}
          </Button>
        )}

        {isEditing && (
          <Button
            onClick={handleCancelEdit}
            variant="outline"
            disabled={isSubmitting}
            className="px-6 py-3"
          >
            Cancel
          </Button>
        )}
      </div>

      {/* Changes indicator */}
      {isEditing && hasChanges() && (
        <p className="text-sm text-blue-600 dark:text-blue-400 mt-3 text-center">
          You have unsaved changes
        </p>
      )}
    </div>
  );
};

export default memo(RatingFeedbackForm);
