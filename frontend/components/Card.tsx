import React, { ReactNode } from "react";

interface CardProps {
  title: string;
  children: ReactNode;
  className?: string; // ✅ optional extra styling
}

export default function Card({ title, children, className }: CardProps) {
  return (
    <div
      className={`bg-[#1a1a1d] rounded-2xl shadow-lg p-6 border border-gray-700 mb-6 transition-all duration-200 ${className || ""}`}
    >
      <h2 className="text-2xl font-semibold text-purple-400 mb-4">
        {title}
      </h2>
      <div className="text-gray-300 text-sm leading-relaxed">{children}</div>
    </div>
  );
}
