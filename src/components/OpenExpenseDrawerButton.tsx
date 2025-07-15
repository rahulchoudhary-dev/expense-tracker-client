import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { memo } from "react";

interface OpenExpenseDrawerButtonProps {
  onClick: () => void;
}

const OpenExpenseDrawerButton: React.FC<OpenExpenseDrawerButtonProps> = ({
  onClick,
}) => {
  return (
    <Button
      onClick={onClick}
      className="bg-gradient-to-r cursor-pointer from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
    >
      <Plus className="w-4 h-4 mr-2" />
      Add Expense
    </Button>
  );
};

export default memo(OpenExpenseDrawerButton);
