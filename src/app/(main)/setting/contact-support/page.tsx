"use client";

import React, { useState } from "react";
import {
  HelpCircle,
  Mail,
  MessageCircle,
  Phone,
  ChevronDown,
  ChevronUp,
  Book,
} from "lucide-react";
import BackButton from "../_components/BackButton";
import ContactMethod from "./ContactMethod";
import { categories, faqs } from "../_data";
import SupportHours from "./SupportHours";
import ContactForm from "./ContactForm";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const ContactSupport = () => {
  const [selectedCategory, setSelectedCategory] = useState("general");

  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const filteredFAQs = faqs.filter((faq) => faq.category === selectedCategory);

  const FAQItem: React.FC<{ faq: FAQ }> = ({ faq }) => (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg">
      <button
        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
      >
        <span className="font-medium text-gray-900 dark:text-white">
          {faq.question}
        </span>
        {expandedFAQ === faq.id ? (
          <ChevronUp size={20} className="text-gray-500" />
        ) : (
          <ChevronDown size={20} className="text-gray-500" />
        )}
      </button>
      {expandedFAQ === faq.id && (
        <div className="px-6 pb-4">
          <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <BackButton />
            <div className="flex items-center">
              <HelpCircle
                className="mr-3 text-blue-600 dark:text-blue-400"
                size={32}
              />
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Contact Support
              </h1>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            We're here to help! Choose the best way to get in touch with our
            support team.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Get in Touch
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <ContactMethod
              icon={<Mail size={24} />}
              title="Email Support"
              description="Send us a detailed message and we'll respond within 24 hours"
              action="support@expendo.com"
              onClick={() => window.open("mailto:support@expensetracker.com")}
            />
            <ContactMethod
              icon={<MessageCircle size={24} />}
              title="Live Chat"
              description="Chat with our support team in real-time"
              action="Start Live Chat"
              onClick={() => alert("Live chat feature coming soon!")}
            />
            <ContactMethod
              icon={<Phone size={24} />}
              title="Phone Support"
              description="Call us for urgent issues or complex problems"
              action="+1 (555) 123-4567"
              onClick={() => window.open("tel:+15551234567")}
            />
            <ContactMethod
              icon={<Book size={24} />}
              title="Help Center"
              description="Browse our comprehensive knowledge base and tutorials"
              action="Visit Help Center"
              onClick={() => alert("Redirecting to help center...")}
            />
          </div>
        </div>

        {/* Support Hours */}
        <SupportHours />

        {/* Contact Form */}
        <ContactForm />

        {/* FAQ Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Frequently Asked Questions
          </h2>

          {/* FAQ Categories */}
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center px-4 py-2 rounded-lg border transition-colors ${
                  selectedCategory === category.id
                    ? "bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900 dark:border-blue-700 dark:text-blue-300"
                    : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600"
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.label}
              </button>
            ))}
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {filteredFAQs.map((faq) => (
              <FAQItem key={faq.id} faq={faq} />
            ))}
          </div>

          {filteredFAQs.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">
                No FAQs available for this category yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactSupport;
