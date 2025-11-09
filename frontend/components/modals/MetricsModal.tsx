import React from "react";

interface MetricsModalProps {
  onClose: () => void;
  metrics: {
    experiences: number;
    certifications: number;
    skills: number;
    languages: number;
  };
}

export default function MetricsModal({ onClose, metrics }: MetricsModalProps) {
  const metricsData = [
    { label: "Experiences", value: metrics.experiences },
    { label: "Certifications", value: metrics.certifications },
    { label: "Skills", value: metrics.skills },
    { label: "Languages", value: metrics.languages },
  ];

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

        {/* Title */}
        <h2 className="text-3xl font-bold text-purple-400 text-center mb-6">
          Metrics Overview
        </h2>

        {/* Metrics list */}
        <div className="space-y-4">
          {metricsData.map((item) => (
            <div
              key={item.label}
              className="flex justify-between items-center bg-[#222227] rounded-lg px-4 py-3 border border-gray-700 text-gray-300 hover:border-purple-500 hover:shadow-sm transition"
            >
              <span>{item.label}</span>
              <span className="font-semibold text-purple-400">
                {item.value ?? 0}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
