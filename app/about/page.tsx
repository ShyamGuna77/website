/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */

import {type Metadata } from "next"
import Image from "next/image"

import Reveal from "../utils/Reveal";
import { Container } from "../components/Container"
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { MdMail } from "react-icons/md";
import serious from '@/app/Images/moodoff.png'

import { SocialText } from "../components/SocialText"


export const metadata: Metadata = {
  title: 'About',
  description:
    'I’m Shyam guna. Fullstack SDE based in India.'
}



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
              <Image
                src={serious}
                alt="A Anime based picture of mine (goood looking )"
                sizes="(min-width:1024px) 32rem , 20rem"
                className="aspect-square rotate-3 rounded-2xl bg-zimc-100
            object-cover object-top dark:bg-zinc-800  dark:shadow-[0_10px_20px_rgba(59,130,246,0.5)] shadow-2xl shadow-blue-300"
              />
            </div>
          </div>
          <div className="lg:order-first lg:row-span-2">
            <Reveal>
              <h1 className="text-4xl font-bold tracking-tight">
                Hey, I’m Shyam Guna — a Full Stack Developer from
                India with a passion for building clean, creative, and scalable
                digital experiences.
              </h1>
            </Reveal>
            <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
              <Reveal>
                <p>
                  Despite Graduating from a RoadSide college with Limited
                  resources.I turned my constaints into oppurtunities. I was
                  building my own curriculum through online courses,Youtube,
                  open-source projects,Blogs, and countless nights debugging
                  code until sunrise.
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
                <p>
                  Outside of Coding . I love watching anime and
                  Film Lover. My anime collection ranges from the intricate
                  mysteries of Death Note to the epic world-building stories of
                  One Piece, where I find inspiration in Luffy's persistence and
                  creativity when facing seemingly impossible obstacles.
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
}

export default About