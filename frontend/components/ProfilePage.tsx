import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useTranslation } from "react-i18next";
import EditProfileModal from "../components/modals/EditProfileModal";
import { Mail, Calendar, Linkedin } from "lucide-react";

export default function ProfilePage() {
  const { isAuthenticated } = useContext(AuthContext);
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [photoUrl] = useState("profilePhoto.jpg");
  const [position, setPosition] = useState<string>("");

  // Simulated data (can later come from API)
  const [email] = useState("orihel23@gmail.com");
  const [phone] = useState("+421 948 975 569");
  const [birthDate] = useState("2000-12-14");
  const [linkedin] = useState("https://www.linkedin.com/in/marek-orihel-37870a244");

  const calculateAge = (dob: string): number => {
    const diff = Date.now() - new Date(dob).getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
  };
  const age = calculateAge(birthDate);

  return (
    <div className="flex flex-col items-center text-center pt-16 md:pt-0 pb-8">
      {/* Profile card container */}
      <div className="bg-[#1a1a1d] border border-gray-700 rounded-3xl shadow-lg p-8 max-w-md w-full text-gray-200 relative">
        {/* Profile photo */}
        <div className="relative mb-6 flex justify-center">
          {photoUrl ? (
            <img
              src={photoUrl}
              alt="Profile"
              className="w-40 h-40 md:w-48 md:h-48 rounded-full border-4 border-purple-500 shadow-lg object-cover"
            />
          ) : (
            <div className="w-40 h-40 md:w-48 md:h-48 rounded-full border-4 border-gray-600 bg-[#222227] flex items-center justify-center text-gray-400 text-sm">
              No photo yet
            </div>
          )}

          {isAuthenticated && (
            <button
              onClick={() => setShowModal(true)}
              className="absolute bottom-2 right-[calc(50%-4rem)] md:right-[calc(50%-4.5rem)] 
                         bg-purple-600 hover:bg-purple-700 text-white text-xs px-3 py-1 rounded-full shadow-md transition-all duration-200"
            >
              Edit
            </button>
          )}
        </div>

        {/* Name & Position */}
        <div className="space-y-1 mb-5">
          <h2 className="text-2xl font-semibold text-gray-100 tracking-wide">
            Marek Orihel
          </h2>
          <p className="text-purple-400 text-sm font-medium">
            {position || "Full-Stack Developer & Power Platform | TypeScript, C#, Azure | Building Scalable Business Solutions"}
          </p>
        </div>

        {/* Contact Info */}
        <div className="space-y-2 text-sm text-gray-400">
          <p className="flex items-center justify-center gap-2">
            <Mail size={16} className="text-purple-400" /> {email}
          </p>
          <p className="flex items-center justify-center gap-2">
            <Calendar size={16} className="text-purple-400" /> {age}{" "}
            {t("years Old")}
          </p>
          <p className="flex items-center justify-center gap-2">
            <Linkedin size={16} className="text-purple-400" />
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 hover:underline font-medium transition-colors duration-200"
            >
              LinkedIn
            </a>
          </p>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <EditProfileModal
          onClose={() => setShowModal(false)}
          onSave={(newPosition) => {
            setPosition(newPosition);
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
}
