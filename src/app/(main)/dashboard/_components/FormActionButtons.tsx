import { Button } from "@/components/ui/button";

interface FormActionButtonsProps {
  onCancel: () => void;
  cancelLabel?: string;
  submitLabel?: string;
}

const FormActionButtons = ({
  onCancel,
  cancelLabel = "Cancel",
  submitLabel = "Submit",
}: FormActionButtonsProps) => {
  return (
    <div className="grid grid-cols-2 gap-4 w-auto mx-4 mt-4">
      <Button
        onClick={onCancel}
        type="reset"
        className="bg-red-500 hover:bg-red-400 w-full cursor-pointer"
      >
        {cancelLabel}
      </Button>
      <Button
        type="submit"
        className="w-full cursor-pointer bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700"
      >
        {submitLabel}
      </Button>
    </div>
  );
};

export default FormActionButtons;
