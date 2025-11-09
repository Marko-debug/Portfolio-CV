import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useTranslation } from "react-i18next";
import {
  getEducations,
  deleteEducation,
  Education,
} from "../services/educationService";
import Card from "../components/Card";
import HoverCard from "../components/HoverCard";
import AddButton from "../components/AddButton";
import RemoveButton from "../components/modals/RemoveButton";
import AddEducationModal from "../components/modals/AddEducationModal";

export default function EducationList() {
  const { isAuthenticated } = useContext(AuthContext);
  const { t } = useTranslation();
  const [educations, setEducations] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // ✅ Load data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getEducations();
        setEducations(data);
        setError(null);
      } catch (err: any) {
        if (err.message.includes("Unauthorized")) {
          setError("Please log in to view your educations.");
        } else {
          setError(err.message || "Failed to load educations");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ✅ Add new education
  const handleAdd = () => setShowAddModal(true);

  const handleSave = (newEdu: Education) =>
    setEducations((prev) => [...prev, newEdu]);

  // ✅ Delete education
  const handleRemove = async (id: number) => {
    try {
      await deleteEducation(id);
      setEducations((prev) => prev.filter((edu) => edu.id !== id));
    } catch (err: any) {
      alert(
        err.message.includes("Unauthorized")
          ? "Your session expired. Please log in again."
          : "Error deleting education"
      );
    }
  };

  if (loading) return <p className="text-gray-400">Loading...</p>;
  if (error) return <p className="text-red-400">{error}</p>;

  return (
    <Card title={t("Education")} className="bg-[#1a1a1d] text-gray-200 border border-gray-700 rounded-2xl shadow-lg">
      <div className="space-y-4">
        {educations.map((edu) => (
          <HoverCard
            key={edu.id}
            className="relative bg-[#222227] border border-gray-700 rounded-xl p-5 transition-all duration-200 hover:border-purple-500 hover:shadow-md"
          >
            {/* ✅ Show Remove button only when authenticated */}
            {isAuthenticated && (
              <div className="absolute top-3 right-4">
                <RemoveButton onConfirm={() => handleRemove(edu.id)} />
              </div>
            )}

            {/* Education details */}
            <div>
              <h3 className="font-semibold text-gray-100 text-lg">
                {edu.institution}
              </h3>
              <p className="text-purple-400 font-medium mt-1">{edu.degree}</p>
              <p className="text-purple-400 font-medium">{edu.field}</p>
              {edu.description && (
                <p className="text-gray-300 mt-2 leading-relaxed">
                  {edu.description}
                </p>
              )}
              <p className="text-sm text-gray-500 mt-3">
                {edu.startDate.split("T")[0]} →{" "}
                {edu.endDate?.split("T")[0] || "Present"}
              </p>
            </div>
          </HoverCard>
        ))}

        {/* ✅ Show message when no education entries */}
        {educations.length === 0 && (
          <p className="text-center text-gray-500 mt-3">
            No education records yet.
          </p>
        )}
      </div>

      {/* ✅ Add button (only visible when authenticated) */}
      {isAuthenticated && (
        <div className="flex justify-end mt-6">
          <AddButton
            label="Add Education"
            onClick={handleAdd}
            className="mt-4"
          />
        </div>
      )}

      {/* Modal */}
      {showAddModal && (
        <AddEducationModal
          onClose={() => setShowAddModal(false)}
          onSave={handleSave}
        />
      )}
    </Card>
  );
}
