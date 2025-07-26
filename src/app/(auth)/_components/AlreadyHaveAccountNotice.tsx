import Link from "next/link";
import ROUTES from "@/routes";

type AlreadyHaveAccountNoticeProps = {
  lable: string;
};

const AlreadyHaveAccountNotice: React.FC<AlreadyHaveAccountNoticeProps> = ({
  lable,
}) => {
  return (
    <div className="text-center pt-6 border-t border-gray-200/50 dark:border-gray-700/50">
      <p className="text-gray-600 dark:text-gray-400 text-sm">
        {lable}
        <Link
          href={ROUTES.SIGN_IN}
          className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition-colors duration-200 hover:underline"
        >
          <span>Sign in</span>
        </Link>
      </p>
    </div>
  );
};

export default AlreadyHaveAccountNotice;
