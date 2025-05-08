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
import { TextNotation, TextNotationGroup } from "react-text-decorator";

export default function Home() {
  return (
    <Container className="mt-9">
      <TextNotationGroup show={true}>
        <div className="max-w-2xl mb-12">
          <Reveal>
            <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
              <TextNotation
                type="highlight"
                color="#0096FF"
                animationDelay={7500}
                animationDuration={4500}
                padding={1}
                show={true}
                strokeWidth={4}
                iterations={6}
                order={1}
              >
                <span>Frontend</span>
              </TextNotation>
              , backend, anime weekend
            </h1>
          </Reveal>

          <Reveal>
            <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
              I&apos;m
              <TextNotation
                type="underline"
                color="#0096FF"
                animationDelay={500}
                animationDuration={1400}
                padding={1}
                hover={true}
                iterations={5}
              >
                Shyam
              </TextNotation>
              , a fullstack developer and tech enthusiast from India. I craft
              digital experiences with websockets, animation with Framer Motion,
              bringing both backend logic and frontend magic to life
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

        {/* <div className="w-full flex justify-center mt-24">
        <GithubGraph />
        <div className="w-full max-w-xl ml-auto mr-0">
          <Reveal>
            <div className="mb-8">
              <h2 className = "text-2xl font-bold text-center tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100 mb-4">
                Our Distance
              </h2>
             
              <p className="text-zinc-600 dark:text-zinc-400">
                Check out how far you are from my location in Nellore, Andhra.
                The interactive map below shows our distance in real-time by
                accessing your location.It may take few secs to load map.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="w-full overflow-hidden mb-16 rounded-2xl shadow-lg">
              <MapWithDistance />
            </div>
          </Reveal>
        </div>
      </div> */}

        <div className="w-full px-4 md:px-8 mt-24">
          <div className="flex flex-col lg:flex-row gap-12 justify-center items-start">
            {/* GitHub Graph Container */}
            <div className="w-full lg:w-1/2 mt-4">
              <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-4 sm:p-6">
                <h2 className="text-2xl font-bold text-center tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100 mb-4">
                  <TextNotation
                    type="underline"
                    color="#0096FF"
                    animationDelay={700}
                    animationDuration={4500}
                    show={true}
                    strokeWidth={3}
                    iterations={6}
                    order={2}
                  >
                    Proof of Work
                  </TextNotation>
                </h2>
                <Reveal>
                  <div className="px-2 sm:px-4">
                    <GithubGraph />
                  </div>
                </Reveal>
              </div>
            </div>

            {/* Map + Text Container */}
            <div className="w-full lg:w-1/2">
              <div className="max-w-xl ml-auto mr-0">
                <Reveal>
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-center tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100 mb-4">
                      <TextNotation
                        type="underline"
                        color="#0096FF"
                        animationDelay={500}
                        animationDuration={4500}
                        padding={1}
                        show={true}
                        strokeWidth={3}
                        iterations={8}
                        order={3}
                      >
                        Our Distance
                      </TextNotation>
                    </h2>
                    <p className="text-zinc-600 dark:text-zinc-400">
                      Check out how far you are from my location in Nellore,
                      Andhra. The interactive map below shows our distance in
                      real-time by accessing your location. It may take a few
                      secs to load the map.
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
          </div>
        </div>
      </TextNotationGroup>
    </Container>
  );
}
