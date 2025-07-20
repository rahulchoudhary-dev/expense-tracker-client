"use client";

import React, { memo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Trash2, Download, FileImage, FileText, File } from "lucide-react";
import { AttachmentGridProps, Attachment } from "./types/expense";

const AttachmentGrid: React.FC<AttachmentGridProps> = ({
  attachments,
  onView,
  onDelete,
}) => {
  const getFileIcon = (format: string, resourceType: string) => {
    if (resourceType === "image") {
      return <FileImage className="h-8 w-8 text-blue-500" />;
    }
    if (format === "pdf") {
      return <FileText className="h-8 w-8 text-red-500" />;
    }
    return <File className="h-8 w-8 text-gray-500" />;
  };

  const getFileTypeColor = (format: string, resourceType: string) => {
    if (resourceType === "image") return "bg-blue-100 text-blue-800";
    if (format === "pdf") return "bg-red-100 text-red-800";
    return "bg-gray-100 text-gray-800";
  };

  const downloadAttachment = async (attachment: Attachment) => {
    try {
      const response = await fetch(attachment.attachmentUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `attachment-${attachment.id}.${attachment.format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading attachment:", error);
    }
  };

  const formatFileSize = (url: string) => {
    // This is a placeholder - in a real app, you'd get the file size from the API
    return "Unknown size";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (attachments?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <FileImage className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium text-muted-foreground mb-2">
          No attachments
        </h3>
        <p className="text-sm text-muted-foreground">
          This expense doesn't have any attachments.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">
          Attachments ({attachments.length})
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
        {attachments?.map((attachment) => (
          <Card
            key={attachment.id}
            className="hover:shadow-md transition-shadow"
          >
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                {/* File Icon */}
                <div className="flex-shrink-0">
                  {getFileIcon(attachment.format, attachment.resource_type)}
                </div>

                {/* File Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge
                      variant="secondary"
                      className={`text-xs ${getFileTypeColor(
                        attachment.format,
                        attachment.resource_type
                      )}`}
                    >
                      {attachment.format.toUpperCase()}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(attachment.createdAt)}
                    </span>
                  </div>

                  <p className="text-sm font-medium text-gray-900 truncate mb-1">
                    Attachment #{attachment.id}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(attachment.attachmentUrl)}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end space-x-2 mt-4 pt-3 border-t">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onView(attachment)}
                  className="h-8 w-8 p-0"
                  title="View attachment"
                >
                  <Eye className="h-4 w-4" />
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => downloadAttachment(attachment)}
                  className="h-8 w-8 p-0"
                  title="Download attachment"
                >
                  <Download className="h-4 w-4" />
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(attachment.id)}
                  className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                  title="Delete attachment"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default memo(AttachmentGrid);
