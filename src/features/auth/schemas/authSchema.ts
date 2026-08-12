import { z } from "zod";

export const loginSchema = z.object({
	email: z.string().min(1, "Email is required.").email("Enter a valid email."),
	password: z.string().min(1, "Password is required."),
});

export const signupSchema = loginSchema.extend({
	displayName: z.string().min(1, "Name is required."),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type SignupFormValues = z.infer<typeof signupSchema>;
