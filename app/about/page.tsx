/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */

"use client";
// import {type Metadata } from "next"
import Reveal from "../utils/Reveal";
import { Container } from "../components/Container";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdMail } from "react-icons/md";
import { TextNotation } from "react-text-decorator";
import { SocialText } from "../components/SocialText";
import IDCard3D from "../components/IDCard3D";


// export const metadata: Metadata = {
//   title: 'About',
//   description:
//     'I'm Shyam guna. Fullstack SDE based in India.'
// }

const About = () => {
  return (
    <>
      <Container className="mt-16 sm:mt-32">
        <div
          className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto-1fr] lg:gap-y-12
       "
        >
          <div className="lg:pl-20">
            <div className="max-w-xs px-2.5 lg:max-w-none">
              <IDCard3D />
            </div>
          </div>
          <div className="lg:order-first lg:row-span-2">
            <Reveal>
              <h1 className="text-4xl font-bold tracking-tight">
                Hey, I'm{" "}
                <TextNotation
                  type="highlight"
                  color="#0096FF"
                  show={true}
                  iterations={6}
                  strokeWidth={2}
                  animationDuration={3400}
                  animationDelay={4400}
                >
                  {" "}
                  Shyam Guna{" "}
                </TextNotation>{" "}
                — a Full Stack Developer from India with a passion for building
                clean, creative, and scalable digital experiences.
              </h1>
            </Reveal>
            <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
              <Reveal>
                <p>
                  Despite Graduating from a RoadSide college with Limited
                  resources.I turned my constaints into oppurtunities. I was
                  building my own curriculum through online courses,Youtube,
                  open-source projects,Blogs, and countless nights debugging
                  code until sunrise.#009
                </p>
              </Reveal>
              <Reveal>
                <p>
                  As part of that journey, I even created an{" "}
                  <a
                    href="https://www.npmjs.com/package/react-text-decorator"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <TextNotation
                      hover={true}
                      type="highlight"
                      iterations={6}
                      strokeWidth={2}
                      color="#0096FF"
                      animationDelay={1000}
                      animationDuration={1800}
                    >
                      {" "}
                      <span className="text-blue-500 underline hover:text-blue-800">
                        npm package
                      </span>
                    </TextNotation>
                  </a>{" "}
                  —{" "}
                  <strong>
                    <TextNotation
                      type="underline"
                      color="#0096FF"
                      show={true}
                      iterations={4}
                      strokeWidth={2}
                      animationDelay={5550}
                      animationDuration={4000}
                    >
                      react-text-decorator
                    </TextNotation>
                  </strong>{" "}
                  — that supports both React and Next.js . It's a lightweight
                  tool for adding stylish text decorations, making UI writing
                  cleaner and more expressive.
                </p>
              </Reveal>
              <Reveal>
                <p>
                  My learning playground? Twitter , GitHub repos, and Discord
                  Convos. I stay on top of the latest tech trends by being
                  active in online dev communities, constantly soaking up
                  insights and experimenting with new tools. I love building
                  sleek frontends, robust backends, and anything in between that
                  turns ideas into real, usable products.
                </p>
              </Reveal>

              <Reveal>
                <div className="flex justify-center items-center mt-3 space-x-4">
                  <img
                    src="/spd.svg"
                    alt="Shyam Signature"
                    width={320}
                    height={200}
                    className="mx-auto opacity-80 hover:opacity-100 transition-opacity duration-300 dark:invert"
                  />
                </div>
              </Reveal>
            </div>
          </div>
          <div className="lg:pl-20">
            <ul role="list" className="space-y-5 hover:text-blue-500">
              <Reveal>
                <SocialText href="https://x.com/Hikki_7d" icon={FaXTwitter}>
                  Follow on X
                </SocialText>
              </Reveal>
              <Reveal>
                <SocialText
                  href="https://www.instagram.com/shyamguna77/"
                  icon={FaInstagram}
                >
                  Follow on Instagram
                </SocialText>
              </Reveal>
              <Reveal>
                <SocialText
                  href="https://www.linkedin.com/in/shyamguna77/"
                  icon={FaLinkedin}
                >
                  Follow on Linkedn
                </SocialText>
              </Reveal>
              <Reveal>
                <SocialText
                  href="https://github.com/ShyamGuna77"
                  icon={FaGithub}
                >
                  Follow on Github
                </SocialText>
              </Reveal>
              <Reveal>
                <SocialText
                  href="mailto:shyamprasad8247@gmail.com"
                  icon={MdMail}
                  className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
                >
                  shyamprasad8247@gmail.com
                </SocialText>
              </Reveal>
            </ul>
          </div>
        </div>
      </Container>
    </>
  );
};

export default About;
