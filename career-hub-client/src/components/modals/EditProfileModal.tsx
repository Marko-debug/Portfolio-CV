import React, { useState } from "react";
import { updateProfile } from "../../services/profileService";

interface EditProfileModalProps {
  onClose: () => void;
  onSave: (photoUrl: string, position: string) => void;
}

export default function EditProfileModal({ onClose, onSave }: EditProfileModalProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [position, setPosition] = useState("");
  const [saving, setSaving] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploaded = e.target.files?.[0];
    if (uploaded) {
      setFile(uploaded);
      setPreview(URL.createObjectURL(uploaded));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const data = await updateProfile(file, position);
      onSave(data.photoUrl || "", data.position || "");
    } catch (err) {
      console.error(err);
      alert("Error uploading photo");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-400 hover:text-gray-600 text-xl"
        >
          ✕
        </button>
        <h2 className="text-xl font-semibold text-indigo-700 mb-6 text-center">
          Edit Profile
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-6">
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="w-40 h-40 rounded-full border-4 border-indigo-500 object-cover shadow-md"
            />
          ) : (
            <div className="w-40 h-40 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-sm">
              No photo selected
            </div>
          )}

          <label
            htmlFor="file-upload"
            className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg font-medium text-sm transition-all shadow-sm"
          >
            Choose File
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Position / Title
            </label>
            <input
              type="text"
              placeholder="Ex: Frontend Developer"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-2 w-full">
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 text-sm font-medium shadow-sm disabled:opacity-70"
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
