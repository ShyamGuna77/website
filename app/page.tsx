"use client";

import { Container } from "./components/Container";
import { SocialLink } from "./components/SocialIcon";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import Reveal from "./utils/Reveal";
import MapWithDistance from "./components/MapWithDistance";

export default function Home() {
  return (
    <>
      <Container className="mt-9">
        <div className="max-w-2xl mb-12">
          <Reveal>
            <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
              Frontend, backend, anime weekend
            </h1>
          </Reveal>
          <Reveal>
            <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
              I&apos;m Shyam, a fullstack developer and tech enthusiast from
              India. I craft digital experiences with websockets, animation with
              Framer Motion, bringing both backend logic and frontend magic to
              life
            </p>
          </Reveal>
          <Reveal>
            <div className="mt-6 flex gap-6">
              <SocialLink
                href="https://www.instagram.com/shyamguna77/"
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
          </Reveal>
        </div>

        {/* Map section */}
        <div className="w-full flex justify-center mt-16">
          <div className="w-full max-w-xl ml-auto mr-0">
            <Reveal>
            <div className="mb-8">
              <h2 className="text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 mb-4 bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text  inline-block">
                Let&apos;s Connect
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400">
                Check out how far you are from my location in Toronto, Canada. The interactive map below
                shows our distance in real-time by accessing your location.
              </p>
            </div>
          </Reveal>
          
          <Reveal>
            <div className="w-full overflow-hidden mb-16 rounded-2xl shadow-lg">
              <MapWithDistance />
            </div>
          </Reveal>
           
          </div>
        </div>
      </Container>
    </>
  );
}
