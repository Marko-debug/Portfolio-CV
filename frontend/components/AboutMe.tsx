"use client";

import { useTranslation } from "react-i18next";

export default function AboutMe() {
  const { t } = useTranslation();

  return (
    <section className="bg-[#1a1a1d] border border-gray-700 shadow-lg rounded-3xl p-8 text-gray-300 transition-all duration-300">
      <h2 className="text-2xl font-semibold text-purple-400 mb-4 tracking-wide">
        {t("About Me")}
      </h2>

      <p className="leading-relaxed text-gray-300 text-base">
        {t("About Me Text")}
      </p>
    </section>
  );
}
