import React, { ReactNode } from "react";

interface HoverCardProps {
  children: ReactNode;
}

export default function HoverCard({ children }: HoverCardProps) {
  return (
    <div
      className="relative cursor-pointer flex justify-between items-center p-5 rounded-2xl border border-gray-200 bg-white
                 transition-all duration-200 ease-in-out
                 hover:border-indigo-500 hover:bg-indigo-50 hover:shadow-md"
    >
      {children}
    </div>
  );
}

    