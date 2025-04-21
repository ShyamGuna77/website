"use client";

import { ReactNode, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { AiOutlineExport } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import ReactDOM from "react-dom";

interface Project {
  imgSrc: string;
  title: string;
  tech: string[];
  fullDescription: ReactNode;
  github: string;
  live: string;
}

interface ProjectModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  project: Project | null;
}

export default function ProjectModal({
  isOpen,
  setIsOpen,
  project,
}: ProjectModalProps) {
  useEffect(() => {
    const body = document.querySelector("body");

    if (body) {
      body.style.overflowY = isOpen ? "hidden" : "scroll";
    }
  }, [isOpen]);

  if (!isOpen || !project) return null;

  const content = (
    <div
      className="fixed inset-0 z-50 px-4 py-12 bg-zinc-200 dark:bg-zinc-950/80 backdrop-blur overflow-y-scroll flex justify-center cursor-pointer"
      onClick={() => setIsOpen(false)}
    >
      <button
        className="absolute top-4 md:top-6 text-xl right-4 text-zinc-900 dark:text-zinc-300"
        onClick={() => setIsOpen(false)}
      >
        <MdClose />
      </button>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl h-fit rounded-lg overflow-hidden bg-white dark:bg-zinc-800 shadow-lg cursor-auto"
      >
        <Image
          className="w-full aspect-video object-cover object-top"
          src={project.imgSrc}
          alt={`An image of the ${project.title} project.`}
          width={1280} // Adjust width as needed
          height={720} // Adjust height as needed
        />
        <div className="p-8">
          <h4 className="text-3xl font-bold mb-2 text-zinc-900 dark:text-zinc-100">
            {project.title}
          </h4>
          <div className="flex flex-wrap gap-2 text-sm text-indigo-500 dark:text-indigo-300">
            {project.tech.join(" - ")}
          </div>

          <div className="space-y-4 my-6 leading-relaxed text-sm text-zinc-700 dark:text-zinc-300">
            {project.fullDescription}
          </div>

          <div>
            <p className="font-bold mb-2 text-xl text-zinc-900 dark:text-zinc-100">
              Project Links<span className="text-indigo-500 dark:text-indigo-300">.</span>
            </p>
            <div className="flex items-center gap-4 text-sm">
              <Link
                target="_blank"
                rel="nofollow"
                className="text-zinc-700 dark:text-zinc-300 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors flex items-center gap-1"
                href={project.github}
              >
                <FaGithub /> Source Code
              </Link>
              <Link
                target="_blank"
                rel="nofollow"
                className="text-zinc-700 dark:text-zinc-300 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors flex items-center gap-1"
                href={project.live}
              >
                <AiOutlineExport /> Live Project
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );

  // Use portal to render modal
  const rootElement = document.getElementById("root") || document.body;
  return ReactDOM.createPortal(content, rootElement);
}
