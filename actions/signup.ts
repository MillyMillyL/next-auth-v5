"use server";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { SignupSchema } from "../schemas/index";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

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

  //generate verfificationToken
  const verfificationToken = await generateVerificationToken(email);

  await sendVerificationEmail(
    "liuhongmein@gmail.com",
    verfificationToken.token
  );

  return { success: "Confirmation email sent!" };
}
