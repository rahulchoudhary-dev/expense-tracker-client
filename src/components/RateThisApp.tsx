"use client";

import React, { useState } from "react";
import {
  Star,
  ArrowLeft,
  Heart,
  Send,
  ExternalLink,
  Smartphone,
  Monitor,
  ThumbsUp,
  MessageSquare,
  Gift,
} from "lucide-react";

interface RateThisAppProps {
  onBack?: () => void;
}

const RateThisApp: React.FC<RateThisAppProps> = ({ onBack }) => {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [feedback, setFeedback] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<
    "ios" | "android" | "web" | null
  >(null);

  const handleStarClick = (starIndex: number) => {
    setRating(starIndex);
  };

  const handleStarHover = (starIndex: number) => {
    setHoverRating(starIndex);
  };

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating > 0) {
      setHasSubmitted(true);
      // Placeholder for feedback submission
      console.log("Rating:", rating, "Feedback:", feedback);
    }
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

  const StoreButton: React.FC<{
    platform: "ios" | "android" | "web";
    icon: React.ReactNode;
    title: string;
    subtitle: string;
    onClick: () => void;
  }> = ({ platform, icon, title, subtitle, onClick }) => (
    <button
      onClick={onClick}
      className={`flex items-center p-4 rounded-lg border-2 transition-all hover:shadow-md ${
        selectedPlatform === platform
          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
          : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
      }`}
    >
      <div className="text-gray-700 dark:text-gray-300 mr-4">{icon}</div>
      <div className="text-left">
        <div className="font-semibold text-gray-900 dark:text-white">
          {title}
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {subtitle}
        </div>
      </div>
      <ExternalLink size={16} className="ml-auto text-gray-400" />
    </button>
  );

  if (hasSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center">
            <div className="mb-8">
              <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-4">
                <ThumbsUp
                  className="text-green-600 dark:text-green-400"
                  size={32}
                />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Thank You!
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Your feedback has been submitted successfully.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8 mb-8">
              <div className="flex justify-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={32}
                    className={`mx-1 ${
                      star <= rating
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300 dark:text-gray-600"
                    }`}
                  />
                ))}
              </div>
              <p className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {getRatingText(rating)} ({rating}/5)
              </p>
              {feedback && (
                <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-gray-700 dark:text-gray-300 italic">
                    "{feedback}"
                  </p>
                </div>
              )}
            </div>

            {rating >= 4 && (
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
                <div className="flex items-center justify-center mb-4">
                  <Gift
                    className="text-blue-600 dark:text-blue-400 mr-2"
                    size={24}
                  />
                  <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">
                    Love the app? Share it with others!
                  </h3>
                </div>
                <p className="text-blue-800 dark:text-blue-200 mb-4">
                  Help others discover our expense tracker by leaving a review
                  on your app store.
                </p>
                <div className="space-y-3">
                  <StoreButton
                    platform="ios"
                    icon={<Smartphone size={24} />}
                    title="App Store"
                    subtitle="Rate on iOS App Store"
                    onClick={() => alert("Redirecting to App Store...")}
                  />
                  <StoreButton
                    platform="android"
                    icon={<Smartphone size={24} />}
                    title="Google Play"
                    subtitle="Rate on Google Play Store"
                    onClick={() => alert("Redirecting to Google Play...")}
                  />
                  <StoreButton
                    platform="web"
                    icon={<Monitor size={24} />}
                    title="Web App"
                    subtitle="Share with friends"
                    onClick={() => alert("Sharing options...")}
                  />
                </div>
              </div>
            )}

            <div className="flex justify-center space-x-4">
              {onBack && (
                <button
                  onClick={onBack}
                  className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Back to Settings
                </button>
              )}
              <button
                onClick={() => {
                  setHasSubmitted(false);
                  setRating(0);
                  setFeedback("");
                  setSelectedPlatform(null);
                }}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Rate Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            {onBack && (
              <button
                onClick={onBack}
                className="mr-4 p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <ArrowLeft size={24} />
              </button>
            )}
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
            <form onSubmit={handleSubmitFeedback}>
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
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  rows={4}
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
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Rate us on your platform
          </h3>
          <div className="space-y-4">
            <StoreButton
              platform="ios"
              icon={<Smartphone size={24} />}
              title="App Store"
              subtitle="Rate on iOS App Store"
              onClick={() => {
                setSelectedPlatform("ios");
                alert("Redirecting to App Store...");
              }}
            />
            <StoreButton
              platform="android"
              icon={<Smartphone size={24} />}
              title="Google Play"
              subtitle="Rate on Google Play Store"
              onClick={() => {
                setSelectedPlatform("android");
                alert("Redirecting to Google Play...");
              }}
            />
            <StoreButton
              platform="web"
              icon={<Monitor size={24} />}
              title="Web App"
              subtitle="Share with friends and colleagues"
              onClick={() => {
                setSelectedPlatform("web");
                alert("Opening sharing options...");
              }}
            />
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-6">
          <div className="text-center">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Join thousands of satisfied users!
            </h4>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  4.8
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Average Rating
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  50K+
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Downloads
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  98%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Satisfaction
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RateThisApp;
