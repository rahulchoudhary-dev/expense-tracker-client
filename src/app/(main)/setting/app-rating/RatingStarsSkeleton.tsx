const RatingStarsSkeleton = () => (
  <div className="flex justify-center mb-6">
    {[1, 2, 3, 4, 5].map((star) => (
      <div
        key={star}
        className="mx-2 w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"
      />
    ))}
  </div>
);

export default RatingStarsSkeleton;
