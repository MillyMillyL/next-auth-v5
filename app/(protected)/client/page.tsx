"use client";
import UserInfo from "@/components/auth/user-info";
import { useCurrentUser } from "@/hooks/use-current-user";
import React from "react";

function ClientPage() {
  const user = useCurrentUser();
  return <UserInfo user={user} label="Client component ✌️" />;
}

export default ClientPage;
