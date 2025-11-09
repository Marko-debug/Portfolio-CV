import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useTranslation } from "react-i18next";
import EditProfileModal from "../components/modals/EditProfileModal";
import { getProfile, Profile } from "../services/profileService";
import { Mail, Phone, Calendar, Linkedin } from "lucide-react"; // added LinkedIn icon

export default function ProfilePage() {
  const { isAuthenticated } = useContext(AuthContext);
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [photoUrl] = useState("profilePhoto.jpg");
  const [position, setPosition] = useState<string>("");

  // Later these can come from DB (getProfile)
  const [email] = useState("orihel23@gmail.com");
  const [phone] = useState("+421 948 975 569");
  const [birthDate] = useState("2000-12-14");
  const [linkedin] = useState("https://www.linkedin.com/in/marek-orihel-37870a244");

  // useEffect(() => {
  //   getProfile()
  //     .then((data: Profile) => {
  //       if (data.position) setPosition(data.position);
  //     })
  //     .catch((err) => console.error("Error loading profile:", err));
  // }, []);

  // Calculate age
  const calculateAge = (dob: string): number => {
    const diff = Date.now() - new Date(dob).getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
  };

  const age = calculateAge(birthDate);

  return (
    <div className="flex flex-col items-center pt-8 text-center">
      {/* Profile photo */}
      <div className="relative mb-6">
        {photoUrl ? (
          <img
            src={photoUrl}
            alt="Profile"
            className="w-56 h-56 md:w-64 md:h-64 rounded-full border-4 border-indigo-500 shadow-lg object-cover"
          />
        ) : (
          <div className="w-44 h-44 md:w-52 md:h-52 rounded-full border-4 border-indigo-200 bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
            No photo yet
          </div>
        )}

        {/* Edit button */}
        {isAuthenticated && (
          <button
            onClick={() => setShowModal(true)}
            className="absolute bottom-2 right-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs px-3 py-1 rounded-full shadow"
          >
            Edit
          </button>
        )}
      </div>

      {/* Name & Position */}
      <div className="space-y-1 mb-3">
        <h2 className="text-xl font-semibold text-gray-800">Marek Orihel</h2>
        <p className="text-gray-500 text-sm">
          {position || "Frontend / .NET Developer"}
        </p>
      </div>

      {/* Contact Info */}
      <div className="space-y-1 text-gray-600 text-sm">
        <p className="flex items-center justify-center gap-2">
          <Mail size={16} className="text-indigo-600" /> {email}
        </p>
        {/* <p className="flex items-center justify-center gap-2">
          <Phone size={16} className="text-indigo-600" /> {phone}
        </p> */}
        <p className="flex items-center justify-center gap-2">
          <Calendar size={16} className="text-indigo-600" /> {age} {t("years Old")}
        </p>
        <p className="flex items-center justify-center gap-2">
          <Linkedin size={16} className="text-indigo-600" />
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:underline font-medium"
          >
            LinkedIn
          </a>
        </p>
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
