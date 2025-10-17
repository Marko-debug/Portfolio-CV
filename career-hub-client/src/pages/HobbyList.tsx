import { useEffect, useState } from "react";
import { getHobbies, deleteHobby, Hobby } from "../services/hobbyService";
import Card from "../components/Card";
import AddButton from "../components/AddButton";
import AddHobbyModal from "../components/modals/AddHobbyModal";

export default function HobbyList() {
  const [hobbies, setHobbys] = useState<Hobby[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    getHobbies()
      .then((data) => setHobbys(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleAdd = () => setShowAddModal(true);

  const handleSave = (newHobby: Hobby) => {
    setHobbys((prev) => [...prev, newHobby]);
  };

  const handleRemove = async (id: number) => {
    try {
      await deleteHobby(id);
      setHobbys((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.error(err);
      alert("Error deleting hobby");
    }
  };

  if (loading) return <p className="text-gray-500">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="relative">
      <Card title="Hobbies">
        <div className="flex flex-wrap gap-3 mt-2">
          {hobbies.length > 0 ? (
            hobbies.map((hobby) => (
              <button
                key={hobby.id}
                className="relative flex items-center gap-2 bg-indigo-50 border border-indigo-200 text-indigo-700 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-indigo-100 hover:-translate-y-0.5 transition transform"
              >
                {hobby.name}
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(hobby.id);
                  }}
                  className="text-indigo-500 hover:text-red-500 transition cursor-pointer"
                >
                  ✕
                </span>
              </button>
            ))
          ) : (
            <p className="text-center text-gray-500 mt-3 w-full">No hobbies yet.</p>
          )}
        </div>

        {/* Add Button */}
        <div className="flex justify-end mt-6">
          <AddButton label="Add Hobby" onClick={handleAdd} />
        </div>

        {/* Modal */}
        {showAddModal && (
          <AddHobbyModal
            onClose={() => setShowAddModal(false)}
            onSave={handleSave}
          />
        )}
      </Card>
    </div>
  );
}
