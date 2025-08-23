import AuthImageCard from "../_components/AuthImageCard";
import SignUpForm from "./_components/SignUpForm";
import SignUpCardHeader from "./_components/SignUpCardHeader";

const SignUp = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen gap-8 lg:gap-16">
          <AuthImageCard />
          <div className="order-2 lg:order-1 flex-1 w-full max-w-md lg:max-w-lg">
            <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-2xl rounded-3xl p-8 lg:p-10 border border-white/20 dark:border-gray-700/50">
              <SignUpCardHeader />
              <SignUpForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
