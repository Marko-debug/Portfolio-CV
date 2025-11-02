import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useTranslation } from "react-i18next";
import { getEducations, deleteEducation, Education } from "../services/educationService";
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

  const handleSave = (newExp: Education) => {
    setEducations((prev) => [...prev, newExp]);
  };

  // ✅ Delete experience
  const handleRemove = async (id: number) => {
    try {
      await deleteEducation(id);
      // Update the UI after backend confirms deletion
      setEducations((prev) => prev.filter((exp) => exp.id !== id));
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
    <Card title={t("Education")}>
      <div className="space-y-3">
        {educations.map((edu) => (
          <HoverCard key={edu.id}>
            {/* Remove Button positioned absolutely inside HoverCard */}
            {isAuthenticated && (
              <div className="absolute top-3 right-4">
                <RemoveButton onConfirm={() => handleRemove(edu.id)} />
              </div>
            )}

            {/* Content */}
            <div>
              <h3 className="font-medium text-gray-900">{edu.institution}</h3>
              <p className="text-indigo-600 font-medium mt-1">{edu.degree}</p>
              <p className="text-indigo-600 font-medium mt-1">{edu.field}</p>
              <p className="text-gray-700 mt-1">{edu.description}</p>
              <p className="text-sm text-gray-400 mt-2">
                {edu.startDate.split("T")[0]} → {edu.endDate?.split("T")[0] || "Present"}
              </p>
            </div>
          </HoverCard>

        ))}

        {educations.length === 0 && (
          <p className="text-center text-gray-500 mt-3">No educations yet.</p>
        )}
      </div>

      {/* ✅ Show Add button only when logged in */}
      {isAuthenticated && (
        <div className="flex justify-end mt-6">
          <AddButton label="Add Work Education" onClick={handleAdd} />
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
