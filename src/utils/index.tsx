import { ZodError, ZodSchema } from "zod";
import { AxiosResponse, AxiosError } from 'axios';
import axiosClient from "@/configs/axios-client";

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



/**
 * Handles API calls safely with validation.
 *
 * @param axiosFn Function to call for the API request.
 * @param validationSchema Validation schema for the response data.
 * @returns Promise that resolves to the validated response data.
 */
export async function safeApiCall<T>({
  axiosFn,
  validationSchema
}: {
  axiosFn: () => Promise<AxiosResponse<T>>,
  validationSchema?: ZodSchema
}): Promise<T> {
  try {
    const response: AxiosResponse = await axiosFn();
    if (isAcceptedStatus(response.status)) {
      if (!validationSchema) return response.data;
      return validateApiResponse(response.data, validationSchema);
    } else {
      throw new Error(`API request failed with status code ${response.status}`);
    }
  } catch (error) {
    const errorLog = {
      funcName: axiosFn.name,
      error,
    };

    if (error instanceof AxiosError) {
      console.error('Axios error:', errorLog);
      throw new Error('Network error occurred');
    } else if (error instanceof ZodError) {
      console.error('Validation error:', errorLog);
      throw new Error('Api response validation failed')
    } else {
      console.error('Unexpected error:', errorLog);
      throw new Error('An unexpected error occurred');
    }
  }
}

/**
 * Validates the response data using a Zod validation schema.
 *
 * @param responseData Response data to validate.
 * @param validationSchema Validation schema for the response data.
 * @returns Validated response data.
 */
function validateApiResponse<T>(
  responseData: any,
  validationSchema: ZodSchema<T>
): T {
  return validationSchema.parse(responseData)
}

/**
 * Checks if an HTTP status code is considered a successful or accepted status.
 *
 * @param statusCode HTTP status code to check.
 * @returns True if the status code is in the 2xx range (success) or 3xx range (redirection), false otherwise.
 */
export function isAcceptedStatus(statusCode: number): boolean {
  return (statusCode >= 200 && statusCode < 300) || (statusCode >= 300 && statusCode < 400);
}