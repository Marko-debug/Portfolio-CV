import React, { useState } from "react";
import ResetPasswordModal from "./ResetPasswordModal";

interface LoginModalProps {
  onClose: () => void;
}

export default function LoginModal({ onClose }: LoginModalProps) {
  const [showResetModal, setShowResetModal] = useState(false);

  if (showResetModal)
    return <ResetPasswordModal onClose={() => setShowResetModal(false)} />;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div
        className={`bg-white rounded-2xl shadow-lg w-full max-w-md p-8 relative border border-gray-100 ${
          showResetModal ? "animate-fadeOut" : "animate-fadeIn"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-3xl font-bold text-indigo-600 text-center mb-6">
          Log In
        </h2>

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("Logged in successfully!");
            onClose();
          }}
          className="space-y-5"
        >
          <div>
            <label className="block text-sm text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              required
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              required
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white rounded-lg py-2 font-medium hover:bg-indigo-700 transition"
          >
            Sign In
          </button>
        </form>

        {/* Forgot Password */}
        <div className="text-center mt-6">
          <button
            onClick={() => setShowResetModal(true)}
            className="text-sm text-indigo-600 hover:underline"
          >
            Forgot your password?
          </button>
        </div>
      </div>
    </div>
  );
}
