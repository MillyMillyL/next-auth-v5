import { auth } from "@/auth";

//can be used in server components, server actions, api routes

export const currentUser = async () => {
  const session = await auth();

  return session?.user;
};

export async function currentRole() {
  const session = await auth();
  return session?.user.role;
}
