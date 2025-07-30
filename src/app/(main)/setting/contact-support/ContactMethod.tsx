import React from "react";
import { ExternalLink } from "lucide-react";

interface ContactMethodProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action: string;
  onClick?: () => void;
}

const ContactMethod: React.FC<ContactMethodProps> = ({
  icon,
  title,
  description,
  action,
  onClick,
}) => (
  <div
    className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer"
    onClick={onClick}
  >
    <div className="flex items-start">
      <div className="text-blue-600 dark:text-blue-400 mr-4 mt-1">{icon}</div>
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
          {description}
        </p>
        <span className="text-blue-600 dark:text-blue-400 text-sm font-medium flex items-center">
          {action}
          <ExternalLink size={14} className="ml-1" />
        </span>
      </div>
    </div>
  </div>
);

export default ContactMethod;
