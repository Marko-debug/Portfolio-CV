import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useTranslation } from "react-i18next";
import {
  getExperiences,
  deleteExperience,
  Experience,
} from "../services/experienceService";
import Card from "../components/Card";
import HoverCard from "../components/HoverCard";
import AddButton from "../components/AddButton";
import RemoveButton from "../components/modals/RemoveButton";
import AddExperienceModal from "../components/modals/AddExperienceModal";

export default function ExperienceList() {
  const { isAuthenticated } = useContext(AuthContext);
  const { t } = useTranslation();
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // ✅ Load data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getExperiences();
        setExperiences(data);
        setError(null);
      } catch (err: any) {
        if (err.message.includes("Unauthorized")) {
          setError("Please log in to view your experiences.");
        } else {
          setError(err.message || "Failed to load experiences");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ✅ Add new experience
  const handleAdd = () => setShowAddModal(true);

  const handleSave = (newExp: Experience) =>
    setExperiences((prev) => [...prev, newExp]);

  // ✅ Delete experience
  const handleRemove = async (id: number) => {
    try {
      await deleteExperience(id);
      // Update the UI after backend confirms deletion
      setExperiences((prev) => prev.filter((exp) => exp.id !== id));
    } catch (err: any) {
      if (err.message.includes("Unauthorized")) {
        alert("Your session expired. Please log in again.");
      } else {
        alert("Error deleting experience");
      }
    }
  };

  if (loading) return <p className="text-gray-500">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <Card title={t("xperience")}>
      <div className="space-y-3">
        {experiences.map((exp) => (
          <HoverCard key={exp.id}>
            {/* ✅ Show Remove button only when authenticated */}
            {isAuthenticated && (
              <div className="absolute top-3 right-4">
                <RemoveButton onConfirm={() => handleRemove(exp.id)} />
              </div>
            )}

            {/* Experience details */}
            <div>
              <h3 className="font-medium text-gray-900">{exp.title}</h3>
              <p className="text-indigo-600 font-medium mt-1">{exp.company}</p>
              <p className="text-gray-700 mt-1">{exp.description}</p>
              <p className="text-sm text-gray-400 mt-2">
                {exp.startDate.split("T")[0]} →{" "}
                {exp.endDate?.split("T")[0] || "Present"}
              </p>
            </div>
          </HoverCard>
        ))}

        {/* ✅ Show message when no experiences */}
        {experiences.length === 0 && (
          <p className="text-center text-gray-500 mt-3">
            No work experiences yet.
          </p>
        )}
      </div>

      {/* ✅ Show Add button only when logged in */}
      {isAuthenticated && (
        <div className="flex justify-end mt-6">
          <AddButton label="Add Work Experience" onClick={handleAdd} />
        </div>
      )}

      {/* Modal */}
      {showAddModal && (
        <AddExperienceModal
          onClose={() => setShowAddModal(false)}
          onSave={handleSave}
        />
      )}
    </Card>
  );
}
