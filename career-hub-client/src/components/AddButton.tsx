import React from "react";
import { Plus } from "lucide-react";

interface AddButtonProps {
  label: string;
  onClick: () => void;
}

export default function AddButton({ label, onClick }: AddButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center space-x-2 bg-indigo-50 text-indigo-600 font-medium py-2 px-5 rounded-full hover:bg-indigo-100 transition shadow-sm"
    >
      <Plus className="w-4 h-4" />
      <span>{label}</span>
    </button>
  );
}
