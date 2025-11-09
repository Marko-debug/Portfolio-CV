"use client";

import SidebarMenu from "@/components/SidebarMenu";
import CvPage from "@/components/CvPage";
import Footer from "@/components/Footer";
import ReactCountryFlag from "react-country-flag";

export default function HomePage() {
  return (
    <div className="flex bg-[#121214] min-h-screen text-gray-200">
      {/* SidebarMenu handles desktop and mobile automatically */}
      <SidebarMenu />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen relative ml-0 sm:ml-16 px-4 md:px-10">
        {/* Language selector */}
        <div className="fixed top-3 right-6 bg-[#1a1a1d] border border-gray-700 rounded-2xl shadow-md px-4 py-2 flex items-center space-x-3 z-40">
          <button
            className="flex items-center justify-center w-8 h-8 rounded-xl bg-[#222227] border border-gray-700 hover:border-purple-500 hover:text-purple-400 transition-all duration-200"
            title="English"
          >
            <ReactCountryFlag
              countryCode="GB"
              svg
              style={{ width: "1.3em", height: "1.3em" }}
            />
          </button>

          <button
            className="flex items-center justify-center w-8 h-8 rounded-xl bg-[#222227] border border-gray-700 hover:border-purple-500 hover:text-purple-400 transition-all duration-200"
            title="Deutsch"
          >
            <ReactCountryFlag
              countryCode="DE"
              svg
              style={{ width: "1.3em", height: "1.3em" }}
            />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 p-6 md:p-10 bg-[#121214]">
          <CvPage />
        </div>

        <Footer />
      </div>
    </div>
  );
}
