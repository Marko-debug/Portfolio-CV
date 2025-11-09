import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useTranslation } from "react-i18next";
import {
  getCertifications,
  deleteCertification,
  Certification,
} from "../services/certificationService";
import Card from "../components/Card";
import HoverCard from "../components/HoverCard";
import AddButton from "../components/AddButton";
import RemoveButton from "../components/modals/RemoveButton";
import AddCertificationModal from "../components/modals/AddCertificationModal";

export default function CertificationList() {
  const { isAuthenticated } = useContext(AuthContext);
  const { t } = useTranslation();
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // ✅ Load data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCertifications();
        setCertifications(data);
        setError(null);
      } catch (err: any) {
        if (err.message.includes("Unauthorized")) {
          setError("Please log in to view your certifications.");
        } else {
          setError(err.message || "Failed to load certifications");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAdd = () => setShowAddModal(true);
  const handleSave = (newCert: Certification) =>
    setCertifications((prev) => [...prev, newCert]);

  const handleRemove = async (id: number) => {
    try {
      await deleteCertification(id);
      setCertifications((prev) => prev.filter((cert) => cert.id !== id));
    } catch (err) {
      console.error(err);
      alert("Error deleting certification");
    }
  };

  if (loading) return <p className="text-gray-400">Loading...</p>;
  if (error) return <p className="text-red-400">{error}</p>;

  return (
    <Card
      title={t("Certifications")}
      className="bg-[#1a1a1d] text-gray-200 border border-gray-700 rounded-2xl shadow-lg"
    >
      <div className="space-y-4">
        {certifications.map((cert) => (
          <HoverCard
            key={cert.id}
            className="relative bg-[#222227] border border-gray-700 rounded-xl p-5 transition-all duration-200 hover:border-purple-500 hover:shadow-md"
          >
            {/* ✅ Remove button */}
            {isAuthenticated && (
              <div className="absolute top-3 right-4">
                <RemoveButton onConfirm={() => handleRemove(cert.id)} />
              </div>
            )}

            {/* ✅ Certification Details */}
            <div>
              <h3 className="font-semibold text-gray-100 text-lg">
                {cert.name}
              </h3>
              <p className="text-purple-400 font-medium mt-1">{cert.issuer}</p>

              {/* ✅ Clickable link */}
              {cert.description && (
                <p className="text-sm text-gray-300 mt-2">
                  {" "}
                  <a
                    href={
                      cert.description.startsWith("http")
                        ? cert.description
                        : `https://${cert.description}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:text-purple-300 underline transition-colors"
                  >
                    View Detail
                  </a>
                </p>
              )}

              <p className="text-sm text-gray-500 mt-3">
                {cert.dateIssued.split("T")[0]} →{" "}
                {cert.expirationDate?.split("T")[0] || "Present"}
              </p>
            </div>
          </HoverCard>
        ))}

        {/* Empty message */}
        {certifications.length === 0 && (
          <p className="text-center text-gray-500 mt-3">
            No certifications yet.
          </p>
        )}
      </div>

      {/* Add button */}
      {isAuthenticated && (
        <div className="flex justify-end mt-6">
          <AddButton label="Add Certification" onClick={handleAdd} />
        </div>
      )}

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
