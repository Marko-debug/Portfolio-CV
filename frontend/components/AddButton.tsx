import React from "react";
import { Plus } from "lucide-react";

interface AddButtonProps {
  label: string;
  onClick: () => void;
  className?: string; // ✅ allow external styling
}

export default function AddButton({ label, onClick, className }: AddButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center space-x-2 
        bg-purple-600 hover:bg-purple-700 
        text-white font-medium py-2 px-5 rounded-full 
        transition-all duration-200 shadow-md 
        hover:shadow-purple-500/20 active:scale-95 ${className || ""}`}
    >
      <Plus className="w-4 h-4" />
      <span>{label}</span>
    </button>
  );
}
