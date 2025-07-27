import { Info } from "lucide-react";

interface iFormErrorMessageProps {
  name: string;
  formik: any;
}

const FormErrorMessage: React.FC<iFormErrorMessageProps> = ({
  name,
  formik,
}) => {
  const hasError = formik.touched[name] && formik.errors[name];

  if (!hasError) return null;

  return (
    <div className="text-red-500 text-sm ml-2 flex gap-1 items-center">
      {" "}
      <Info size={15} /> {formik.errors[name]}
    </div>
  );
};

export default FormErrorMessage;
