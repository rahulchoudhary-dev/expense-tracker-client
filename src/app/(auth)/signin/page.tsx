import AuthImageCard from "../_components/AuthImageCard";
import SignInCardHeader from "./_components/SignInCardHeader";
import SignInForm from "./_components/SignInForm";

const SignIn = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen gap-8 lg:gap-16">
          <AuthImageCard />
          <div className="order-2 lg:order-1 flex-1 w-full max-w-md lg:max-w-lg">
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-2xl rounded-3xl p-8 lg:p-10 border border-gray-200/50 dark:border-gray-700/50">
              <SignInCardHeader />
              <SignInForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
