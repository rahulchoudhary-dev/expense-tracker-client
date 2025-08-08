"use client";

import React, { useState } from "react";
import { Star, Send, MessageSquare } from "lucide-react";
import StatsSection from "./StatsSection";
import RatingPageHeader from "./Header";
import { Textarea } from "@/components/ui/textarea";

const RateThisApp = () => {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [feedback, setFeedback] = useState("");

  const handleStarClick = (starIndex: number) => {
    setRating(starIndex);
  };

  const handleStarHover = (starIndex: number) => {
    setHoverRating(starIndex);
  };

  const getRatingText = (stars: number) => {
    switch (stars) {
      case 1:
        return "Poor";
      case 2:
        return "Fair";
      case 3:
        return "Good";
      case 4:
        return "Very Good";
      case 5:
        return "Excellent";
      default:
        return "Rate our app";
    }
  };

  const getRatingMessage = (stars: number) => {
    switch (stars) {
      case 1:
      case 2:
        return "We're sorry to hear you're not satisfied. Your feedback helps us improve!";
      case 3:
        return "Thanks for the feedback! We're always working to make the app better.";
      case 4:
      case 5:
        return "Thank you! We're thrilled you're enjoying the app. Consider leaving a review!";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <RatingPageHeader />

        {/* Rating Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8 mb-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              How would you rate your experience?
            </h2>

            {/* Star Rating */}
            <div className="flex justify-center mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleStarClick(star)}
                  onMouseEnter={() => handleStarHover(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="mx-2 transition-transform hover:scale-110 focus:outline-none"
                >
                  <Star
                    size={48}
                    className={`${
                      star <= (hoverRating || rating)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300 dark:text-gray-600"
                    } transition-colors`}
                  />
                </button>
              ))}
            </div>

            {/* Rating Text */}
            <div className="mb-6">
              <p className="text-xl font-semibold text-gray-900 dark:text-white">
                {getRatingText(hoverRating || rating)}
              </p>
              {(hoverRating || rating) > 0 && (
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  {getRatingMessage(hoverRating || rating)}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Feedback Form */}
        {rating > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8 mb-8">
            <form onSubmit={() => {}}>
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <MessageSquare
                    className="text-blue-600 dark:text-blue-400 mr-3"
                    size={24}
                  />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Tell us more (optional)
                  </h3>
                </div>
                <Textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  rows={15}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder={
                    rating <= 2
                      ? "What can we do to improve your experience?"
                      : rating === 3
                      ? "What features would you like to see improved?"
                      : "What do you love most about the app? Any suggestions?"
                  }
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <Send size={18} className="mr-2" />
                Submit Feedback
              </button>
            </form>
          </div>
        )}

        {/* App Store Links */}
        <StatsSection />
      </div>
    </div>
  );
};

export default RateThisApp;
