import { Button } from "@/components/ui/button";
import { DrawerTrigger } from "@/components/ui/drawer";
import { Plus } from "lucide-react";

interface OpenExpenseDrawerButtonProps {
  onClick: () => void;
}

const OpenExpenseDrawerButton: React.FC<OpenExpenseDrawerButtonProps> = ({
  onClick,
}) => {
  return (
    <DrawerTrigger asChild>
      <Button
        onClick={onClick}
        className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Expense
      </Button>
    </DrawerTrigger>
  );
};

export default OpenExpenseDrawerButton;
