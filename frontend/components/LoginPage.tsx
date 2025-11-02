import React from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation"; // ✅ Next.js router
import Link from "next/link";

export default function LoginPage() {
  const { t } = useTranslation();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add actual login logic here later
    alert("Logged in successfully!");
    router.push("/");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white rounded-2xl shadow-md p-8 w-full max-w-md border border-gray-100">
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-8">
          {t("Log In")}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-700 mb-1">{t("Email")}</label>
            <input
              type="email"
              placeholder="you@example.com"
              required
              className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">{t("Password")}</label>
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
            {t("Sign In")}
          </button>
        </form>

        <Link
          href="/"
          className="mt-6 w-full text-sm text-indigo-600 hover:underline"
        >
          ← Back to CV
        </Link>
      </div>
    </div>
  );
}
