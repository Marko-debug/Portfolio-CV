"use client";

import React, { useState, useContext } from "react";
import ResetPasswordModal from "./ResetPasswordModal";
import { AuthContext } from "../../context/AuthContext";
import { API_BASE_URL } from "../../services/apiConfig";

interface LoginModalProps {
  onClose: () => void;
}

export default function LoginModal({ onClose }: LoginModalProps) {
  const [showResetModal, setShowResetModal] = useState(false);
  const { setIsAuthenticated } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (showResetModal)
    return <ResetPasswordModal onClose={() => setShowResetModal(false)} />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // ✅ important — sends/receives cookies
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error("Invalid credentials");

      setIsAuthenticated(true);
      onClose();
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-[2px] flex justify-center items-center z-[9999] p-3 sm:p-6">
      <div className="bg-[#1a1a1d] rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-md p-6 sm:p-8 relative border border-gray-700 animate-fadeIn text-gray-200">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-200 text-xl transition-colors"
        >
          ✕
        </button>

        {/* Header */}
        <h2 className="text-3xl font-bold text-purple-400 text-center mb-6">
          Log In
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full border border-gray-700 bg-[#222227] rounded-lg p-2.5 text-sm text-gray-100 placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full border border-gray-700 bg-[#222227] rounded-lg p-2.5 text-sm text-gray-100 placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white rounded-lg py-2.5 font-medium hover:bg-purple-700 transition shadow-md shadow-purple-600/30 disabled:opacity-70"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Forgot password */}
        <div className="text-center mt-6">
          <button
            onClick={() => setShowResetModal(true)}
            className="text-sm text-purple-400 hover:text-purple-300 hover:underline transition"
          >
            Forgot your password?
          </button>
        </div>
      </div>
    </div>
  );
}
