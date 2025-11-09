import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useTranslation } from "react-i18next";
import {
  getLanguages,
  deleteLanguage,
  Language,
} from "../services/languageService";
import Card from "../components/Card";
import HoverCard from "../components/HoverCard";
import AddButton from "../components/AddButton";
import RemoveButton from "../components/modals/RemoveButton";
import AddLanguageModal from "../components/modals/AddLanguageModal";

export default function LanguageList() {
  const { isAuthenticated } = useContext(AuthContext);
  const { t } = useTranslation();
  const [languages, setLanguages] = useState<Language[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // ✅ Load data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getLanguages();
        setLanguages(data);
        setError(null);
      } catch (err: any) {
        if (err.message.includes("Unauthorized")) {
          setError("Please log in to view your languages.");
        } else {
          setError(err.message || "Failed to load languages");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ✅ Add new language
  const handleAdd = () => setShowAddModal(true);
  const handleSave = (newLang: Language) =>
    setLanguages((prev) => [...prev, newLang]);

  // ✅ Delete language
  const handleRemove = async (id: number) => {
    try {
      await deleteLanguage(id);
      setLanguages((prev) => prev.filter((lang) => lang.id !== id));
    } catch (err) {
      console.error(err);
      alert("Error deleting language");
    }
  };

  if (loading) return <p className="text-gray-400">Loading...</p>;
  if (error) return <p className="text-red-400">{error}</p>;

  return (
    <Card
      title={t("Languages")}
      className="bg-[#1a1a1d] text-gray-200 border border-gray-700 rounded-2xl shadow-lg"
    >
      <div className="space-y-4">
        {languages.map((language) => (
          <HoverCard
            key={language.id}
            className="relative bg-[#222227] border border-gray-700 rounded-xl p-5 transition-all duration-200 hover:border-purple-500 hover:shadow-md"
          >
            {/* ✅ Remove Button (only visible when logged in) */}
            {isAuthenticated && (
              <div className="absolute top-3 right-4">
                <RemoveButton onConfirm={() => handleRemove(language.id)} />
              </div>
            )}

            {/* ✅ Language Info */}
            <div>
              <h3 className="font-semibold text-gray-100 text-lg">
                {language.name}
              </h3>
              <p className="text-purple-400 font-medium mt-1">
                {language.proficiency}
              </p>
              {language.description && (
                <p className="text-gray-300 mt-2 leading-relaxed">
                  {language.description}
                </p>
              )}
            </div>
          </HoverCard>
        ))}

        {/* ✅ No languages yet */}
        {languages.length === 0 && (
          <p className="text-center text-gray-500 mt-3">No languages yet.</p>
        )}
      </div>

      {/* ✅ Add button (only visible when logged in) */}
      {isAuthenticated && (
        <div className="flex justify-end mt-6">
          <AddButton label="Add Language" onClick={handleAdd} />
        </div>
      )}

      {/* ✅ Modal */}
      {showAddModal && (
        <AddLanguageModal
          onClose={() => setShowAddModal(false)}
          onSave={handleSave}
        />
      )}
    </Card>
  );
}
