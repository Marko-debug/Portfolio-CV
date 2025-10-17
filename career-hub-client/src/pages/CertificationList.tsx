import { useEffect, useState } from "react";
import { getCertifications, deleteCertification, Certification } from "../services/certificationService";
import Card from "../components/Card";
import HoverCard from "../components/HoverCard";
import AddButton from "../components/AddButton";
import RemoveButton from "../components/modals/RemoveButton";
import AddCertificationModal from "../components/modals/AddCertificationModal";


export default function CertificationList() {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    getCertifications()
      .then((data) => setCertifications(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleAdd = () => setShowAddModal(true);

  const handleSave = (newExp: Certification) => {
    setCertifications((prev) => [...prev, newExp]);
  };

  const handleRemove = async (id: number) => {
    try {
      await deleteCertification(id);

      // Update the UI after backend confirms deletion
      setCertifications((prev) => prev.filter((exp) => exp.id !== id));
    } catch (err) {
      console.error(err);
      alert("Error deleting certication");
    }
  };

  if (loading) return <p className="text-gray-500">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <Card title="Certifications">
      <div className="space-y-3">
        {certifications.map((cert) => (
          <HoverCard key={cert.id}>
            {/* Remove Button positioned absolutely inside HoverCard */}
            <div className="absolute top-3 right-4">
              <RemoveButton onConfirm={() => handleRemove(cert.id)} />
            </div>

            {/* Content */}
            <div>
              <h3 className="font-medium text-gray-900">{cert.name}</h3>
              <p className="text-indigo-600 font-medium mt-1">{cert.issuer}</p>
              <p className="text-gray-700 mt-1">{cert.description}</p>
              <p className="text-sm text-gray-400 mt-2">
                {cert.dateIssued.split("T")[0]} → {cert.expirationDate?.split("T")[0] || "Present"}
              </p>
            </div>
          </HoverCard>
        ))}

        {certifications.length === 0 && (
          <p className="text-center text-gray-500 mt-3">No certifications yet.</p>
        )}
      </div>

      {/* Add button at bottom-right */}
      <div className="flex justify-end mt-6">
        <AddButton label="Add Certification" onClick={handleAdd} />
      </div>

      {/* Modal */}
      {showAddModal && (
        <AddCertificationModal
          onClose={() => setShowAddModal(false)}
          onSave={handleSave}
        />
      )}
    </Card>
  );
}
