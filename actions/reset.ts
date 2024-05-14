"use server";

import * as z from "zod";
import { ResetSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";
sendPasswordResetEmail;
generatePasswordResetToken;

export async function reset(values: z.infer<typeof ResetSchema>) {
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Invalid Email" };

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) return { error: "Email not found" };

  //TODO: generate token and send email
  const passwordResetToken = await generatePasswordResetToken(email);

  await sendPasswordResetEmail(
    "liuhongmein@gmail.com",
    passwordResetToken.token
  );

  return { success: "Reset email sent" };
}
