"use client";

import React, { useState, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import { LogIn, LogOut, BarChart2, Menu, X } from "lucide-react";
import LoginModal from "./modals/LoginModal";
import MetricsModal from "./modals/MetricsModal";
import { AuthContext } from "../context/AuthContext";
import { getExperiences } from "../services/experienceService";
import { getSkills } from "../services/skillService";
import { getCertifications } from "../services/certificationService";
import { getLanguages } from "../services/languageService";

export default function SidebarMenu() {
  const { isAuthenticated, logoutUser } = useContext(AuthContext);
  const { t } = useTranslation();
  const [active, setActive] = useState<string | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showMetrics, setShowMetrics] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [metrics, setMetrics] = useState({
    experiences: 0,
    certifications: 0,
    skills: 0,
    languages: 0,
  });

  // ✅ Load metrics
  useEffect(() => {
    async function loadMetrics() {
      try {
        const [expe, cert, skill, lang] = await Promise.all([
          getExperiences(),
          getCertifications(),
          getSkills(),
          getLanguages(),
        ]);
        setMetrics({
          experiences: expe.length,
          certifications: cert.length,
          skills: skill.length,
          languages: lang.length,
        });
      } catch (error) {
        console.error("Error loading metrics:", error);
      }
    }
    loadMetrics();
  }, []);

  // ✅ Disable scroll when modal open
  useEffect(() => {
    document.body.style.overflow = showLogin || showMetrics ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showLogin, showMetrics]);

  const handleOpen = (type: string) => {
    setActive(type);
    if (type === "login") setShowLogin(true);
    if (type === "metrics") setShowMetrics(true);
    setMenuOpen(false);
  };

  return (
    <>
      {/* 🖥️ Desktop Sidebar */}
      <div className="hidden sm:flex fixed left-0 top-0 h-screen w-16 bg-[#1a1a1d] border-r border-gray-800 flex-col items-center justify-between shadow-lg py-4 z-40">
        {/* Top Section */}
        <div className="flex flex-col items-center space-y-4">
          {!isAuthenticated ? (
            <button
              onClick={() => handleOpen("login")}
              className={`flex flex-col items-center text-[11px] font-medium transition-all duration-200 ${
                active === "login"
                  ? "text-purple-400 bg-[#222227] rounded-lg px-2 py-1.5 shadow-inner"
                  : "text-gray-400 hover:text-purple-400 hover:bg-[#222227] rounded-lg px-2 py-1.5"
              }`}
            >
              <LogIn className="w-5 h-5 mb-0.5" />
              <span>{t("Log In")}</span>
            </button>
          ) : (
            <button
              onClick={logoutUser}
              className="flex flex-col items-center text-[11px] font-medium text-gray-400 hover:text-red-500 hover:bg-[#222227] rounded-lg px-2 py-1.5 transition-all duration-200"
            >
              <LogOut className="w-5 h-5 mb-0.5" />
              <span>Log Out</span>
            </button>
          )}
        </div>

        {/* Middle Section */}
        <div className="flex flex-col items-center space-y-4">
          <button
            onClick={() => handleOpen("metrics")}
            className={`flex flex-col items-center text-[11px] font-medium transition-all duration-200 ${
              active === "metrics"
                ? "text-purple-400 bg-[#222227] rounded-lg px-2 py-1.5 shadow-inner"
                : "text-gray-400 hover:text-purple-400 hover:bg-[#222227] rounded-lg px-2 py-1.5"
            }`}
          >
            <BarChart2 className="w-5 h-5 mb-0.5" />
            <span>{t("Metrics")}</span>
          </button>
        </div>

        <div className="h-6"></div>
      </div>

      {/* 📱 Mobile Floating Button */}
      <div className="sm:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="bg-[#1a1a1d] border border-gray-700 text-gray-300 hover:text-purple-400 hover:border-purple-500 rounded-xl p-2 shadow-md transition-all"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Rolling-out buttons */}
        {menuOpen && (
          <div className="absolute top-12 left-0 bg-[#1a1a1d] border border-gray-700 rounded-xl shadow-lg py-3 px-4 flex flex-col space-y-3 animate-fadeIn">
            {!isAuthenticated ? (
              <button
                onClick={() => handleOpen("login")}
                className="flex items-center text-sm text-gray-300 hover:text-purple-400 transition"
              >
                <LogIn size={18} className="mr-2" />
                {t("Log In")}
              </button>
            ) : (
              <button
                onClick={logoutUser}
                className="flex items-center text-sm text-gray-300 hover:text-red-500 transition"
              >
                <LogOut size={18} className="mr-2" />
                Log Out
              </button>
            )}

            <button
              onClick={() => handleOpen("metrics")}
              className="flex items-center text-sm text-gray-300 hover:text-purple-400 transition"
            >
              <BarChart2 size={18} className="mr-2" />
              {t("Metrics")}
            </button>
          </div>
        )}
      </div>

      {/* Modals */}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
      {showMetrics && (
        <MetricsModal onClose={() => setShowMetrics(false)} metrics={metrics} />
      )}
    </>
  );
}
