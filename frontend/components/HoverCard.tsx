import React, { ReactNode } from "react";

interface HoverCardProps {
  children: ReactNode;
  className?: string; // ✅ allow custom styling
}

export default function HoverCard({ children, className }: HoverCardProps) {
  return (
    <div
      className={`relative cursor-pointer flex flex-col justify-between items-start p-5 rounded-2xl 
                  border border-gray-700 bg-[#222227] 
                  transition-all duration-200 ease-in-out
                  hover:border-purple-500 hover:shadow-md hover:shadow-purple-500/10 ${className || ""}`}
    >
      {children}
    </div>
  );
}
