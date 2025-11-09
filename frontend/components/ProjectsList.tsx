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
      title: "Portfolio-CV",
      description:
        "Full-stack personal CV and career management platform leveraging Next.js and Tailwind CSS on the frontend with a .NET 9 Core REST API backend.",
      link: "https://github.com/Marko-debug/Portfolio-CV",
    },
    {
      id: 2,
      title: "Diagram Drawing Tool",
      description:
        "Tool for drawing Composition Diagrams — a new process visualization method — built with JavaScript, SVG, HTML, and CSS.",
      link: "https://github.com/Marko-debug/Bachelors-project",
    },
  ]);

  return (
    <section className="bg-[#1a1a1d] rounded-2xl shadow-lg p-8 border border-gray-700 text-gray-300 transition-all duration-300">
      <h2 className="text-2xl font-semibold text-purple-400 mb-6 tracking-wide">
        {t("My Projects")}
      </h2>

      <div className="space-y-5">
        {projects.map((project) => (
          <div
            key={project.id}
            className="border border-gray-700 rounded-2xl p-5 bg-[#222227]
              transition-all duration-200 hover:border-purple-500 hover:shadow-md hover:shadow-purple-500/10"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold text-gray-100">
                {project.title}
              </h3>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300 transition-colors duration-200"
                >
                  <ExternalLink size={18} />
                </a>
              )}
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              {project.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
