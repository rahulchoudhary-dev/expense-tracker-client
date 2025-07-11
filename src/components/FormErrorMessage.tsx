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

  return <p className="text-red-500 text-sm ml-2">{formik.errors[name]}</p>;
};

export default FormErrorMessage;
