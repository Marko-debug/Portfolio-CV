import React, { useState, useEffect } from "react";
import { Experience, addExperience } from "../../services/experienceService";

interface AddExperienceModalProps {
  onClose: () => void;
  onSave: (newExperience: Experience) => void;
}

export default function AddExperienceModal({ onClose, onSave }: AddExperienceModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    description: "",
    startDate: "",
    endDate: "",
  });
  const [saving, setSaving] = useState(false);
  const [step, setStep] = useState(1);

  // 🔒 Prevent background scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => setStep(2);
  const handleBack = () => setStep(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const newExperience = await addExperience(formData);
      onSave(newExperience);
      onClose();
    } catch (err) {
      console.error(err);
      alert("Error saving experience");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-3 sm:p-6">
      <div className="bg-[#1a1a1d] rounded-2xl shadow-2xl w-full max-w-3xl p-8 relative border border-gray-700 animate-fadeIn text-gray-200">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-5 text-gray-400 hover:text-gray-200 text-xl transition-colors"
        >
          ✕
        </button>

        {/* Header */}
        <h2 className="text-2xl font-semibold text-purple-400 mb-6 text-center">
          Add Experience
        </h2>

        {/* Step indicator */}
        <div className="flex justify-center items-center mb-6 space-x-2">
          <div className={`w-2.5 h-2.5 rounded-full ${step === 1 ? "bg-purple-500" : "bg-gray-600"}`} />
          <div className={`w-2.5 h-2.5 rounded-full ${step === 2 ? "bg-purple-500" : "bg-gray-600"}`} />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* STEP 1 */}
          {step === 1 && (
            <div className="grid grid-cols-2 gap-5">
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Job Title
                </label>
                <input
                  name="title"
                  type="text"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Ex: Frontend Developer"
                  className="w-full border border-gray-700 bg-[#222227] rounded-lg p-2.5 text-sm text-gray-100 placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Company
                </label>
                <input
                  name="company"
                  type="text"
                  required
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Ex: Microsoft"
                  className="w-full border border-gray-700 bg-[#222227] rounded-lg p-2.5 text-sm text-gray-100 placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your responsibilities or key achievements..."
                  className="w-full border border-gray-700 bg-[#222227] rounded-lg p-2.5 text-sm text-gray-100 placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500 resize-none"
                />
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Start Date
                </label>
                <input
                  name="startDate"
                  type="date"
                  required
                  value={formData.startDate}
                  onChange={handleChange}
                  className="w-full border border-gray-700 bg-[#222227] rounded-lg p-2.5 text-sm text-gray-100 focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  End Date
                </label>
                <input
                  name="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={handleChange}
                  className="w-full border border-gray-700 bg-[#222227] rounded-lg p-2.5 text-sm text-gray-100 focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-between pt-6">
            <div>
              {step === 2 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-4 py-2 rounded-lg bg-[#222227] text-gray-300 hover:bg-[#2f2f35] transition text-sm font-medium border border-gray-700"
                >
                  Back
                </button>
              )}
            </div>

            <div className="flex space-x-3">
              {step === 1 && (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition text-sm font-medium shadow-md shadow-purple-600/30"
                >
                  Next
                </button>
              )}

              {step === 2 && (
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition text-sm font-medium shadow-md shadow-purple-600/30 disabled:opacity-70"
                >
                  {saving ? "Saving..." : "Save"}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
