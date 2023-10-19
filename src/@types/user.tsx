import { makeTableApiResponseZodSchema } from "@/components/SharedTable/utils";
import { z } from "zod";

export enum RolesEnum {
  ADMIN = "ADMIN",
  SUPERADMIN = "SUPERADMIN",
  CLIENT = "CLIENT",
  // USER = "USER"
}

export const userZodScheme = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  email_verified_at: z.null().or(z.string()),
  phone: z.string().or(z.null()),
  avatar: z.string().url().or(z.null()),
  is_active: z.number(),
  role: z.nativeEnum(RolesEnum),
  created_at: z.string(),
  updated_at: z.string(),
});

export type User = z.infer<typeof userZodScheme>;

export type UserContextType = {
  user: User[];
};

export const UsersTableApiResponseZodSchema =
  makeTableApiResponseZodSchema(userZodScheme)

export type UsersTableApiResponse = z.infer<typeof UsersTableApiResponseZodSchema>;