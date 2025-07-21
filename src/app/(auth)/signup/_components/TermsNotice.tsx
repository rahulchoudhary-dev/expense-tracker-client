import Link from "next/link";

const TermsNotice = () => {
  return (
    <div className="text-xs text-gray-600 dark:text-gray-400 bg-gray-50/50 dark:bg-gray-800/50 rounded-lg p-3 border border-gray-200/30 dark:border-gray-700/30">
      By creating an account, you agree to our{" "}
      <Link
        href="/terms"
        className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition-colors duration-200 hover:underline"
      >
        Terms of Service
      </Link>{" "}
      and{" "}
      <Link
        href="/privacy"
        className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition-colors duration-200 hover:underline"
      >
        Privacy Policy
      </Link>
      .
    </div>
  );
};

export default TermsNotice;
