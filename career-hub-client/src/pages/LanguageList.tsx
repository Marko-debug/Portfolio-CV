import { useEffect, useState } from "react";
import { getLanguages, deleteLanguage, Language } from "../services/languageService";
import Card from "../components/Card";
import HoverCard from "../components/HoverCard";
import AddButton from "../components/AddButton";
import RemoveButton from "../components/modals/RemoveButton";
import AddLanguageModal from "../components/modals/AddLanguageModal";


export default function LanguageList() {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    getLanguages()
      .then((data) => setLanguages(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleAdd = () => setShowAddModal(true);

  const handleSave = (newExp: Language) => {
    setLanguages((prev) => [...prev, newExp]);
  };

  const handleRemove = async (id: number) => {
    try {
      await deleteLanguage(id);

      // Update the UI after backend confirms deletion
      setLanguages((prev) => prev.filter((exp) => exp.id !== id));
    } catch (err) {
      console.error(err);
      alert("Error deleting Languagetion");
    }
  };

  if (loading) return <p className="text-gray-500">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <Card title="Languages">
      <div className="space-y-3">
        {languages.map((language) => (
          <HoverCard key={language.id}>
            {/* Remove Button positioned absolutely inside HoverCard */}
            <div className="absolute top-3 right-4">
              <RemoveButton onConfirm={() => handleRemove(language.id)} />
            </div>

            {/* Content */}
            <div>
              <h3 className="font-medium text-gray-900">{language.name}</h3>
              <p className="text-indigo-600 font-medium mt-1">{language.proficiency}</p>
              <p className="text-gray-700 mt-1">{language.description}</p>
            </div>
          </HoverCard>

        ))}

        {languages.length === 0 && (
          <p className="text-center text-gray-500 mt-3">No languages yet.</p>
        )}
      </div>

      {/* Add button at bottom-right */}
      <div className="flex justify-end mt-6">
        <AddButton label="Add Language" onClick={handleAdd} />
      </div>

      {/* Modal */}
      {showAddModal && (
        <AddLanguageModal
          onClose={() => setShowAddModal(false)}
          onSave={handleSave}
        />
      )}
    </Card>
  );
}
