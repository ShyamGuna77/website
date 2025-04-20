/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState, useEffect, ReactNode } from "react";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import LinkSaver from "@/app/Images/LinkSaver.png"
import Shinigami from "@/app/Images/shinigami.png"
import Kizuna from "@/app/Images/kizuna.png"
import Cosketch from "@/app/Images/cosketch.png"

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


const projects: Project[] = [
  {
    id: 1,
    title: "Shinigami Designs",
    description:
      "Shinigami Design is an  graphic editor with templates, AI tools, and export features.",

    fullDescription: (
      <>
        <p>
          <strong>Shinigami Design</strong> is a modern, anime-inspired SaaS
          graphic editor built using Next.js, Tailwind CSS, Shadcn UI, and
          powered by Bun for blazing-fast builds. It provides a seamless and
          responsive user interface designed for both casual creators and
          professional designers.
        </p>

        <p>
          The editor allows users to add and manipulate shapes, insert and style
          text, and upload images directly onto a customizable canvas. It
          includes a flexible template system where users can start with
          pre-built layouts, making the design process faster and more
          intuitive.
        </p>

        <p>
          Once editing is complete, users can export their designs in various
          formats such as PNG or JPG. The platform also includes a save feature,
          enabling users to store their projects and return to them anytime for
          further editing or revisions.
        </p>

        <p>
          Shinigami Design features AI-powered tools available for Pro users,
          including smart image enhancements, auto-layout suggestions, and style
          filters that apply anime, retro, noir, and sketch aesthetics with a
          single click.
        </p>

        <p>
          Designed with a mobile-first approach, the app supports light and dark
          themes, smooth animations, and an accessible layout. It's deployed on
          Vercel, using static site generation for optimized performance and
          faster load times.
        </p>

        <p>
          <em>Unleash your inner creative. Design like a death god.</em>
        </p>
      </>
    ),
    imgSrc: Shinigami,
    tech: ["Next.js", "React", "Tailwind CSS", "Bun", "Drizzle"],
    github: "https://github.com/ShyamGuna77/SevenD",
    live: "https://github.com/ShyamGuna77/SevenD",
  },
  {
    id: 2,
    title: "CoSketch",
    description: "A full-featured DrawBoard platform using Websockets.",
    fullDescription: (
      <>
        <p className="leading-relaxed text-gray-800">
          This online whiteboard app is a real-time collaborative drawing tool
          inspired by Excalidraw. It allows multiple users to sketch, draw, and
          brainstorm together on a shared canvas using WebSockets for seamless
          synchronization and instant updates.
        </p>

        <p className="leading-relaxed text-gray-800">
          Built with{" "}
          <strong className="font-semibold text-blue-600">Next.js</strong>,{" "}
          <strong className="font-semibold text-blue-600">Tailwind CSS</strong>,
          and the{" "}
          <strong className="font-semibold text-blue-600">HTML5 Canvas</strong>{" "}
          element, this platform offers all the essential features of
          Excalidraw, such as freehand drawing, shapes, text, arrow connectors,
          undo/redo, and zooming.
        </p>

        <p className="leading-relaxed text-gray-800">
          The app’s real-time collaboration capabilities enable multiple users
          to join a session simultaneously and work on the same canvas without
          lag, making it ideal for remote teams, classNamerooms, and creative
          brainstorming. It’s fast, responsive, and easy to use, with a
          minimalistic interface that focuses on the drawing experience.
        </p>

        <p className="leading-relaxed text-gray-800">
          Whether you're sketching a concept, planning a project, or
          collaborating on designs, this tool allows you to bring ideas to life
          with others, no matter where you are. Everything happens in real time,
          ensuring that your ideas and changes are instantly visible to all
          participants.
        </p>

        <p className="text-xl font-semibold text-green-500 mt-6">
          <em>Think. Draw. Collaborate — in real time.</em>
        </p>
      </>
    ),
    imgSrc: Cosketch,
    tech: ["Nextjs", "canvas", "prisma", "Tailwind", "webSocket"],
    github: "https://github.com/ShyamGuna77",
    live: "https://github.com/ShyamGuna77",
  },
  {
    id: 3,
    title: "Kizuna",
    description:
      "A Kanban-style task management application with drag-and-drop functionality.",
    fullDescription: (
      <>
        <p className="leading-relaxed text-gray-800">
          Kizuna is a real-time dating app that helps people connect, match, and
          chat seamlessly. Built with{" "}
          <strong className="font-semibold text-blue-600">Next.js</strong>,{" "}
          <strong className="font-semibold text-blue-600">Tailwind CSS</strong>,
          and powered by{" "}
          <strong className="font-semibold text-blue-600">Pusher</strong> for
          real-time notifications and communication, Kizuna provides a smooth
          and engaging experience for users looking to meet new people.
        </p>

        <p className="leading-relaxed text-gray-800">
          The app allows users to create profiles, swipe through potential
          matches, and send messages in real time. With Pusher integration,
          notifications about new matches and messages appear instantly, keeping
          users engaged and connected throughout their experience.
        </p>

        <p className="leading-relaxed text-gray-800">
          Kizuna’s clean and modern interface, built with Tailwind CSS, is
          designed to provide a seamless mobile-first experience. Whether you're
          looking for casual chats or meaningful connections, Kizuna makes it
          easy to find people nearby and connect in real time.
        </p>

        <p className="text-xl font-semibold text-green-500 mt-6">
          <em>Match. Chat. Connect — all in real time.</em>
        </p>
      </>
    ),
    imgSrc: Kizuna,
    tech: ["Nextjs", "Prisma", "Tailwind CSS", "Pusher"],
    github: "https://github.com/ShyamGuna77/Kizuna",
    live: "https://github.com/ShyamGuna77/Kizuna",
  },
  {
    id: 4,
    title: "Sonic Ronin",
    description:
      "A a real-time collaborative music Live streaming platform" ,
         
    fullDescription: (
      <>
        <p className="leading-relaxed text-gray-800">
          <strong>SonicRonin</strong> is a real-time collaborative music
          streaming platform where users can create or join rooms, add songs,
          and upvote tracks to decide the playlist. The most upvoted song plays
          next, making the music experience truly democratic.
        </p>

        <p className="font-semibold text-gray-800">
          <strong>Key Features:</strong>
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-800">
          <li>
            🎵 <strong>Create and Join Rooms</strong>: Users can create new
            rooms or join existing ones for a seamless group experience.
          </li>
          <li>
            📌 <strong>Add Songs</strong>: Everyone in the room can contribute
            by adding their favorite tracks to the queue.
          </li>
          <li>
            👍 <strong>Upvote Songs</strong>: The most upvoted song takes the
            stage next, keeping the playlist dynamic and engaging.
          </li>
          <li>
            🤖 <strong>Real-Time Chatbox</strong>: Interact with others in the
            room via the live chat feature.
          </li>
          <li>
            🔄 <strong>Real-Time Updates</strong>: WebSockets ensure instant
            updates on song queues and voting.
          </li>
        </ul>

        <p className="font-semibold text-gray-800">
          <strong>Tech Stack:</strong>
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-800">
          <li>
            <strong>Frontend</strong>: Next.js, React, TailwindCSS
          </li>
          <li>
            <strong>Backend</strong>: (Redis, WebSocket)
          </li>
          <li>
            <strong>Database</strong>: PostgreSQL
          </li>
          <li>
            <strong>ORM</strong>: Prisma
          </li>
          <li>
            <strong>Authentication</strong>: NextAuth / OAuth
          </li>
          <li>
            <strong>Streaming API</strong>: YouTube API
          </li>
        </ul>

        <p className="leading-relaxed text-gray-800">
          SonicRonin takes collaborative music streaming to the next level with
          real-time interactions and seamless integration. Whether you're at
          home or on the go, experience music in a whole new way, together with
          friends and strangers alike!
        </p>
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
