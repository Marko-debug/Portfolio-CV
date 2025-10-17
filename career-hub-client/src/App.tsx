import React from "react";
import SidebarMenu from "./components/SidebarMenu";
import CvPage from "./pages/CvPage";
import Footer from "./components/Footer";
import ReactCountryFlag from "react-country-flag";

function App() {
  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar — fixed, always visible */}
      <div className="fixed top-0 left-0 h-full w-20 bg-white shadow-md z-20">
        <SidebarMenu />
      </div>

      {/* Main content */}
      <div className="ml-20 flex-1 flex flex-col min-h-screen relative">
        {/* 🌍 Fixed language selector (stays visible when scrolling) */}
        <div className="fixed top-2 right-6 bg-white border border-indigo-100 rounded-2xl shadow-sm px-4 py-2 flex items-center space-x-3 z-30">
          {/* English Flag */}
          <button
            className="flex items-center justify-center w-8 h-8 rounded-xl bg-indigo-50 hover:bg-indigo-100 transition border border-indigo-100 shadow-sm"
            title="English"
          >
            <ReactCountryFlag
              countryCode="GB"
              svg
              style={{ width: "1.3em", height: "1.3em" }}
            />
          </button>

          {/* German Flag */}
          <button
            className="flex items-center justify-center w-8 h-8 rounded-xl bg-indigo-50 hover:bg-indigo-100 transition border border-indigo-100 shadow-sm"
            title="Deutsch"
          >
            <ReactCountryFlag
              countryCode="DE"
              svg
              style={{ width: "1.3em", height: "1.3em" }}
            />
          </button>
        </div>

        {/* Main content scrollable */}
        <div className="flex-1 p-6">
          <CvPage />
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

export default App;
