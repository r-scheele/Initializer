import { object, string, TypeOf } from "zod";

// Use body refine method to confirm password
let createUserSchema = object({
	body: object({
		email: string({
			required_error: "Email is required",
		}).email({ message: "Invalid email address" }),
		password: string({
			required_error: "Password is required",
		}).min(6, { message: "Password must at-least 6 characters long" }),
	}),
});

type createUserInput = TypeOf<typeof createUserSchema>;

export { createUserSchema, createUserInput };
