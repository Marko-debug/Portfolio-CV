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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-[2px] flex justify-center items-center z-[9999]">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8 relative border border-gray-100 animate-fadeIn">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-3xl font-bold text-indigo-600 text-center mb-6">
          Metrics Overview
        </h2>

        {/* Metrics list */}
        <div className="space-y-4">
          {metricsData.map((item) => (
            <div
              key={item.label}
              className="flex justify-between items-center bg-gray-50 rounded-lg px-4 py-2 border border-gray-100 text-gray-700"
            >
              <span>{item.label}</span>
              <span className="font-semibold text-indigo-600">
                {item.value ?? 0}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
