import React, { useState, useEffect } from "react";
import { Hobby, addHobby } from "../../services/hobbyService";

interface AddHobbyModalProps {
  onClose: () => void;
  onSave: (newHobby: Hobby) => void;
}

export default function AddHobbyModal({ onClose, onSave }: AddHobbyModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    level: "",
    description: "",
  });
  const [saving, setSaving] = useState(false);

  // 🔒 Prevent background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const newHobby = await addHobby(formData);
      onSave(newHobby);
      onClose();
    } catch (err) {
      console.error(err);
      alert("Error saving hobby");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-3 sm:p-6">
      <div className="bg-[#1a1a1d] rounded-2xl shadow-2xl w-full max-w-lg sm:max-w-2xl md:max-w-3xl p-6 sm:p-8 relative border border-gray-700 animate-fadeIn text-gray-200">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-5 text-gray-400 hover:text-gray-200 text-xl transition-colors"
        >
          ✕
        </button>

        {/* Header */}
        <h2 className="text-2xl font-semibold text-purple-400 mb-6 text-center">
          Add Hobby
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-5">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Name
              </label>
              <input
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Ex: Basketball, Piano, Hiking..."
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
                placeholder="Add a short description..."
                className="w-full border border-gray-700 bg-[#222227] rounded-lg p-2.5 text-sm text-gray-100 placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500 resize-none"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end pt-6">
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition text-sm font-medium shadow-md shadow-purple-600/30 disabled:opacity-70"
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
