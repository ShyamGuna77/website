"use client";
import { type Metadata } from "next";
import logoImg from "@/app/Images/SPD.png";
import Image from "next/image";
import { SimpleLayout } from "../components/SimpleLayout";
import { useState, useEffect } from "react";
import { Card } from "../components/Card";
import dynamic from "next/dynamic";

const DynamicModal = dynamic(() => import("@/app/components/Modal"), {
  ssr: false,
});

const projects = [
  {
    name: "Planetaria",
    description:
      "Creating technology to empower civilians to explore space on their own terms.",
    link: { href: "http://planetaria.tech", label: "planetaria.tech" },
    logo: logoImg,
    tags: ["JavaScript", "Web Development", "Space Tech"],
    github: "https://github.com/planetaria",
    live: "http://planetaria.tech",
  },
  {
    name: "Animaginary",
    description:
      "High performance web animation library, hand-written in optimized WASM.",
    link: { href: "#", label: "github.com" },
    logo: logoImg,
    tags: ["WASM", "Animation", "JavaScript"],
    github: "https://github.com/animaginary",
    live: "#",
  },
  // ... more projects
];



export default function Projects() {
  const [isClient, setIsClient] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null); // Store selected project for the modal

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Render nothing until the component is mounted on the client-side
  }

  const handleOpenModal = (project) => {
    setSelectedProject(project); // Set the project to be displayed in the modal
  };

  const handleCloseModal = () => {
    setSelectedProject(null); // Close the modal by setting project to null
  };

  return (
    <SimpleLayout
      title="Things I’ve made trying to put my dent in the universe."
      intro="I’ve worked on tons of little projects over the years but these are the ones that I’m most proud of. Many of them are open-source, so if you see something that piques your interest, check out the code and contribute if you have ideas for how it can be improved."
    >
      <ul
        role="list"
        className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
      >
        {projects.map((project) => (
          <Card as="li" key={project.name}>
            <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
              <Image
                src={project.logo}
                alt=""
                className="h-8 w-8"
                unoptimized
              />
            </div>
            <h2 className="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
              <Card.Link href={project.link.href}>{project.name}</Card.Link>
            </h2>
            <Card.Description>{project.description}</Card.Description>
            <p className="mt-4 text-sm text-zinc-400 dark:text-zinc-200">
              {project.tags.join(", ")}
            </p>
            <div className="relative z-10 mt-6 flex text-sm font-medium text-zinc-400 transition group-hover:text-teal-500 dark:text-zinc-200">
              <span className="mr-2">GitHub:</span>
              <a
                href={project.github}
                target="_blank"
                className="text-teal-500 hover:underline"
              >
                {project.github}
              </a>
            </div>
            <div className="relative z-10 mt-2 flex text-sm font-medium text-zinc-400 transition group-hover:text-teal-500 dark:text-zinc-200">
              <span className="mr-2">Live:</span>
              <a
                href={project.live}
                target="_blank"
                className="text-teal-500 hover:underline"
              >
                {project.live}
              </a>
            </div>
            <div className="mt-4">
              <button
                onClick={() => handleOpenModal(project)} // Open modal with selected project
                className="text-teal-500 hover:underline"
              >
                View more
              </button>
            </div>
          </Card>
        ))}
      </ul>

      {/* Only render the modal if a project is selected */}
      {selectedProject && (
        <DynamicModal
          project={selectedProject}
          onClose={handleCloseModal} // Pass close function to the modal
        />
      )}
    </SimpleLayout>
  );
}
