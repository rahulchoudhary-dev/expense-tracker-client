"use client";

import React, { memo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, CreditCard, Tag, DollarSign } from "lucide-react";
import { ExpenseDetailsDialogProps, Attachment } from "./types/expense";
import {
  CATEGORY_BG_COLOR_MAP,
  CATEGORY_TEXT_COLOR_MAP,
} from "../ExpenseTableColumns";
import AttachmentViewer from "./AttachmentViewer";
import AttachmentGrid from "./AttachmentGrid";
import AttachmentUploader from "../AttachmentUploader";
import useUploadExpenseAttachments from "@/query/uploadExpenseAttachments";
import {
  useDismissToast,
  useShowError,
  useShowLoading,
  useShowSuccess,
} from "@/app/toastProvider";
import useGetExpenseById from "@/query/useGetExpenseById";
import LoadingSpinner from "@/components/LoadingSpinner";
import useDeleteExpenseAttachment from "@/query/useDeleteExpenseAttachment";

const ExpenseDetailsDialog: React.FC<ExpenseDetailsDialogProps> = ({
  expenseId,
  isOpen,
  onClose,
}) => {
  if (!expenseId) return null;
  const [deletingAttachmentId, setDeletingAttachmentId] = useState<
    number | null
  >(null);

  const [attachmentFiles, setAttachmentFiles] = useState<File[]>([]);
  const [selectedAttachment, setSelectedAttachment] =
    useState<Attachment | null>(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const showSuccessToast = useShowSuccess();
  const showErrorToast = useShowError();
  const showLoading = useShowLoading();
  const dismissToast = useDismissToast();

  const { data: expense, isLoading, refetch } = useGetExpenseById(expenseId);

  const { mutate: uploadExpenseAttachmentsMutation, isPending } =
    useUploadExpenseAttachments();

  const { mutate: deleteAttachmentMutation } = useDeleteExpenseAttachment();

  const handleViewAttachment = (attachment: Attachment) => {
    setSelectedAttachment(attachment);
    setIsViewerOpen(true);
  };

  const handleDeleteAttachment = (attachmentId: number) => {
    setDeletingAttachmentId(attachmentId);
    const toastId = showLoading("Deleting attachment...");
    deleteAttachmentMutation(attachmentId, {
      onSuccess: () => {
        dismissToast(toastId);
        showSuccessToast("Attachment deleted successfully");
        refetch();
        setDeletingAttachmentId(null);
      },
      onError: (err) => {
        dismissToast(toastId);
        showErrorToast(err?.message || "Upload failed");
        setDeletingAttachmentId(null);
      },
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const handleViewDialogClose = () => {
    onClose();
    setAttachmentFiles([]);
  };

  const uploadAttachmentHandler = () => {
    setAttachmentFiles([]);
    const toastId = showLoading("Uploading Attachments ...");

    const formData = new FormData();
    formData.append("expenseId", String(expense?.id));

    attachmentFiles.forEach((file) => {
      formData.append("files", file);
    });

    uploadExpenseAttachmentsMutation(formData, {
      onSuccess: () => {
        dismissToast(toastId);
        showSuccessToast("Attachment uploaded successfully");
        refetch();
      },
      onError: (err) => {
        dismissToast(toastId);
        showErrorToast(err?.message || "Upload failed");
      },
    });
  };
  if (isLoading) {
    <LoadingSpinner />;
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={() => handleViewDialogClose()}>
        <DialogContent className="w-[70vw] max-w-4xl max-h-[95vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="text-xl sm:text-2xl font-semibold">
              Expense Details
            </DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="details" className="w-[470px]">
            <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 h-auto sm:h-10">
              <TabsTrigger
                value="details"
                className="cursor-pointer text-xs sm:text-sm py-2 sm:py-1.5"
              >
                Details
              </TabsTrigger>
              <TabsTrigger
                value="attachments"
                className="cursor-pointer text-xs sm:text-sm py-2 sm:py-1.5"
              >
                <span className="hidden sm:inline">Attachments</span>
                <span className="sm:hidden">Files</span>
                <span className="ml-1">({expense?.attachments?.length})</span>
              </TabsTrigger>
              <TabsTrigger
                value="addAttachments"
                className="cursor-pointer text-xs sm:text-sm py-2 sm:py-1.5"
              >
                <span className="hidden sm:inline">Add Attachments</span>
                <span className="sm:hidden">Add Files</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent
              value="details"
              className="space-y-4 sm:space-y-6 mt-4 sm:mt-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <DollarSign className="h-4 w-4" />
                    Amount
                  </div>
                  <div className="text-2xl sm:text-3xl text-gray-800 font-bold dark:text-white">
                    {formatCurrency(expense?.amount)}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    Date
                  </div>
                  <div className="text-base sm:text-lg font-medium">
                    {formatDate(expense?.date)}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <Tag className="h-4 w-4" />
                    Category
                  </div>
                  <span className="capitalize">
                    <Badge
                      variant="outline"
                      className={`px-2 py-1 rounded-md text-xs sm:text-sm ${
                        CATEGORY_BG_COLOR_MAP[expense?.Category?.name]
                      } dark:${
                        CATEGORY_TEXT_COLOR_MAP[expense?.Category?.name]
                      }`}
                    >
                      {expense?.Category?.name}
                    </Badge>
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <CreditCard className="h-4 w-4" />
                    Payment Method
                  </div>
                  <Badge variant="outline" className="text-xs sm:text-sm">
                    {expense?.PaymentMethod?.name}
                  </Badge>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground">
                  Description
                </div>
                <div className="text-sm sm:text-base leading-relaxed p-3 sm:p-4 bg-muted/50 rounded-lg">
                  {expense?.description}
                </div>
              </div>
              <Separator />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                <div>
                  <span className="font-medium">Created:</span>{" "}
                  {formatDate(expense?.createdAt)}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="attachments" className="mt-4 sm:mt-6">
              <div className="max-h-[50vh] sm:max-h-[60vh] overflow-y-auto">
                <AttachmentGrid
                  attachments={expense?.attachments}
                  onView={handleViewAttachment}
                  onDelete={handleDeleteAttachment}
                  deletingAttachmentId={deletingAttachmentId}
                />
              </div>
            </TabsContent>

            <TabsContent value="addAttachments" className="mt-4 sm:mt-6">
              <div className="w-full overflow-y-auto">
                <AttachmentUploader
                  attachmentFiles={attachmentFiles}
                  setAttachmentFiles={setAttachmentFiles}
                  isViewExpense={true}
                  uploadAttachmentHandler={uploadAttachmentHandler}
                  isPending={isPending}
                />
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      <AttachmentViewer
        attachment={selectedAttachment}
        isOpen={isViewerOpen}
        onClose={() => {
          setIsViewerOpen(false);
          setSelectedAttachment(null);
        }}
      />
    </>
  );
};
export default memo(ExpenseDetailsDialog);
