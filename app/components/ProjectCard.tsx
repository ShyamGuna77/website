"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { AiOutlineExport } from "react-icons/ai";
import Reveal from "../utils/Reveal";

interface Project {
  imgSrc: string;
  title: string;
  github: string;
  live: string;
  tech: string[];
  description: string;
}

interface ProjectCardProps {
  project: Project;
  setSelectedProject: (project: Project) => void;
}

export default function ProjectCard({ project, setSelectedProject }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: { opacity: 0, y: 100 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      animate={controls}
      transition={{ duration: 0.75 }}
      className="flex flex-col h-full"
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setSelectedProject(project)}
        className="w-full aspect-video bg-zinc-800 cursor-pointer relative rounded-lg overflow-hidden"
      >
        <Image
          src={project.imgSrc}
          alt={`An image of the ${project.title} project.`}
          width={500} // Replace with the actual width of your image
          height={300} // Replace with the actual height of your image
          style={{
            width: hovered ? "90%" : "85%",
            rotate: hovered ? "2deg" : "0deg",
          }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/4 transition-all rounded object-cover"
        />
      </div>
      <div className="mt-6 flex-grow">
        <Reveal width="w-full">
          <div className="flex items-center gap-2 w-full">
            <h4 className="font-bold text-lg shrink-0 max-w-[calc(100%_-_150px)]">
              {project.title}
            </h4>
            <div className="w-full h-[1px] bg-zinc-600" />

            <Link href={project.github} target="_blank" rel="nofollow">
              <FaGithub className="text-xl text-zinc-800 dark:text-zinc-300 hover:text-indigo-300 transition-colors" />
            </Link>

            <Link href={project.live} target="_blank" rel="nofollow">
              <AiOutlineExport className="text-xl text-zinc-800 dark:text-zinc-300 hover:text-indigo-300 transition-colors" />
            </Link>
          </div>
        </Reveal>
        <Reveal>
          <div className="flex flex-wrap gap-4 text-sm text-indigo-600 dark:text-indigo-300 my-2">
            {project.tech.join(" - ")}
          </div>
        </Reveal>
        <Reveal>
          <p className=" text-zinc-600 dark:text-zinc-300 leading-relaxed">
            {project.description}{" "}
            <span
              className="inline-block text-sm text-indigo-500 dark:text-indigo-300 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedProject(project);
              }}
            >
              Learn more {">"}
            </span>
          </p>
        </Reveal>
      </div>
    </motion.div>
  );
}
