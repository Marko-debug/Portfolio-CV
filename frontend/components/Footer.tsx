"use client";

import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="w-full bg-indigo-50 text-indigo-700 border-t-4 border-indigo-500 shadow-inner relative">
      <div className="max-w-7xl mx-auto px-6 h-48 flex flex-col sm:flex-row items-center justify-between text-center sm:text-left">
        {/* Left side */}
        <p className="text-xs sm:text-sm">
          © {new Date().getFullYear()}{" "}
          <span className="font-medium">Marek Orihel</span>. {t("all Rights Reserved")}
        </p>

        {/* Right side */}
        <p className="text-xs sm:text-sm flex items-center gap-1">
          {t("Crafted By")}{" "}
          <span className="font-medium">Marek Orihel</span>
        </p>

        {/* Decorative underline */}
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-[85%] h-[2px] bg-indigo-400 rounded-full opacity-60" />
      </div>
    </footer>
  );
}

