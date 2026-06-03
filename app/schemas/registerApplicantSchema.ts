import { z } from "zod";

export const registerApplicantSchema = z.object({
  email: z
    .string()
    .email("Invalid email address"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),

  type: z.literal("applicant"),

  name: z
    .string()
    .min(2, "Name is required"),

  education: z.array(
    z.object({
      institutionName: z
        .string()
        .min(1, "Institution name is required"),

      startYear: z
        .number()
        .min(1900, "Invalid start year"),

      endYear: z
        .number()
        .min(1900, "Invalid end year"),
    })
  ),

  skills: z.array(
    z.string().min(1, "Skill cannot be empty")
  ),

  rating: z.number().default(-1),

  resume: z.string().optional(),

  profile: z.string().optional(),
});

export type RegisterApplicantFormData = z.infer<
  typeof registerApplicantSchema
>;

