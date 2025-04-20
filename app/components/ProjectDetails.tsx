/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState, useEffect, ReactNode } from "react";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";

import SPD from "@/app/Images/SPD.png";

type Project = {
  id: number;
  title: string;
  description: string;
  fullDescription: ReactNode;
  imgSrc: any;
  tech: string[];
  github: string;
  live: string;
};

// ✅ Projects array using imported image modules
const projects: Project[] = [
  {
    id: 1,
    title: "Portfolio Website",
    description:
      "A modern portfolio website built with Next.js and Tailwind CSS.",
    fullDescription: (
      <>
        <p>
          This portfolio website was built using Next.js and Tailwind CSS. It
          features a clean, minimalist design with smooth animations and
          responsive layout.
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Responsive design that works on all devices</li>
          <li>Dark/light mode toggle</li>
          <li>Smooth page transitions with Framer Motion</li>
          <li>SEO optimized with Next.js</li>
          <li>Contact form with validation</li>
        </ul>
        <p>
          The site is deployed on Vercel and uses static site generation for
          optimal performance.
        </p>
      </>
    ),
    imgSrc: SPD,
    tech: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com/username/portfolio",
    live: "https://portfolio.dev",
  },
  {
    id: 2,
    title: "E-commerce Platform",
    description:
      "A full-featured e-commerce platform with payment integration.",
    fullDescription: (
      <>
        <p>
          This e-commerce platform provides a complete solution for online
          stores with product management, cart functionality, user
          authentication, and Stripe payment integration.
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>User authentication and profile management</li>
          <li>Product catalog with categories and search</li>
          <li>Shopping cart with persistent storage</li>
          <li>Checkout process with Stripe integration</li>
          <li>Order history and tracking</li>
          <li>Admin dashboard for product management</li>
        </ul>
        <p>
          Built with a MongoDB database and deployed on AWS for scalability.
        </p>
      </>
    ),
    imgSrc: SPD,
    tech: ["React", "Node.js", "MongoDB", "Express", "Stripe API"],
    github: "https://github.com/username/ecommerce",
    live: "https://ecommerce-demo.com",
  },
  {
    id: 3,
    title: "Task Management App",
    description:
      "A Kanban-style task management application with drag-and-drop functionality.",
    fullDescription: (
      <>
        <p>
          This task management application helps teams organize their work with
          a visual Kanban board interface.
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Drag-and-drop task management</li>
          <li>Custom columns and workflow states</li>
          <li>Task assignment and due dates</li>
          <li>File attachments and comments</li>
          <li>Team collaboration tools</li>
        </ul>
        <p>Built using Firebase for real-time updates and authentication.</p>
      </>
    ),
    imgSrc: SPD,
    tech: ["React", "Firebase", "Tailwind CSS", "React DnD"],
    github: "https://github.com/username/taskmanager",
    live: "https://taskapp.dev",
  },
  {
    id: 4,
    title: "Weather Dashboard",
    description:
      "A weather forecasting application with interactive maps and real-time updates.",
    fullDescription: (
      <>
        <p>
          This weather dashboard provides detailed weather info and forecasts
          for locations worldwide.
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Current weather and 7-day forecast</li>
          <li>Interactive map with weather layers</li>
          <li>Location search and alerts</li>
        </ul>
        <p>Uses OpenWeatherMap API and Mapbox.</p>
      </>
    ),
    imgSrc: SPD,
    tech: ["JavaScript", "React", "OpenWeatherMap API", "Mapbox"],
    github: "https://github.com/username/weather",
    live: "https://weather-app.io",
  },
];

export default function ProjectDetails() {
  const [isClient, setIsClient] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="mb-12 ">
        <h2 className="text-5xl font-bold mb-4 text-zinc-800 dark:text-zinc-300">
          Projects That Kept Me Up All Night
        </h2>
        <p className="text-zinc-600 dark:text-zinc-500 max-w-2xl mx-auto mt-9">
          I've Worked on Several Projects in the past Years.
          Here’s a curated list of the projects I’ve poured my time and energy
          into. Some were built out of curiosity, others out of necessity—but
          all taught me something new.
        </p>
      </div>

      <div className="grid gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            setSelectedProject={setSelectedProject}
          />
        ))}
      </div>

      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        setIsOpen={(open: boolean) => {
          if (!open) setSelectedProject(null);
        }}
      />
    </section>
  );
}
