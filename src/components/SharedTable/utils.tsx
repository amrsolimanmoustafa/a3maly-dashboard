import { z, ZodObject, AnyZodObject, ZodTypeAny } from "zod";

export const makeApiResponseSchema = <T extends ZodTypeAny>(data: T) =>
  z.object({
    status: z.boolean(),
    message: z.string(),
    data,
  });

export const makeTableApiResponseZodSchema = <T extends z.AnyZodObject>(data: T) =>
  makeApiResponseSchema(
    z.object({
      from: z.number().or(z.null()),
      last_page: z.number(),
      per_page: z.string(),
      to: z.number().or(z.null()),
      total: z.number(),
      data: z.array(data),
    })
  );

export const isURL = (input: string): boolean => {
  const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
  return urlPattern.test(input);
};

export const numberToBoolean = (input: number): boolean => input === 1;