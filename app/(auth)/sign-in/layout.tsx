import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-screen">
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-r from-amber-100 to-yellow-400 z-[-1]">
        {children}
      </div>
    </div>
  );
}
