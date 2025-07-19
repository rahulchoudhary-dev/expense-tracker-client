export function objectToFormData(
  obj: any,
  form?: FormData,
  namespace?: string
): FormData {
  const formData = form || new FormData();

  for (const property in obj) {
    if (
      !obj.hasOwnProperty(property) ||
      obj[property] === undefined ||
      obj[property] === null
    ) {
      continue;
    }

    const formKey = namespace ? `${namespace}[${property}]` : property;
    const value = obj[property];

    if (value instanceof File || value instanceof Blob) {
      formData.append(formKey, value);
    } else if (typeof value === "object" && !(value instanceof Date)) {
      objectToFormData(value, formData, formKey); // recursive call
    } else {
      formData.append(formKey, value);
    }
  }

  return formData;
}
