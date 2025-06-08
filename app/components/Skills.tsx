"use client";

import {
  SiReact,
  SiNextdotjs,
  SiPrisma,
  SiDrizzle,
  SiMongodb,
  SiDocker,
  SiExpo,
  SiGit,
  SiTailwindcss,
  SiNodedotjs,
  SiHono,
  SiExpress,
  SiPostgresql,
  SiBun,
  SiNginx,
  SiTypescript,
  SiReactquery,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import { FaJava } from "react-icons/fa";
import { GiPolarBear } from "react-icons/gi";


const skills = [
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, color: "white" },
  { name: "React Native", icon: SiReact, color: "#61DAFB" },
  { name: "Prisma", icon: SiPrisma, color: "white" },
  { name: "Drizzle", icon: SiDrizzle, color: "#7928CA" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { name: "Docker", icon: SiDocker, color: "#2496ED" },
  { name: "AWS", icon: FaAws, color: "#FF9900" },
  { name: "Expo", icon: SiExpo, color: "white" },
  { name: "Git", icon: SiGit, color: "#F05032" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { name: "Hono", icon: SiHono, color: "#FF4A12" },
  { name: "Express", icon: SiExpress, color: "white" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#336791" },
  { name: "Bun", icon: SiBun, color: "#FBF0DF" },
  { name: "Nginx", icon: SiNginx, color: "#009639" },
  { name: "Java", icon: FaJava, color: "#007396" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "Zustand", icon: GiPolarBear, color: "#F73F51" },
  { name: "Tanstack Query", icon: SiReactquery, color: "#F73F51" },
];

const Skills = () => {
  return (
    <div className="relative w-[400px] overflow-hidden bg-white dark:bg-zinc-900 py-4">
      <div className="flex animate-scroll">
        {[...skills, ...skills].map((skill, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center min-w-[80px] px-4"
          >
            <skill.icon
              className="w-8 h-8 transition-transform hover:scale-110"
              style={{ color: skill.color }}
            />
            <span className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">
              {skill.name}
            </span>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
          width: max-content;
        }
      `}</style>
    </div>
  );
};

export default Skills;
