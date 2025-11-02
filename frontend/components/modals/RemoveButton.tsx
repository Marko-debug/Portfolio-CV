import React, { useState } from "react";
import { X } from "lucide-react";

interface RemoveButtonProps {
  onConfirm: () => Promise<void> | void;
}

export default function RemoveButton({ onConfirm }: RemoveButtonProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleConfirm = async () => {
    setDeleting(true);
    try {
      await onConfirm(); // ✅ perform deletion from backend
      setShowConfirm(false); // close modal after success
    } catch (err) {
      console.error("Error deleting:", err);
      alert("Failed to delete experience.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        className="flex items-center text-gray-400 hover:text-red-500 text-sm font-medium transition"
      >
        <X className="w-4 h-4 mr-1" />
        Remove
      </button>

      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm animate-fadeIn">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Are you sure you want to delete this work experience?
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              This action cannot be undone.
            </p>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                disabled={deleting}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
              >
                {deleting ? "Deleting..." : "Yes, delete it"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
