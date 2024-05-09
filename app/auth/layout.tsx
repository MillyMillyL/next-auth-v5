import React, { ReactNode } from "react";

function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-full flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-200 to to-blue-800">
      {children}
    </div>
  );
}

export default AuthLayout;
