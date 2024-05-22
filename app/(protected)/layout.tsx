import React, { ReactNode } from "react";
import ProtectedNavbar from "./_components/navbar";

interface ProtectedLayoutProps {
  children: ReactNode;
}

function ProtectedLayout({ children }: ProtectedLayoutProps) {
  return (
    <div className="h-full w-full flex flex-col gap-y-10 items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-200 to to-blue-800">
      <ProtectedNavbar />
      {children}
    </div>
  );
}

export default ProtectedLayout;
