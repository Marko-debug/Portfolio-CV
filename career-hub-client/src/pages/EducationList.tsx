import { useEffect, useState } from "react";
import { getEducations, deleteEducation, Education } from "../services/educationService";
import Card from "../components/Card";
import HoverCard from "../components/HoverCard";
import AddButton from "../components/AddButton";
import RemoveButton from "../components/modals/RemoveButton";
import AddEducationModal from "../components/modals/AddEducationModal";


export default function EducationList() {
  const [educations, setEducations] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    getEducations()
      .then((data) => setEducations(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleAdd = () => setShowAddModal(true);

  const handleSave = (newExp: Education) => {
    setEducations((prev) => [...prev, newExp]);
  };

  const handleRemove = async (id: number) => {
    try {
      await deleteEducation(id);

      // Update the UI after backend confirms deletion
      setEducations((prev) => prev.filter((exp) => exp.id !== id));
    } catch (err) {
      console.error(err);
      alert("Error deleting Education");
    }
  };

  if (loading) return <p className="text-gray-500">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <Card title="Education">
      <div className="space-y-3">
        {educations.map((edu) => (
          <HoverCard key={edu.id}>
            {/* Remove Button positioned absolutely inside HoverCard */}
            <div className="absolute top-3 right-4">
              <RemoveButton onConfirm={() => handleRemove(edu.id)} />
            </div>

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

      {/* Add button at bottom-right */}
      <div className="flex justify-end mt-6">
        <AddButton label="Add Education" onClick={handleAdd} />
      </div>

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
