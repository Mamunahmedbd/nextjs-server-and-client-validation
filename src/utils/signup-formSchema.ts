import { z } from "zod";

export const signupFormSchema = z.object({
  email: z.preprocess(
    (value) => (value === "" ? undefined : value),
    z.string({ required_error: "Email is required" }).email("Email is invalid")
  ),
  username: z.preprocess(
    (value) => (value === "" ? undefined : value),
    z.string({ required_error: "Username is required" })
  ),
  password: z.preprocess(
    (value) => (value === "" ? undefined : value),
    z.string({ required_error: "Password is required" })
  ),
  description: z.preprocess(
    (value) => (value === "" ? undefined : value),
    z
      .string({ required_error: "Description is required" })
      .min(10, "Description is too short")
      .max(100, "Description is too long")
  ),
});

export type SignupFormSchemaType = z.infer<typeof signupFormSchema>;
