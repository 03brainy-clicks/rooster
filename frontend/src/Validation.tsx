import { z } from "zod";

export const SignupSchema = z.object({
  username: z.string().min(3).max(20),
  password: z.string().regex(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+=]).{8,}$/),
  email: z.string().email(),
});
export const SigninSchema = z.object({
  password: z.string().min(8).max(20),
  email: z.string().email(),
});
