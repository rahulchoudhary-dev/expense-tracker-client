import * as Yup from "yup";

export const supportRequestDto = Yup.object({
  email: Yup.string().email("Invalid email").required("Required"),
  categoryId: Yup.number().required("Required"),
  subject: Yup.string().required("Required"),
  message: Yup.string().required("Required"),
});
