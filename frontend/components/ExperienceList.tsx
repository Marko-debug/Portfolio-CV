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

  const handleAdd = () => setShowAddModal(true);
  const handleSave = (newExp: Experience) =>
    setExperiences((prev) => [...prev, newExp]);

  const handleRemove = async (id: number) => {
    try {
      await deleteExperience(id);
      setExperiences((prev) => prev.filter((exp) => exp.id !== id));
    } catch (err: any) {
      alert(
        err.message.includes("Unauthorized")
          ? "Your session expired. Please log in again."
          : "Error deleting experience"
      );
    }
  };

  if (loading) return <p className="text-gray-400">Loading...</p>;
  if (error) return <p className="text-red-400">{error}</p>;

  return (
    <Card title={t("Experience")} className="bg-[#1a1a1d] text-gray-200 border border-gray-700 rounded-2xl shadow-lg">
      <div className="space-y-4">
        {experiences.map((exp) => (
          <HoverCard
            key={exp.id}
            className="relative bg-[#222227] border border-gray-700 rounded-xl p-5 transition-all duration-200 hover:border-purple-500 hover:shadow-md"
          >
            {isAuthenticated && (
              <div className="absolute top-3 right-4">
                <RemoveButton onConfirm={() => handleRemove(exp.id)} />
              </div>
            )}
            <div>
              <h3 className="font-semibold text-gray-100 text-lg">{exp.title}</h3>
              <p className="text-purple-400 font-medium mt-1">{exp.company}</p>
              <p className="text-gray-300 mt-2 leading-relaxed">{exp.description}</p>
              <p className="text-sm text-gray-500 mt-3">
                {exp.startDate.split("T")[0]} →{" "}
                {exp.endDate?.split("T")[0] || "Present"}
              </p>
            </div>
          </HoverCard>
        ))}

        {experiences.length === 0 && (
          <p className="text-center text-gray-500 mt-3">
            No work experiences yet.
          </p>
        )}
      </div>

      {isAuthenticated && (
        <div className="flex justify-end mt-6">
          <AddButton
            label="Add Work Experience"
            onClick={handleAdd}
            className="mt-6"
          />
        </div>
      )}

      {showAddModal && (
        <AddExperienceModal
          onClose={() => setShowAddModal(false)}
          onSave={handleSave}
        />
      )}
    </Card>
  );
}
