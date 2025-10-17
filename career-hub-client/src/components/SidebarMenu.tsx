import React, { useState, useEffect, useContext } from "react";
import { LogIn, LogOut, BarChart2 } from "lucide-react";
import LoginModal from "./modals/LoginModal";
import MetricsModal from "./modals/MetricsModal";

import { AuthContext } from "../context/AuthContext";

import { getExperiences } from "../services/experienceService";
import { getSkills } from "../services/skillService";
import { getCertifications } from "../services/certificationService";
import { getLanguages } from "../services/languageService";

export default function SidebarMenu() {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const [active, setActive] = useState<string | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showMetrics, setShowMetrics] = useState(false);

  const [metrics, setMetrics] = useState({
    experiences: 0,
    certifications: 0,
    skills: 0,
    languages: 0,
  });

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

  const handleOpen = (type: string) => {
    setActive(type);
    if (type === "login") setShowLogin(true);
    if (type === "metrics") setShowMetrics(true);
  };

  return (
    <>
      <div className="fixed left-0 top-0 h-screen w-14 bg-white border-r border-gray-200 flex flex-col items-center justify-between shadow-sm py-4">
        {/* Top section */}
        <div className="flex flex-col items-center space-y-4">
          {!isLoggedIn ? (
            <button
              onClick={() => handleOpen("login")}
              className={`flex flex-col items-center text-[11px] font-medium transition-all ${
                active === "login"
                  ? "text-indigo-600 bg-indigo-50 rounded-lg px-2 py-1.5"
                  : "text-gray-500 hover:text-indigo-600"
              }`}
            >
              <LogIn className="w-5 h-5 mb-0.5" />
              <span>Log In</span>
            </button>
          ) : (
            <button
              onClick={logout}
              className="flex flex-col items-center text-[11px] font-medium text-gray-500 hover:text-red-600 transition-all"
            >
              <LogOut className="w-5 h-5 mb-0.5" />
              <span>Log Out</span>
            </button>
          )}
        </div>

        {/* Middle section */}
        <div className="flex flex-col items-center space-y-4">
          <button
            onClick={() => handleOpen("metrics")}
            className={`flex flex-col items-center text-[11px] font-medium transition-all ${
              active === "metrics"
                ? "text-indigo-600 bg-indigo-50 rounded-lg px-2 py-1.5"
                : "text-gray-500 hover:text-indigo-600"
            }`}
          >
            <BarChart2 className="w-5 h-5 mb-0.5" />
            <span>Metrics</span>
          </button>
        </div>

        <div className="h-6"></div>
      </div>

      {/* Modals */}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
      {showMetrics && (
        <MetricsModal
          onClose={() => setShowMetrics(false)}
          metrics={metrics}
        />
      )}
    </>
  );
}
