"use client";

import React, { memo, useEffect, useState } from "react";

import StatsSection from "./StatsSection";
import RatingPageHeader from "./Header";
import useCreateRating from "@/query/ratings/useCreateRatings";
import { useShowError, useShowSuccess } from "@/app/toastProvider";
import useGetRating from "@/query/ratings/useGetRatings";
import { getRatingMessage, getRatingText } from "../_data";
import RatingErrorState from "./RatingErrorState";
import RatingFeedbackForm from "./RatingFeedbackForm";
import RatingCard from "./RatingCard";

const RateThisApp = () => {
  const { data, isLoading, error } = useGetRating();
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [hasExistingRating, setHasExistingRating] = useState(false);
  const [originalRating, setOriginalRating] = useState<number>(0);
  const [originalComment, setOriginalComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const showSuccessToast = useShowSuccess();
  const showErrorToast = useShowError();

  useEffect(() => {
    if (data && data.ratingValue) {
      setRating(data.ratingValue);
      setComment(data.comment || "");
      setOriginalRating(data.ratingValue);
      setOriginalComment(data.comment || "");
      setHasExistingRating(true);
    } else if (data && !data.ratingValue) {
      // User has no existing rating
      setHasExistingRating(false);
      setRating(0);
      setComment("");
    }
  }, [data]);

  const { mutate } = useCreateRating();

  const handleCreateRatings = () => {
    setIsSubmitting(true);
    mutate(
      { ratingValue: rating, comment },
      {
        onSuccess: () => {
          const message = hasExistingRating
            ? "Rating updated successfully!"
            : "Rating submitted successfully!";
          showSuccessToast(message);
          setIsSubmitting(false);
          setIsEditing(false);
          setOriginalRating(rating);
          setOriginalComment(comment);
          setHasExistingRating(true);
        },
        onError: (error: any) => {
          showErrorToast(
            error?.response?.data?.message || "Failed to submit rating"
          );
          setIsSubmitting(false);
        },
      }
    );
  };

  const handleStarClick = (starIndex: number) => {
    setRating(starIndex);
    if (hasExistingRating && !isEditing) {
      setIsEditing(true);
    }
  };

  const handleStarHover = (starIndex: number) => {
    setHoverRating(starIndex);
  };

  const handleCancelEdit = () => {
    setRating(originalRating);
    setComment(originalComment);
    setIsEditing(false);
  };

  const hasChanges = () => {
    return rating !== originalRating || comment !== originalComment;
  };

  const getRatingColor = (stars: number) => {
    if (stars <= 2) return "text-red-500";
    if (stars === 3) return "text-yellow-500";
    return "text-green-500";
  };

  // Show error state if rating data fails to load
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <RatingPageHeader />
          <RatingErrorState />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <RatingPageHeader />

        {/* Rating Section */}
        <RatingCard
          hasExistingRating={hasExistingRating}
          isEditing={isEditing}
          isLoading={isLoading}
          isSubmitting={isSubmitting}
          rating={rating}
          hoverRating={hoverRating}
          handleStarClick={handleStarClick}
          handleStarHover={handleStarHover}
          setHoverRating={setHoverRating}
          setIsEditing={setIsEditing}
          getRatingColor={getRatingColor}
          getRatingText={getRatingText}
          getRatingMessage={getRatingMessage}
        />

        {/* Feedback Form */}
        {(rating > 0 || hasExistingRating) && (
          <RatingFeedbackForm
            rating={rating}
            comment={comment}
            hasExistingRating={hasExistingRating}
            isEditing={isEditing}
            isSubmitting={isSubmitting}
            handleCommentChange={setComment}
            handleCreateRatings={handleCreateRatings}
            handleCancelEdit={handleCancelEdit}
            hasChanges={hasChanges}
          />
        )}

        {/* App Store Links */}
        <StatsSection />
      </div>
    </div>
  );
};

export default memo(RateThisApp);
