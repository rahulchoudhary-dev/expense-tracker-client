"use client";

import React from "react";
import {
  Shield,
  Mail,
  Calendar,
  Lock,
  Eye,
  Users,
  FileText,
} from "lucide-react";
import BackButton from "../_components/BackButton";



const PrivacyPolicy = () => {
  const lastUpdated = "December 15, 2024";

  const PolicySection: React.FC<{
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
  }> = ({ title, icon, children }) => (
    <div className="mb-8">
      <div className="flex items-center mb-4">
        <div className="text-blue-600 dark:text-blue-400 mr-3">{icon}</div>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
          {title}
        </h2>
      </div>
      <div className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
        {children}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            {/* {onBack && ( */}
            <BackButton />
            {/* )} */}
            <div className="flex items-center">
              <Shield
                className="mr-3 text-blue-600 dark:text-blue-400"
                size={32}
              />
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Privacy Policy
              </h1>
            </div>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <p className="text-blue-800 dark:text-blue-200">
              <strong>Last Updated:</strong> {lastUpdated}
            </p>
            <p className="text-blue-700 dark:text-blue-300 mt-2">
              This Privacy Policy explains how Expense Tracker collects, uses,
              and protects your personal information.
            </p>
          </div>
        </div>

        {/* Privacy Policy Content */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8">
          {/* Introduction */}
          <div className="mb-8">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              At Expense Tracker, we are committed to protecting your privacy
              and ensuring the security of your personal information. This
              Privacy Policy outlines how we collect, use, store, and protect
              your data when you use our expense tracking application.
            </p>
          </div>

          {/* Data Collection */}
          <PolicySection
            title="Information We Collect"
            icon={<Eye size={24} />}
          >
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Personal Information
              </h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Name and email address (for account creation)</li>
                <li>Profile picture (optional)</li>
                <li>Currency and language preferences</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Financial Data
              </h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Expense transactions and amounts</li>
                <li>Income records</li>
                <li>Budget information</li>
                <li>Category preferences</li>
                <li>Account balances (if provided)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Usage Information
              </h3>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>App usage patterns and features accessed</li>
                <li>Device information (type, operating system)</li>
                <li>Log data and error reports</li>
              </ul>
            </div>
          </PolicySection>

          {/* Data Usage */}
          <PolicySection
            title="How We Use Your Information"
            icon={<FileText size={24} />}
          >
            <p>We use your information to:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Provide and maintain the expense tracking service</li>
              <li>Process and categorize your financial transactions</li>
              <li>Generate reports and insights about your spending</li>
              <li>Send you notifications and reminders (if enabled)</li>
              <li>Improve our app's functionality and user experience</li>
              <li>Provide customer support and respond to your inquiries</li>
              <li>Ensure the security and integrity of our service</li>
            </ul>
          </PolicySection>

          {/* Data Sharing */}
          <PolicySection title="Information Sharing" icon={<Users size={24} />}>
            <p>
              <strong>
                We do not sell, trade, or rent your personal information to
                third parties.
              </strong>
              We may share your information only in the following limited
              circumstances:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>
                <strong>Service Providers:</strong> With trusted third-party
                services that help us operate our app (cloud storage, analytics)
              </li>
              <li>
                <strong>Legal Requirements:</strong> When required by law or to
                protect our rights and safety
              </li>
              <li>
                <strong>Business Transfers:</strong> In the event of a merger,
                acquisition, or sale of assets
              </li>
              <li>
                <strong>With Your Consent:</strong> When you explicitly
                authorize us to share specific information
              </li>
            </ul>
          </PolicySection>

          {/* Data Security */}
          <PolicySection title="Data Security" icon={<Lock size={24} />}>
            <p>
              We implement industry-standard security measures to protect your
              information:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>End-to-end encryption for sensitive financial data</li>
              <li>Secure data transmission using SSL/TLS protocols</li>
              <li>Regular security audits and vulnerability assessments</li>
              <li>Access controls and authentication mechanisms</li>
              <li>Secure cloud storage with reputable providers</li>
              <li>Regular data backups with encryption</li>
            </ul>
            <p className="mt-4">
              While we strive to protect your information, no method of
              transmission over the internet is 100% secure. We cannot guarantee
              absolute security but are committed to protecting your data to the
              best of our ability.
            </p>
          </PolicySection>

          {/* User Rights */}
          <PolicySection
            title="Your Rights and Choices"
            icon={<Shield size={24} />}
          >
            <p>
              You have the following rights regarding your personal information:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>
                <strong>Access:</strong> Request a copy of the personal
                information we hold about you
              </li>
              <li>
                <strong>Correction:</strong> Update or correct inaccurate
                personal information
              </li>
              <li>
                <strong>Deletion:</strong> Request deletion of your personal
                information (subject to legal requirements)
              </li>
              <li>
                <strong>Portability:</strong> Export your data in a commonly
                used format
              </li>
              <li>
                <strong>Opt-out:</strong> Unsubscribe from marketing
                communications
              </li>
              <li>
                <strong>Notification Settings:</strong> Control what
                notifications you receive
              </li>
            </ul>
            <p className="mt-4">
              To exercise these rights, please contact us using the information
              provided in the "Contact Us" section below.
            </p>
          </PolicySection>

          {/* Data Retention */}
          <PolicySection title="Data Retention" icon={<Calendar size={24} />}>
            <p>We retain your information for as long as necessary to:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Provide you with our services</li>
              <li>Comply with legal obligations</li>
              <li>Resolve disputes and enforce agreements</li>
              <li>Improve our services</li>
            </ul>
            <p className="mt-4">
              When you delete your account, we will delete your personal
              information within 30 days, except where we are required to retain
              it for legal or regulatory purposes.
            </p>
          </PolicySection>

          {/* Children's Privacy */}
          <PolicySection title="Children's Privacy" icon={<Users size={24} />}>
            <p>
              Our service is not intended for children under the age of 13. We
              do not knowingly collect personal information from children under
              13. If you are a parent or guardian and believe your child has
              provided us with personal information, please contact us
              immediately.
            </p>
          </PolicySection>

          {/* Changes to Policy */}
          <PolicySection
            title="Changes to This Privacy Policy"
            icon={<FileText size={24} />}
          >
            <p>
              We may update this Privacy Policy from time to time to reflect
              changes in our practices or for other operational, legal, or
              regulatory reasons. We will notify you of any material changes by:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Posting the updated policy in the app</li>
              <li>
                Sending you an email notification (if you have provided your
                email)
              </li>
              <li>Displaying a prominent notice in the app</li>
            </ul>
            <p className="mt-4">
              Your continued use of the app after any changes indicates your
              acceptance of the updated Privacy Policy.
            </p>
          </PolicySection>

          {/* Contact Information */}
          <PolicySection title="Contact Us" icon={<Mail size={24} />}>
            <p>
              If you have any questions, concerns, or requests regarding this
              Privacy Policy or our data practices, please contact us:
            </p>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mt-4">
              <div className="space-y-2">
                <p>
                  <strong>Email:</strong> privacy@expensetracker.com
                </p>
                <p>
                  <strong>Address:</strong> 123 Privacy Street, Data City, DC
                  12345
                </p>
                <p>
                  <strong>Phone:</strong> +1 (555) 123-4567
                </p>
              </div>
            </div>
            <p className="mt-4">
              We will respond to your inquiry within 30 days of receiving your
              request.
            </p>
          </PolicySection>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            This Privacy Policy is effective as of {lastUpdated}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
