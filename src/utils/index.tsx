export function objectToFormData(obj: Record<string, any>): FormData {
  const formData = new FormData();

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];

      if (Array.isArray(value)) {
        for (const item of value) {
          formData.append(key, item);
        }
      } else if (typeof value === 'object' && !(value instanceof File)) {
        // Handle nested objects by recursively converting them to FormData
        const nestedFormData = objectToFormData(value);
        for (const [nestedKey, nestedValue] of nestedFormData.entries()) {
          formData.append(`${key}[${nestedKey}]`, nestedValue);
        }
      } else {
        formData.append(key, value);
      }
    }
  }

  return formData;
}