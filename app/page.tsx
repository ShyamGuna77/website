// app/page.tsx
"use client";

import { Container } from "./components/Container";
import { SocialLink } from "./components/SocialIcon";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import Reveal from "./utils/Reveal";
import MapWithDistance from "./components/MapWithDistance";
import GithubGraph from "./components/GithubStats";
import { TextNotation } from "react-text-decorator";
import MusicPlayer from "./components/MusicPlayer";

export default function Home() {
  return (
    <Container className="mt-4 sm:mt-9">
      <div className="max-w-2xl mb-8 sm:mb-12">
        <Reveal>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            <TextNotation
              type="highlight"
              color="#0096FF"
              animationDelay={2000}
              animationDuration={4000}
              show={true}
              strokeWidth={3}
              iterations={6}
            >
              <span>Frontend</span>
            </TextNotation>
            , backend, anime weekend
          </h1>
        </Reveal>

        <Reveal>
          <p className="mt-4 sm:mt-6 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            I&apos;m Shyam , a fullstack developer and tech enthusiast from
            India. I craft digital experiences with websockets, animation with
            Framer Motion, bringing both backend logic and frontend magic to
            life
          </p>
        </Reveal>

        <Reveal>
          <div className="mt-4 sm:mt-6 flex gap-4 sm:gap-6">
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

      <div className="w-full mt-12 sm:mt-24">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 justify-center items-start">
          {/* GitHub Graph Container */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-3 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-bold text-center tracking-tight text-zinc-800 dark:text-zinc-100 mb-4">
                <TextNotation
                  type="underline"
                  color="#0096FF"
                  animationDelay={900}
                  animationDuration={3000}
                  show={true}
                  strokeWidth={3}
                  iterations={6}
                >
                  Proof of Work
                </TextNotation>
              </h2>
              <Reveal>
                <div className="px-1 sm:px-4">
                  <div className="scale-[0.85] sm:scale-100 origin-top-left">
                    <GithubGraph />
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Music Player Section */}
            <div className="w-full mt-6 sm:mt-8">
              <Reveal>
                <div className="scale-[0.85] sm:scale-100 origin-top-left">
                  <MusicPlayer />
                </div>
              </Reveal>
            </div>
          </div>

          {/* Map + Text Container */}
          <div className="w-full lg:w-1/2 mt-4 lg:mt-0">
            <div className="max-w-xl mx-auto lg:ml-auto lg:mr-0">
              <Reveal>
                <div className="mb-4 sm:mb-8">
                  <h2 className="text-xl sm:text-2xl font-bold text-center tracking-tight text-zinc-800 dark:text-zinc-100 mb-4">
                    <TextNotation
                      type="underline"
                      color="#0096FF"
                      animationDelay={900}
                      animationDuration={3000}
                      padding={1}
                      show={true}
                      strokeWidth={3}
                      iterations={8}
                    >
                      Our Distance
                    </TextNotation>
                  </h2>
                  <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
                    Check out how far you are from my location. The interactive
                    map below shows our distance in real-time by accessing your
                    location. It may take a few secs to load the map.
                  </p>
                </div>
              </Reveal>

              <Reveal>
                <div className="w-full overflow-hidden mb-6 sm:mb-16 mt-4 sm:mt-8">
                  <div className="scale-[0.85] sm:scale-100 origin-center mx-auto">
                    <MapWithDistance />
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
