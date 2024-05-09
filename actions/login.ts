"use server";
import * as z from "zod";
import { LoginSchema } from "../schemas/index";

// interface LoginResponse {
//   success: boolean;
//   message?: string;
// }

export async function login(formData: z.infer<typeof LoginSchema>) {
  const validatedFields = LoginSchema.safeParse(formData);

  if (!validatedFields.success) {
    return { success: false, message: "Invalid fields" };
  }

  return { success: true, message: "Logged in successfully" };
}
