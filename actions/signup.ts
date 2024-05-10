"use server";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { SignupSchema } from "../schemas/index";
import { getUserByEmail } from "@/data/user";

// interface LoginResponse {
//   success: boolean;
//   message?: string;
// }

export async function signup(formData: z.infer<typeof SignupSchema>) {
  const validatedFields = SignupSchema.safeParse(formData);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { email, password, name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { sucess: "Email already in use" };
  }

  await db.user.create({
    data: { name, email, password: hashedPassword },
  });

  // TODO: Send verification token email

  return { success: "User created successfully" };
}