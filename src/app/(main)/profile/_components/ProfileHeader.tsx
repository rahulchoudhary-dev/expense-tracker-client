export default function ProfileHeader() {
  return (
    <div className="relative h-64 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 overflow-hidden rounded-xl shadow-md">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute -top-4 -left-4 w-24 h-24 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 right-8 w-16 h-16 bg-white/5 rounded-full animate-bounce"></div>
        <div className="absolute bottom-8 left-1/3 w-20 h-20 bg-white/10 rounded-full animate-pulse delay-1000"></div>
      </div>
    </div>
  );
}
