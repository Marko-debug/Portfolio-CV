import React, { useState } from "react";
import { ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Project {
  id: number;
  title: string;
  description: string;
  link?: string;
}

export default function ProjectsList() {
  const { t } = useTranslation();
  const [projects] = useState<Project[]>([
    {
      id: 1,
      title: "Portfolio",
      description:
        "Personal CV and career management platform built with React, Tailwind, and .NET backend.",
      link: "https://github.com",
    },
    {
      id: 2,
      title: "Portfolio Website",
      description:
        "Modern personal portfolio with responsive layout and dynamic sections.",
      link: "https://marekorihel.dev",
    },
    {
      id: 3,
      title: "TaskFlow App",
      description:
        "Full-stack productivity tool using React, TypeScript, and PostgreSQL.",
    },
  ]);

  return (
    <section className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
      <h2 className="text-2xl font-semibold text-indigo-700 mb-6">{t("My Projects")}</h2>

      <div className="space-y-5">
        {projects.map((project) => (
          <div
            key={project.id}
            className="
              border border-indigo-200 rounded-2xl p-4
              transition-all duration-200
              hover:bg-indigo-50 hover:border-indigo-500 hover:shadow-md
            "
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium text-gray-800">
                {project.title}
              </h3>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-800 transition"
                >
                  <ExternalLink size={18} />
                </a>
              )}
            </div>
            <p className="text-gray-600 text-sm">{project.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
