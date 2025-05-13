/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */

"use client";

import { useContext } from "react";
import { useRouter } from "next/navigation";
import { AppContext } from "../Providers";
import { Container } from "./Container";
import { type ArticleWithSlug } from "@/lib/articles";
import { formatDate } from "@/lib/formatDate";
import clsx from "clsx";
import { FaArrowLeft } from "react-icons/fa6";
import { TableOfContents } from "./TableOfContents";
import { useHeadings } from "../utils/useHeadings";
import { useScrollSpy } from "../utils/useScrollSpy";
import { useRef } from "react";

function Prose({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={clsx(className, "prose dark:prose-invert")} {...props} />
  );
}

export function ArticleLayout({
  article,
  children,
}: {
  article: ArticleWithSlug;
  children: React.ReactNode;
}) {
  let router = useRouter();
  let { previousPathname } = useContext(AppContext);
  const articleRef = useRef<HTMLDivElement>(null);
  const headings = useHeadings(articleRef);
  const activeId = useScrollSpy(
    headings.map(({ id }) => id),
    { rootMargin: "0% 0% -80% 0%" }
  );

  return (
    <Container className="mt-16 lg:mt-32">
      <div className="xl:relative">
        <div className="mx-auto max-w-6xl">
          {previousPathname && (
            <button
              type="button"
              onClick={() => router.back()}
              aria-label="Go back to articles"
              className="group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition lg:absolute lg:-left-5 lg:-mt-2 lg:mb-0 xl:-top-1.5 xl:left-0 xl:mt-0 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20"
            >
              <FaArrowLeft className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400" />
            </button>
          )}
          <div className="relative lg:grid lg:grid-cols-[1fr_16rem] lg:gap-x-16">
            <article className="prose prose-zinc dark:prose-invert max-w-none lg:max-w-3xl">
              <header className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-4xl">
                  {article.title}
                </h1>
                <div className="flex items-center gap-4 mt-4">
                  <time
                    dateTime={article.date}
                    className="text-sm text-zinc-500 dark:text-zinc-400"
                  >
                    {formatDate(article.date)}
                  </time>
                  <div className="flex flex-wrap gap-2">
                    {(article.tags || []).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-sm bg-blue-100 text-blue-800 rounded-full dark:bg-blue-900 dark:text-blue-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </header>
              <div ref={articleRef} className="mt-8" data-mdx-content>
                {children}
              </div>
            </article>
            <div className="hidden lg:block pl-8 border-l border-zinc-200 dark:border-zinc-800">
              <div className="sticky top-24">
                <TableOfContents headings={headings} activeId={activeId} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
