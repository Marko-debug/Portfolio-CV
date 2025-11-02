import React, { ReactNode } from "react";

interface CardProps {
  title: string;
  children: ReactNode;
}

export default function Card({ title, children }: CardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 mb-6">
      <h2 className="text-2xl font-semibold text-indigo-600 mb-3">{title}</h2>
      <div className="text-gray-700 text-sm leading-relaxed">{children}</div>
    </div>
  );
}
