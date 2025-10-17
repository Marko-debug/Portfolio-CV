import React from "react";

interface ResetPasswordModalProps {
  onClose: () => void;
}

export default function ResetPasswordModal({ onClose }: ResetPasswordModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8 relative border border-gray-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        {/* Back Arrow */}
        <button
          onClick={onClose}
          className="absolute top-3 left-3 text-gray-500 hover:text-gray-700 text-lg"
        >
          ←
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">
          Forgot your password?
        </h2>

        {/* Subtitle */}
        <p className="text-center text-gray-600 mb-6 text-sm">
          Please enter your email address and we’ll send you a link to reset your password.
        </p>

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("Password reset link sent!");
            onClose();
          }}
          className="space-y-5"
        >
          <input
            type="email"
            placeholder="Your email address"
            required
            className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white rounded-lg py-2 font-medium hover:bg-indigo-700 transition"
          >
            Reset Password
          </button>
        </form>

        {/* Register Link */}
        <p className="text-center text-gray-600 text-sm mt-6">
          No account yet?{" "}
          <button className="text-indigo-600 hover:underline font-medium">
            Register now
          </button>
        </p>
      </div>
    </div>
  );
}
