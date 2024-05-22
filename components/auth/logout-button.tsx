"use client";
import { logout } from "@/actions/signout";
import React, { ReactNode } from "react";

interface LogoutButtonProps {
  children?: ReactNode;
}

function LogoutButton({ children }: LogoutButtonProps) {
  function onClick() {
    logout();
  }
  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
}

export default LogoutButton;
