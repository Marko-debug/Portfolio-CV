"use client";

import { useTranslation } from "react-i18next";

export default function AboutMe() {
  const { t } = useTranslation();

  return (
    <section className="bg-white shadow-sm rounded-3xl p-8 border border-gray-100">
      <h2 className="text-2xl font-semibold text-indigo-700 mb-4">
        {t("About Me")}
      </h2>

      <p className="text-gray-700 leading-relaxed text-base">
        {t("About Me Text")}
      </p>
    </section>
  );
}
