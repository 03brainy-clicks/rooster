import { z } from "zod";

export const SignupSchema = z.object({
  email: z.string().email(),
  username: z.string(),
  password: z.string().min(8),
});

export const SigninSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const AddBlogSchema = z.object({
  title: z.string(),
  content: z.string(),
  published: z.boolean(),
});

export const UpdateBlogSchema = z.object({
  title: z.string(),
  content: z.string(),
  published: z.boolean(),
});

export type AddBlogType = z.infer<typeof AddBlogSchema>;
export type UpdateBlogType = z.infer<typeof UpdateBlogSchema>;

export type SignupType = z.infer<typeof SignupSchema>;
export type SigninType = z.infer<typeof SigninSchema>;
