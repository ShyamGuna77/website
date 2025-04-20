"use client";

import { ReactNode, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { AiOutlineExport } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import ReactDOM from "react-dom";

interface Props {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  title: string;
  imgSrc: string;
  code: string;
  projectLink: string;
  tech: string[];
  modelContent: ReactNode;
}

export  const ProjectModal = ({
  isOpen,
  setIsOpen,
  title,
  imgSrc,
  code,
  projectLink,
  tech,
  modelContent,
}: Props) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const body = document.querySelector("body");
    if (isOpen) {
      body!.style.overflowY = "hidden";
    } else {
      body!.style.overflowY = "scroll";
    }
  }, [isOpen]);

  if (!mounted || !isOpen) return null;

  const content = (
    <div
      className="fixed inset-0 z-50 px-4 py-12 bg-zinc-950/50 backdrop-blur overflow-y-scroll flex justify-center cursor-pointer"
      onClick={() => setIsOpen(false)}
    >
      <button
        className="absolute top-4 md:top-6 text-xl right-4"
        onClick={() => setIsOpen(false)}
      >
        <MdClose />
      </button>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl h-fit rounded-lg overflow-hidden bg-zinc-900 shadow-lg cursor-auto"
      >
        <img
          className="w-full"
          src={imgSrc}
          alt={`An image of the ${title} project.`}
        />
        <div className="p-8">
          <h4 className="text-3xl font-bold mb-2">{title}</h4>
          <div className="flex flex-wrap gap-2 text-sm text-indigo-300">
            {tech.join(" - ")}
          </div>

          <div className="space-y-4 my-6 leading-relaxed text-sm text-zinc-300">
            {modelContent}
          </div>

          <div>
            <p className="font-bold mb-2 text-xl">
              Project Links<span className="text-indigo-500">.</span>
            </p>
            <div className="flex items-center gap-4 text-sm">
              <Link
                target="_blank"
                rel="nofollow"
                className="text-zinc-300 hover:text-indigo-300 transition-colors flex items-center gap-1"
                href={code}
              >
                <FaGithub /> Source Code
              </Link>
              <Link
                target="_blank"
                rel="nofollow"
                className="text-zinc-300 hover:text-indigo-300 transition-colors flex items-center gap-1"
                href={projectLink}
              >
                <AiOutlineExport /> Live Project
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );

  const rootElement = document.getElementById("modal-root");
  if (!rootElement) return null;

  return ReactDOM.createPortal(content, rootElement);
};
