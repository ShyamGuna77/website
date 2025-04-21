/* eslint-disable react/no-unescaped-entities */
import { type Metadata } from "next";
import { Container } from "../components/Container";
import React from "react";

export const metadata: Metadata = {
  title: "LifeLog",
  description: "I’m Shyam guna. Fullstack SDE based in India.",
};

type Resource = {
  title: string;
  url: string;
};

const resources: Resource[] = [
  { title: "How to Get Rich - Naval", url: "https://nav.al/rich" },
  {
    title: "Steve Jobs Stanford speech - Must watch",
    url: "https://www.youtube.com/watch?v=UF8uR6Z6KLc",
  },
  {
    title: "What I Wish Someone Had Told Me  -- sam Altman",
    url: "https://blog.samaltman.com/what-i-wish-someone-had-told-me",
  },
  {
    title: "Why Do You Postpone Yourself",
    url: "https://www.youtube.com/watch?v=VOjpFa_irgM",
  },
  {
    title: "The Intellectual Obesity Crisis",
    url: "https://www.gurwinder.blog/p/the-intellectual-obesity-crisis",
  },

  {
    title: "How to be Sucessfull  --sama",
    url: "https://blog.samaltman.com/how-to-be-successful",
  },

  {
    title: "The Ultimate productivity hack is saying No --james clear",
    url: "https://jamesclear.com/saying-no",
  },
  {
    title:
      "If Self-Discipline Feels Difficult, Then You’re Doing It Wrong --mark manson",
    url: "https://markmanson.net/self-discipline",
  },
  {
    title: "I will teach you to be Rich  --Ramit sethi",
    url: "https://files.addictbooks.com/wp-content/uploads/2022/11/I-Will-Teach-you-to-be-Rich.pdf",
  },
  {
    title: "The one rule of Life  -- Mark Manson",
    url: "https://markmanson.net/the-one-rule-for-life",
  },
  {
    title: "HardWork  --Might Guy",
    url: "https://www.youtube.com/watch?v=vKYTUy-GFRs",
  },
];

const LifeLog = () => {
  return (
    <Container>
      <div className="flex flex-col items-center  pt-10">
        <div className="space-y-6">
          <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white">
            My LifeLog
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 mt-4">
            This is a collection of resources that helped me a lot. <br />
            I'll keep updating it as I find more useful stuff.
          </p>
          <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400">
            If something seems important to be included here, please let me
            know.
          </p>

          <ul className="mt-10 list-disc list-inside text-left text-lg text-gray-800 dark:text-gray-200 space-y-3">
            {resources.map((resource, index) => (
              <li key={index}>
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {resource.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Container>
  );
};

export default LifeLog;
