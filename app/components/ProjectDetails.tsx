/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState, useEffect, ReactNode } from "react";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
// import LinkSaver from "@/app/Images/LinkSaver.png"
import Shinigami from "@/app/Images/shinigami.png"
import Kizuna from "@/app/Images/kizuna.png"
// import Cosketch from "@/app/Images/cosketch.png"
import Sonicronin from "@/app/Images/Sonicronin.png"
import Docsy from "@/app/Images/Docsy.png"    


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
          <strong>Shinigami Design</strong> is a next-gen, anime-inspired
          graphic tool editor built with
          <strong> Next.js, Hono, Tailwind CSS, Drizzle ORM</strong>. It
          delivers a fluid, responsive experience tailored for creators of all
          levels—from casual users to pro designers.
        </p>

        <p>
          Users can start designing with ready-made templates or upload their
          own. The editor supports AI-powered background removal, image
          generation, and intuitive drawing tools. Customize editor dimensions,
          apply filters, draw freely, or change colors—everything is accessible
          through an immersive, canvas-first interface.
        </p>

        <p>
          Seamless image uploading is powered by <strong>UploadThing</strong>,
          making asset management fast and simple. You can add multiple images,
          manipulate them, and apply filters with real-time preview. Templates
          can be inserted, removed, or replaced with one click.
        </p>

        <p>
          Authentication is handled through <strong>NextAuth</strong>, offering
          a secure and smooth sign-in flow. <strong>Stripe</strong> integration
          powers premium features, unlocking exclusive tools such as AI
          enhancements, HD exports, and aesthetic filters like anime, noir,
          retro, and sketch styles.
        </p>

        <p>
          Designed mobile-first, the platform supports light/dark themes, smooth
          transitions, and an accessible layout. It's deployed on{" "}
          <strong>Vercel</strong>, leveraging static site generation and edge
          functions via Hono for lightning-fast performance.
        </p>

        <p>
          <em>Unleash your inner creative. Design like a death god.</em>
        </p>
      </>
    ),
    imgSrc: Shinigami,
    tech: ["Next.js", "Fabric.js", "Tailwind CSS", "Hono", "Drizzle"],
    github: "https://github.com/ShyamGuna77/ShiniGami-Designs",
    live: "https://shini-gami-designs.vercel.app/",
  },
  {
    id: 2,
    title: "Docsy",
    description:
      "An interactive real-time docs collaborator using Tiptap and Liveblocks.",
    fullDescription: (
      <>
        <p className="leading-relaxed">
          <strong>Docsy</strong> is an interactive real-time document
          collaboration platform where users can join organizations and
          collaborate seamlessly on documents — just like Google Docs.
        </p>

        <p className="leading-relaxed">
          Built with{" "}
          <strong className="font-semibold text-blue-600">Next.js 15</strong>,{" "}
          <strong className="font-semibold text-blue-600">Tailwind CSS</strong>,{" "}
          <strong className="font-semibold text-blue-600">shadcn/ui</strong>,
          and <strong className="font-semibold text-blue-600">Tiptap</strong>{" "}
          for a rich text editing experience.{" "}
          <strong className="font-semibold text-blue-600">Clerk</strong> handles
          authentication,{" "}
          <strong className="font-semibold text-blue-600">Convex DB</strong>{" "}
          powers the backend, and{" "}
          <strong className="font-semibold text-blue-600">Liveblocks</strong>{" "}
          enables real-time multiplayer collaboration.
        </p>

        <p className="leading-relaxed">
          Users can start from ready-made templates, change font styles, modify
          margins, insert tables, upload images, align and format text, make
          text bold/italic/underlined, and print documents directly from the
          interface.
        </p>

        <p className="leading-relaxed">
          Docsy is ideal for teams, classrooms, and professional use-cases where
          live editing and seamless sync across users is essential. With a
          modern and minimalistic UI, it ensures smooth collaboration across
          devices in real time.
        </p>

        <p className="text-xl font-semibold text-green-500 mt-6">
          <em>Create. Edit. Collaborate — without limits.</em>
        </p>
      </>
    ),
    imgSrc: Docsy,
    tech: [
      "Next.js 15",
      "Tiptap",
      "Tailwind",
      "shadcn",
      "Convex DB",
      "Liveblocks",
      "Clerk",
    ],
    github: "https://github.com/ShyamGuna77/Docsy/",
    live: "https://nextjs-docs-zeta-mauve.vercel.app/",
  },

  {
    id: 3,
    title: "Kizuna",
    description:
      "A real-time dating app for swiping, matching, and chatting instantly.",
    fullDescription: (
      <>
        <p className="leading-relaxed">
          Kizuna is a real-time dating app that helps people connect, match, and
          chat seamlessly. Built with{" "}
          <strong className="font-semibold text-blue-600">Next.js</strong>,{" "}
          <strong className="font-semibold text-blue-600">Tailwind CSS</strong>,
          and powered by{" "}
          <strong className="font-semibold text-blue-600">Pusher</strong> for
          real-time notifications and communication, Kizuna provides a smooth
          and engaging experience for users looking to meet new people.
        </p>

        <p className="leading-relaxed">
          The app allows users to create profiles, swipe through potential
          matches, and send messages in real time. With Pusher integration,
          notifications about new matches and messages appear instantly, keeping
          users engaged and connected throughout their experience.
        </p>

        <p className="leading-relaxed">
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
    description: "A  real-time collaborative music Live streaming platform",

    fullDescription: (
      <>
        <p className="leading-relaxed">
          <strong>SonicRonin</strong> is a real-time collaborative music
          streaming platform where users can create or join rooms, add songs,
          and upvote tracks to decide the playlist. The most upvoted song plays
          next, making the music experience truly democratic.
        </p>

        <p className="font-semibold">
          <strong>Key Features:</strong>
        </p>
        <ul className="list-disc pl-5 space-y-2">
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

        <p className="font-semibold">
          <strong>Tech Stack:</strong>
        </p>
        <ul className="list-disc pl-5 space-y-2">
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

        <p className="leading-relaxed">
          SonicRonin takes collaborative music streaming to the next level with
          real-time interactions and seamless integration. Whether you're at
          home or on the go, experience music in a whole new way, together with
          friends and strangers alike!
        </p>
      </>
    ),
    imgSrc: Sonicronin,
    tech: ["Nextjs", "Websockets", "YoutubeApi", "Motion"],
    github: "https://github.com/ShyamGuna77/",
    live: "https://github.com/ShyamGuna77/",
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
