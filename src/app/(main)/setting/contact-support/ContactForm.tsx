import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useShowError, useShowSuccess } from "@/app/toastProvider";
import useCreateSupportRequest from "@/query/contact-support/useCreateSupportRequest";
import { TOAST_MESSAGES } from "@/constant";
import { supportRequestDto } from "@/validations/supportRequest.dto";
import InputFiled from "@/components/InputFiled";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FormErrorMessage from "@/components/FormErrorMessage";
import { useAppSelector } from "@/hooks/useRedux";
import useFaqCategories from "@/query/faqs/useFAQCategories";

const ContactForm = () => {
  const { user } = useAppSelector((state) => state.user);
  const { data: faqCategory } = useFaqCategories();
  const { mutate } = useCreateSupportRequest();

  const showSuccessToast = useShowSuccess();
  const showErrorToast = useShowError();
  const formik = useFormik({
    initialValues: {
      userId: user?.id,
      email: user?.email,
      categoryId: (faqCategory && faqCategory[0]?.id) || "",
      subject: "",
      message: "",
    },
    validationSchema: supportRequestDto,
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      mutate(values, {
        onSuccess: () => {
          showSuccessToast(TOAST_MESSAGES.SUPPORT_REQUEST_CREATED);
        },

        onError: (err) => {
          showErrorToast(
            TOAST_MESSAGES.SUPPORT_REQUEST_FAILED ||
              TOAST_MESSAGES.ERROR_GENERIC
          );
        },
      });

      resetForm();
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
            <InputFiled
              type="email"
              name="email"
              placeholder="Enter your Email Address"
              onChange={formik.handleChange}
              value={formik.values.email}
              className="w-full px-4 py-4 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              onError={formik.touched.email && formik.errors.email}
            />
          </div>

          <div className="space-y-4 h-full">
            <Label htmlFor="category">category</Label>
            <Select
              name="category"
              value={formik.values.categoryId.toString()}
              onValueChange={(value) =>
                formik.setFieldValue("categoryId", value)
              }
            >
              <SelectTrigger className="w-full h-full cursor-pointer py-7 rounded-xl">
                <SelectValue placeholder="Select a category h-full ">
                  {faqCategory?.find(
                    (items: any) => items?.id == formik.values?.categoryId
                  )?.name || "Select category"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="shadow-sm">
                {faqCategory?.map((category: any) => (
                  <SelectItem
                    className="text-slate-700 dark:text-slate-200 hover:bg-orange-50 hover:text-red-500  dark:hover:bg-orange-900/20 focus:bg-orange-50 dark:focus:bg-orange-900/20 cursor-pointer transition-colors"
                    key={category.id}
                    value={category.id}
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full "></div>
                      <span>{category.name} </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormErrorMessage name="paymentMethodId" formik={formik} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Subject
          </label>
          <InputFiled
            type="subject"
            name="subject"
            placeholder="Enter your Subject "
            onChange={formik.handleChange}
            value={formik.values.subject}
            className="w-full px-4 py-4 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            onError={formik.touched.subject && formik.errors.subject}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Message
          </label>
          <Textarea
            rows={15}
            {...formik.getFieldProps("message")}
            className="w-full px-3 py-2 border rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent border-gray-300 dark:border-gray-600"
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
