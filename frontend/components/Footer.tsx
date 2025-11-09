"use client";

import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="w-full bg-[#111112] text-gray-300 border-t border-gray-800 shadow-inner relative h-40 flex flex-col justify-center">
      <div className="max-w-7xl mx-auto px-6 w-full">
        {/* Desktop layout */}
        <div className="hidden sm:flex items-center justify-between text-sm">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="font-medium text-purple-400 hover:text-purple-300 transition">
              Marek Orihel
            </span>
            . {t("All rights reserved")}.
          </p>
          <p>
            {t("Crafted by")}{" "}
            <span className="font-medium text-purple-400 hover:text-purple-300 transition">
              Marek Orihel
            </span>
          </p>
        </div>

        {/* Mobile layout */}
        <div className="flex flex-col sm:hidden items-center text-center space-y-2 text-sm">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="font-medium text-purple-400">Marek Orihel</span>.{" "}
            {t("All rights reserved")}.
          </p>
          <p>
            {t("Crafted by")}{" "}
            <span className="font-medium text-purple-400">Marek Orihel</span>
          </p>
        </div>
      </div>

      {/* Decorative underline */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-[85%] h-[2px] bg-purple-600/50 rounded-full" />
    </footer>
  );
}
