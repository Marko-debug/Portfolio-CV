import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useTranslation } from "react-i18next";
import { getSkills, deleteSkill, Skill } from "../services/skillService";
import Card from "../components/Card";
import AddButton from "../components/AddButton";
import AddSkillModal from "../components/modals/AddSkillModal";

export default function SkillList() {
  const { isAuthenticated } = useContext(AuthContext);
  const { t } = useTranslation();  
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [isPanelVisible, setIsPanelVisible] = useState(false);

  // ✅ Load data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSkills();
        setSkills(data);
        setError(null);
      } catch (err: any) {
        if (err.message.includes("Unauthorized")) {
          setError("Please log in to view your skills.");
        } else {
          setError(err.message || "Failed to load skills");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 🌀 Auto close when scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (isPanelVisible) {
        setIsPanelVisible(false);
        setTimeout(() => setSelectedSkill(null), 300);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isPanelVisible]);

  const handleAdd = () => setShowAddModal(true);

  const handleSave = (newSkill: Skill) => {
    setSkills((prev) => [...prev, newSkill]);
  };

  const handleRemove = async (id: number) => {
    try {
      await deleteSkill(id);
      setSkills((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.error(err);
      alert("Error deleting skill");
    }
  };

  const handleSelect = (skill: Skill) => {
    setSelectedSkill(skill);
    setIsPanelVisible(true);
  };

  const handleClose = () => {
    setIsPanelVisible(false);
    setTimeout(() => setSelectedSkill(null), 300); // smooth hide
  };

  if (loading) return <p className="text-gray-500">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="relative">
      <Card title={t("Skills")}>
        <div className="flex flex-wrap gap-3 mt-2">
          {skills.length > 0 ? (
            skills.map((skill) => (
              <button
                key={skill.id}
                onClick={() => handleSelect(skill)}
                className="relative flex items-center gap-2 bg-indigo-50 border border-indigo-200 text-indigo-700 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-indigo-100 hover:-translate-y-0.5 transition transform"
              >
                {skill.name}
                {isAuthenticated && (
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove(skill.id);
                    }}
                    className="text-indigo-500 hover:text-red-500 transition cursor-pointer"
                  >
                    ✕
                  </span>
                )}
              </button>
            ))
          ) : (
            <p className="text-center text-gray-500 mt-3 w-full">No skills yet.</p>
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
          <AddSkillModal
            onClose={() => setShowAddModal(false)}
            onSave={handleSave}
          />
        )}
      </Card>

      {/* Floating info panel — slides from behind sidebar */}
      <div
        className={`fixed top-[140px] left-[45px] md:left-[52px] lg:left-[58px] xl:left-[62px]
          w-[250px] sm:w-[260px] h-[300px]
          bg-white/95 backdrop-blur-sm
          rounded-2xl border border-indigo-200 shadow-xl z-40
          transform transition-all duration-700 ease-in-out
          ${
            isPanelVisible
              ? "translate-x-[60px] opacity-100"
              : "-translate-x-[140px] opacity-0 pointer-events-none"
          }`}
      >
        {selectedSkill && (
          <div className="p-5 flex flex-col h-full justify-between">
            {/* Header */}
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold text-indigo-700">
                {selectedSkill.name}
              </h3>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600 text-lg"
              >
                ✕
              </button>
            </div>

            {/* Skill Details */}
            <div className="text-gray-700 text-sm flex-1 overflow-y-auto space-y-3 pr-1">
              <p>
                <span className="font-medium text-gray-900">Level:</span>{" "}
                {selectedSkill.level || "Not specified"}
              </p>
              <p>
                <span className="font-medium text-gray-900">Description:</span>
                <br />
                {selectedSkill.description || "No description available."}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
