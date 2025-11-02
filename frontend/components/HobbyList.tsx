import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useTranslation } from "react-i18next";
import { getHobbies, deleteHobby, Hobby } from "../services/hobbyService";
import Card from "../components/Card";
import AddButton from "../components/AddButton";
import AddHobbyModal from "../components/modals/AddHobbyModal";

export default function HobbyList() {
  const { isAuthenticated } = useContext(AuthContext);
  const { t } = useTranslation();
  const [hobbies, setHobbies] = useState<Hobby[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // ✅ Load data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getHobbies();
        setHobbies(data);
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

  const handleSave = (newHobby: Hobby) => {
    setHobbies((prev) => [...prev, newHobby]);
  };

  const handleRemove = async (id: number) => {
    try {
      await deleteHobby(id);
      setHobbies((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.error(err);
      alert("Error deleting hobby");
    }
  };

  if (loading) return <p className="text-gray-500">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="relative">
      <Card title={t("Hobbies")}>
    
        <div className="flex flex-wrap gap-3 mt-2">
          {hobbies.length > 0 ? (
            hobbies.map((hobby) => (
              <button
                key={hobby.id}
                className="relative flex items-center gap-2 bg-indigo-50 border border-indigo-200 text-indigo-700 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-indigo-100 hover:-translate-y-0.5 transition transform"
              >
                {hobby.name}
                {isAuthenticated && (
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove(hobby.id);
                    }}
                    className="text-indigo-500 hover:text-red-500 transition cursor-pointer"
                  >
                    ✕
                  </span>
                )}
              </button>
            ))
          ) : (
            <p className="text-center text-gray-500 mt-3 w-full">No hobbies yet.</p>
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
          <AddHobbyModal
            onClose={() => setShowAddModal(false)}
            onSave={handleSave}
          />
        )}
      </Card>
    </div>
  );
}
