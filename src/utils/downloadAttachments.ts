export const downloadAttachment = async (attachment: any) => {
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
