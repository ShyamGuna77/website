import Image from "next/image";
import { Sun } from "lucide-react";
import { Container } from "./components/Container";
import { SocialLink } from "./components/SocialIcon";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

export default function Home() {
  return (
    <>
      <Container className="mt-9">
        <div className="max-w-2xl">
          <h1
            className="text-4xl font-bold tracking-tight text-zinc-800
          sm:text-5xl dark:text-zinc-100"
          >
            Frontend, backend, anime weekend
          </h1>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            I'm Shyam, a fullstack developer and tech enthusiast from India. I
            craft digital experiences with websockets, animation with Framer
            Motion, bringing both backend logic and frontend magic to life
          </p>
        </div>
        <div className="mt-6 flex gap-6">
          <SocialLink
            href="#"
            aria-label="Follow on Instagram"
            icon={FaInstagram}
          />
          <SocialLink
            href="https://www.linkedin.com/in/shyamguna77/"
            aria-label="Follow on Linkedin"
            icon={FaLinkedin}
          />
          <SocialLink
            href="https://github.com/ShyamGuna77"
            aria-label="Follow on Github"
            icon={FaGithub}
          />
          <SocialLink
            href="https://x.com/Hikki_7d"
            aria-label="Follow on X"
            icon={FaXTwitter}
          />
        </div>
      </Container>
    </>
  );
}
