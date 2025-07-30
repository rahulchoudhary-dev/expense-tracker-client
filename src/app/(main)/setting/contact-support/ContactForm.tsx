import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { categories } from "../_data";
import { useShowSuccess } from "@/app/toastProvider";

const ContactForm = () => {
  const showSuccessToast = useShowSuccess();
  const formik = useFormik({
    initialValues: {
      email: "",
      category: categories[0]?.id || "",
      subject: "",
      message: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Required"),
      category: Yup.string().required("Required"),
      subject: Yup.string().required("Required"),
      message: Yup.string().required("Required"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log("Form submitted:", values);
      showSuccessToast("Query Successfullty submited");
      resetForm();
      // TODO: handle submission logic (e.g., API call)
    },
  });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        Send us a Message
      </h2>
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Your Email
            </label>
            <input
              type="email"
              {...formik.getFieldProps("email")}
              className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent border-gray-300 dark:border-gray-600"
              placeholder="your.email@example.com"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-sm text-red-500 mt-1">{formik.errors.email}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Category
            </label>
            <select
              {...formik.getFieldProps("category")}
              className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent border-gray-300 dark:border-gray-600"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.label}
                </option>
              ))}
            </select>
            {formik.touched.category && formik.errors.category && (
              <p className="text-sm text-red-500 mt-1">
                {formik.errors.category}
              </p>
            )}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Subject
          </label>
          <input
            type="text"
            {...formik.getFieldProps("subject")}
            className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent border-gray-300 dark:border-gray-600"
            placeholder="Brief description of your issue"
          />
          {formik.touched.subject && formik.errors.subject && (
            <p className="text-sm text-red-500 mt-1">{formik.errors.subject}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Message
          </label>
          <textarea
            rows={6}
            {...formik.getFieldProps("message")}
            className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent border-gray-300 dark:border-gray-600"
            placeholder="Please provide as much detail as possible about your issue..."
          />
          {formik.touched.message && formik.errors.message && (
            <p className="text-sm text-red-500 mt-1">{formik.errors.message}</p>
          )}
        </div>
        <Button
          type="submit"
          className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <Send size={18} className="mr-2" />
          Send Message
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
