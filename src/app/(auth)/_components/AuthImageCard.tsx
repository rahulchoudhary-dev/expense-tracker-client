import Image from "next/image";
import appLogo from "../../../../public/app-logo-1.jpeg";

const AuthImageCard = () => {
  return (
    <div className="order-1 lg:order-2 flex-1 flex justify-center items-center max-w-lg lg:max-w-2xl">
      <div className="relative w-full max-w-md lg:max-w-lg xl:max-w-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute inset-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-2xl opacity-10 animate-pulse delay-1000"></div>

        <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-gray-700/50">
          <Image
            src={appLogo}
            alt="Expendo Logo"
            width={400}
            height={400}
            loading="lazy"
            className="w-full h-auto object-contain rounded-2xl"
          />

          <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full opacity-60 animate-bounce delay-300"></div>
          <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full opacity-60 animate-bounce delay-700"></div>
        </div>
      </div>
    </div>
  );
};

export default AuthImageCard;
