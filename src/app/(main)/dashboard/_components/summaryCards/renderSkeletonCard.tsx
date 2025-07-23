import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export const renderSkeletonCard = () => (
  <Card className="w-full relative overflow-hidden bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
    <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-pulse"></div>
    <div className="relative z-10 p-6">
      <CardHeader className="flex justify-between items-start pb-4">
        <div className="space-y-2">
          <div className="bg-gray-300 dark:bg-gray-600 h-4 w-24 animate-pulse rounded-md" />
        </div>
        <div className="bg-gray-300 dark:bg-gray-600 h-12 w-12 rounded-full animate-pulse" />
      </CardHeader>
      <CardContent className="pb-4">
        <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded-md w-32 animate-pulse" />
      </CardContent>

      <CardFooter>
        <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-20 animate-pulse" />
      </CardFooter>
    </div>
  </Card>
);
