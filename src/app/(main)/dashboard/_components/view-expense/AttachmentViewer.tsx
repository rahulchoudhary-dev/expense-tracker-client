"use client";

import React, { memo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Download,
  X,
  ZoomIn,
  ZoomOut,
  RotateCw,
  FileText,
  ExternalLink,
} from "lucide-react";
import { AttachmentViewerProps } from "./types/expense";
import { downloadAttachment } from "@/utils/downloadAttachments";

const AttachmentViewer: React.FC<AttachmentViewerProps> = ({
  attachment,
  isOpen,
  onClose,
}) => {
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);

  if (!attachment) return null;

  const openInNewTab = () => {
    window.open(attachment.attachmentUrl, "_blank");
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 25, 25));
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const resetView = () => {
    setZoom(100);
    setRotation(0);
  };

  const isImage = attachment.resource_type === "image";
  const isPdf = attachment.format === "pdf";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[95vh] w-[95vw] p-0 overflow-hidden">
        {/* Header */}
        <DialogHeader className="px-6 py-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <DialogTitle className="text-sm font-semibold">
                Attachment
              </DialogTitle>
              <Badge variant="secondary">
                {attachment.format.toUpperCase()}
              </Badge>
            </div>

            <div className="flex items-center px-5">
              {isImage && (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleZoomOut}
                    disabled={zoom <= 25}
                    title="Zoom out"
                  >
                    <ZoomOut className="h-4 w-4" />
                  </Button>

                  <span className="text-sm text-muted-foreground min-w-[3rem] text-center">
                    {zoom}%
                  </span>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleZoomIn}
                    disabled={zoom >= 200}
                    title="Zoom in"
                  >
                    <ZoomIn className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleRotate}
                    title="Rotate"
                  >
                    <RotateCw className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetView}
                    title="Reset view"
                  >
                    Reset
                  </Button>
                </>
              )}

              <Button
                variant="ghost"
                size="sm"
                onClick={openInNewTab}
                title="Open in new tab"
              >
                <ExternalLink className="h-4 w-4" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => downloadAttachment(attachment)}
                title="Download"
              >
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        {/* Content */}
        <div className="flex-1 overflow-auto bg-gray-50">
          <div className="flex items-center justify-center min-h-full p-4">
            {isImage ? (
              <div className="relative">
                <img
                  src={attachment.attachmentUrl}
                  alt={`Attachment ${attachment.id}`}
                  className="max-w-full max-h-full object-contain shadow-lg rounded-lg"
                  style={{
                    transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
                    transformOrigin: "center",
                    transition: "transform 0.2s ease-in-out",
                  }}
                  onError={(e) => {
                    console.error("Error loading image:", e);
                  }}
                />
              </div>
            ) : isPdf ? (
              <div className="w-full h-full min-h-[600px]">
                <iframe
                  src={attachment.attachmentUrl}
                  className="w-full h-full border-0 rounded-lg shadow-lg"
                  title={`PDF Attachment ${attachment.id}`}
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <FileText className="h-16 w-16 text-muted-foreground" />
                <div>
                  <h3 className="text-lg font-medium mb-2">
                    Preview not available
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    This file type cannot be previewed in the browser.
                  </p>
                  <div className="flex space-x-2">
                    <Button onClick={downloadAttachment}>
                      <Download className="h-4 w-4 mr-2" />
                      Download File
                    </Button>
                    <Button variant="outline" onClick={openInNewTab}>
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Open in New Tab
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default memo(AttachmentViewer);
