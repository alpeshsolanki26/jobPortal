import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2,"Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password minimum 6 characters"),
  type: z.string(),
  contactNumber: z.string().min(10, "Contact number required"),
   bio: z
    .string()
    .min(10, "Bio minimum 10 characters"),
});


export type RegisterFormData = z.infer<
  typeof registerSchema
>;

