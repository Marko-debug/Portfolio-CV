import React, { useState, useEffect } from "react";
import { Skill, addSkill } from "../../services/skillService";

interface AddSkillModalProps {
  onClose: () => void;
  onSave: (newSkill: Skill) => void;
}

export default function AddSkillModal({ onClose, onSave }: AddSkillModalProps) {
  const [formData, setFormData] = useState({
    name: "", 
    level: "", 
    description: "", 
  });
  const [saving, setSaving] = useState(false);
  const [step, setStep] = useState(1);

  // 🔒 Prevent background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (step === 1) setStep(2);
  };

  const handleBack = () => {
    if (step === 2) setStep(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const newSkill = await addSkill(formData);
      onSave(newSkill);
      onClose();
    } catch (err) {
      console.error(err);
      alert("Error saving skill");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl p-8 relative border border-gray-200 animate-fadeIn">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-5 text-gray-400 hover:text-gray-600 text-xl"
        >
          ✕
        </button>

        {/* Header */}
        <h2 className="text-2xl font-semibold text-indigo-700 mb-6 text-center">
          Add Experience
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* STEP 1 */}
          {step === 1 && (
            <div className="grid grid-cols-2 gap-5">
              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Ex: Harvard University"
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Level
                </label>
                <input
                  name="level"
                  type="text"
                  required
                  value={formData.level}
                  onChange={handleChange}
                  placeholder="Ex: Bachelor of Science"
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Optional details about your studies..."
                  className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none"
                />
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-end pt-6">
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition text-sm font-medium shadow-sm disabled:opacity-70"
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
