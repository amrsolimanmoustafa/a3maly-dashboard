import { z } from "zod";

export const isURL = (input: string): boolean => {
  const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
  return urlPattern.test(input);
};

export const makeApiResponseZodSchema = <T extends z.AnyZodObject>(data: T) =>
  z.object({
    data: z.array(data),
    status: z.number(),
    message: z.string(),
    from: z.number(),
    last_page: z.number(),
    per_page: z.string(),
    to: z.number(),
    total: z.number(),
  });