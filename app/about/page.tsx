/* eslint-disable react/no-unescaped-entities */

import {type Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import clsx from "clsx"
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
            object-cover object-top dark:bg-zinc-800"
              />
            </div>
          </div>
          <div className="lg:order-first lg:row-span-2">
            <h1 className="text-4xl font-bold tracking-tight">
              Hey, I’m Shyam Guna — a 21-year-old Full Stack Developer from
              India with a passion for building clean, creative, and scalable
              digital experiences.
            </h1>
            <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
              <p>
                Despite Graduating from a RoadSide college with Limited
                resources.I turned my constaints into oppurtunities. I was
                building my own curriculum through online courses,Youtube,
                open-source projects,Blogs, and countless nights debugging code
                until sunrise.
              </p>
              <p>
                My learning playground? Twitter , GitHub repos, and Discord
                Convos. I stay on top of the latest tech trends by being active
                in online dev communities, constantly soaking up insights and
                experimenting with new tools. I love building sleek frontends,
                robust backends, and anything in between that turns ideas into
                real, usable products.
              </p>
              <p>
                Outside of Coding . I am an Anime enthusiast(Otaku alert!) and
                Film Lover. My anime collection ranges from the intricate
                mysteries of Death Note to the epic world-building stories of
                One Piece, where I find inspiration in Luffy's persistence and
                creativity when facing seemingly impossible obstacles.
              </p>
              <p>
                Into anime and coding? Same here! Whether you're passionate
                about building cool stuff or binge-watching the latest season of
                your favorite anime, let's connect. I’m always up for tech
                chats, debugging sessions, or dropping anime recommendations.
                Hit me up — let’s geek out together!
              </p>
            </div>
          </div>
          <div className="lg:pl-20">
            <ul>
              <SocialText href="#" icon={FaXTwitter}>
                Follow on X
              </SocialText>
              <SocialText href="#" icon={FaInstagram}>
                Follow on Instagram
              </SocialText>
              <SocialText href="#" icon={FaLinkedin}>
                Follow on Linkedn
              </SocialText>
              <SocialText href="#" icon={FaGithub}>
                Follow on Github
              </SocialText>
            </ul>
          </div>
        </div>
      </Container>
    </>
  );
}

export default About