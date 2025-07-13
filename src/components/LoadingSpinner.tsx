import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  label?: string;
  size?: number;
  className?: string;
}

const LoadingSpinner = ({
  label = "Loading...",
  size = 32,
  className = "",
}: LoadingSpinnerProps) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Loader2
        className="animate-spin text-black dark:text-white"
        size={size}
      />{" "}
      {label}
    </div>
  );
};

export default LoadingSpinner;
