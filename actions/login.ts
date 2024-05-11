"use server";
import * as z from "zod";
import { LoginSchema } from "../schemas/index";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { generateVerificationToken } from "@/lib/tokens";
import { getUserByEmail } from "@/data/user";
import sendVerificationEmail from "@/lib/mail";

export async function login(formData: z.infer<typeof LoginSchema>) {
  const validatedFields = LoginSchema.safeParse(formData);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);
  if (!existingUser || !existingUser.email || !existingUser.password)
    return { error: "User does not exist" };

  if (!existingUser.emailVerified) {
    const verfificationToken = await generateVerificationToken(email);

    await sendVerificationEmail(
      "liuhongmein@gmail.com",
      verfificationToken.token
    );

    return { success: "Email needs to be verified. Confirmation email sent" };
  }

  try {
    const user = await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });

    return { success: "Logged in successfully", data: user };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }
    throw error;
  }
}
