import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button"; // adjust based on your setup

export default function ProfileHeader() {
  return (
    <div className="relative h-64 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 overflow-hidden rounded-xl shadow-md">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

      {/* Settings button */}
      <div className="absolute top-4 right-4 flex gap-2 z-10">
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/20 transition-colors"
        >
          <Settings className="h-5 w-5" />
        </Button>
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute -top-4 -left-4 w-24 h-24 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 right-8 w-16 h-16 bg-white/5 rounded-full animate-bounce"></div>
        <div className="absolute bottom-8 left-1/3 w-20 h-20 bg-white/10 rounded-full animate-pulse delay-1000"></div>
      </div>

      {/* Profile info */}
    </div>
  );
}
