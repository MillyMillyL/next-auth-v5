"use server";

import * as z from "zod";
import { NewPasswordSchema } from "@/schemas";
import { getPasswordRestTokenByToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

export async function newPassword(
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null
) {
  if (!token) return { error: "Missing token!" };

  console.log(values, "--values");

  const validatedFields = NewPasswordSchema.safeParse(values);
  console.log(validatedFields, "--validatedFields");
  console.log(validatedFields.data);
  if (!validatedFields.success) return { error: "Invalid fields" };

  const { password } = validatedFields.data;

  const existingToken = await getPasswordRestTokenByToken(token);
  if (!existingToken) return { error: "Invalid token" };

  const expiredToken = new Date(existingToken.expires) < new Date();
  if (expiredToken) return { error: "Token has expired" };

  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) return { error: "Email does not exist" };

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  });

  await db.passwordResetToken.delete({ where: { id: existingToken.id } });

  return {
    success: "Password updated! Please login with your new password",
  };

  //check if token is passed to the function
  //existing token
  //expired token
  //existing user
  //bcrypt password
  //update password
  //delete token
  //return success
}
