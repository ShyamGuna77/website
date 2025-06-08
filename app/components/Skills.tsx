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
import { useTheme } from "next-themes";

const skills = [
  { name: "React", icon: SiReact, lightColor: "#61DAFB", darkColor: "#61DAFB" },
  {
    name: "Next.js",
    icon: SiNextdotjs,
    lightColor: "#000000",
    darkColor: "white",
  },
  {
    name: "React Native",
    icon: SiReact,
    lightColor: "#61DAFB",
    darkColor: "#61DAFB",
  },
  {
    name: "Prisma",
    icon: SiPrisma,
    lightColor: "#2D3748",
    darkColor: "white",
  },
  {
    name: "Drizzle",
    icon: SiDrizzle,
    lightColor: "#7928CA",
    darkColor: "#7928CA",
  },
  {
    name: "MongoDB",
    icon: SiMongodb,
    lightColor: "#47A248",
    darkColor: "#47A248",
  },
  {
    name: "Docker",
    icon: SiDocker,
    lightColor: "#2496ED",
    darkColor: "#2496ED",
  },
  { name: "AWS", icon: FaAws, lightColor: "#FF9900", darkColor: "#FF9900" },
  { name: "Expo", icon: SiExpo, lightColor: "#000000", darkColor: "white" },
  { name: "Git", icon: SiGit, lightColor: "#F05032", darkColor: "#F05032" },
  {
    name: "Tailwind CSS",
    icon: SiTailwindcss,
    lightColor: "#06B6D4",
    darkColor: "#06B6D4",
  },
  {
    name: "Node.js",
    icon: SiNodedotjs,
    lightColor: "#339933",
    darkColor: "#339933",
  },
  { name: "Hono", icon: SiHono, lightColor: "#FF4A12", darkColor: "#FF4A12" },
  {
    name: "Express",
    icon: SiExpress,
    lightColor: "#000000",
    darkColor: "white",
  },
  {
    name: "PostgreSQL",
    icon: SiPostgresql,
    lightColor: "#336791",
    darkColor: "#336791",
  },
  { name: "Bun", icon: SiBun, lightColor: "#FBF0DF", darkColor: "white" },
  { name: "Nginx", icon: SiNginx, lightColor: "#009639", darkColor: "#009639" },
  { name: "Java", icon: FaJava, lightColor: "#007396", darkColor: "#007396" },
  {
    name: "TypeScript",
    icon: SiTypescript,
    lightColor: "#3178C6",
    darkColor: "#3178C6",
  },
  {
    name: "Zustand",
    icon: GiPolarBear,
    lightColor: "#F73F51",
    darkColor: "#F73F51",
  },
  {
    name: "Tanstack Query",
    icon: SiReactquery,
    lightColor: "#F73F51",
    darkColor: "#F73F51",
  },
];

const Skills = () => {
  const { theme } = useTheme();

  return (
    <div className="relative w-[280px] sm:w-[340px] md:w-[400px] mx-auto overflow-hidden bg-white dark:bg-zinc-900 py-4 rounded-lg">
      <div className="flex animate-scroll">
        {[...skills, ...skills].map((skill, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center min-w-[70px] sm:min-w-[80px] px-2 sm:px-4"
          >
            <skill.icon
              className="w-6 h-6 sm:w-8 sm:h-8 transition-transform hover:scale-110"
              style={{
                color: theme === "dark" ? skill.darkColor : skill.lightColor,
                filter:
                  theme === "dark"
                    ? skill.darkColor === "white"
                      ? "drop-shadow(0 0 2px rgba(255,255,255,0.5))"
                      : "none"
                    : skill.lightColor === "#FBF0DF" ||
                      skill.lightColor === "white"
                    ? "drop-shadow(0 0 2px rgba(0,0,0,0.5))"
                    : "none",
              }}
            />
            <span className="mt-2 text-[10px] sm:text-xs text-zinc-600 dark:text-zinc-400">
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
