"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { UploadIcon, Trash2Icon } from "lucide-react";
import { useShowInfo } from "@/app/toastProvider";

type AttachmentUploaderProps = {
  attachmentFiles: File[];
  setAttachmentFiles: React.Dispatch<React.SetStateAction<File[]>>;
};

const MAX_FILES = 5;

export default function AttachmentUploader({
  attachmentFiles,
  setAttachmentFiles,
}: AttachmentUploaderProps) {
  const showInfo = useShowInfo();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(event.target.files || []);
    const totalFiles = attachmentFiles.length + selected.length;

    if (totalFiles > MAX_FILES) {
      showInfo(`You can only upload a maximum of ${MAX_FILES} files.`);
      return;
    }

    setAttachmentFiles((prev) => [...prev, ...selected]);
  };

  const handleDelete = (index: number) => {
    setAttachmentFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full space-y-6">
      {/* Enhanced Upload Area */}
      <div className="relative group">
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center transition-all duration-300 hover:border-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-950/20">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <UploadIcon className="h-8 w-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-md">
                <span className="text-white text-xs font-bold">+</span>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Upload Attachments
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 max-w-sm">
                Drag and drop your images here, or click to browse
              </p>
            </div>

            <Button
              type="button"
              onClick={handleClick}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <input
                type="file"
                multiple
                ref={fileInputRef}
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
              Choose Files
            </Button>
          </div>
        </div>
      </div>

      {/* Enhanced Info Text */}
      <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">i</span>
            </div>
          </div>
          <div className="text-sm text-blue-800 dark:text-blue-200">
            <p className="font-medium">Upload Guidelines</p>
            <p className="mt-1 text-blue-700 dark:text-blue-300">
              You can upload up to{" "}
              <span className="font-semibold">{MAX_FILES}</span> image
              attachments. All attachments will be submitted automatically with
              your expense details.
            </p>
          </div>
        </div>
      </div>

      {/* Enhanced Attachments List */}
      {attachmentFiles.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 px-6 py-4 border-b border-gray-200 dark:border-gray-600">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Uploaded Attachments
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {attachmentFiles.length} file
                  {attachmentFiles.length !== 1 ? "s" : ""} ready
                </p>
              </div>
            </div>
          </div>

          <div className="h-50 overflow-y-auto custom-scrollbar">
            <ul className="divide-y divide-gray-200 dark:divide-gray-600 ">
              {attachmentFiles.map((file, index) => (
                <li
                  key={index}
                  className="group px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 flex-1 min-w-0">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-500 rounded-lg flex items-center justify-center shadow-sm">
                          <svg
                            className="w-5 h-5 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                          {file.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Image file • Ready to upload
                        </p>
                      </div>
                    </div>

                    <div className="flex-shrink-0 ml-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(index)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg"
                      >
                        <Trash2Icon className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
