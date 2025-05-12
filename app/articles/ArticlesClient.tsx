"use client";

import React, { useState } from "react";
import { Card } from "../components/Card";
import { SimpleLayout } from "../components/SimpleLayout";
import { formatDate } from "@/lib/formatDate";
import { type ArticleWithSlug } from "@/lib/articles";
import Reveal from "../utils/Reveal";
import { FaSearch } from "react-icons/fa";

interface ArticlesClientProps {
  initialArticles: ArticleWithSlug[];
  initialTags: string[];
}

function Article({ article }: { article: ArticleWithSlug }) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Reveal>
          <Card.Title href={`/articles/${article.slug}`}>
            {article.title}
          </Card.Title>
        </Reveal>
        <Reveal>
          <Card.Eyebrow
            as="time"
            dateTime={article.date}
            className="md:hidden"
            decorate
          >
            {formatDate(article.date)}
          </Card.Eyebrow>
        </Reveal>
        <Reveal>
          <Card.Description>{article.description}</Card.Description>
        </Reveal>
        <Reveal>
          <div className="flex flex-wrap gap-2 mt-4">
            {(article.tags || []).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-sm bg-blue-100 text-blue-800 rounded-full dark:bg-blue-900 dark:text-blue-200"
              >
                {tag}
              </span>
            ))}
          </div>
        </Reveal>
        <Reveal>
          <Card.Link href={`/articles/${article.slug}`}>
            <Card.Cta>Read article</Card.Cta>
          </Card.Link>
        </Reveal>
      </Card>

      <Card.Eyebrow
        as="time"
        dateTime={article.date}
        className="mt-1 hidden md:block"
      >
        {formatDate(article.date)}
      </Card.Eyebrow>
    </article>
  );
}

export default function ArticlesClient({
  initialArticles,
  initialTags,
}: ArticlesClientProps) {
  const [articles] = useState(initialArticles);
  const [tags] = useState(initialTags);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      searchQuery === "" ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (article.tags || []).some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesTag =
      selectedTag === null ||
      (article.tags || []).some(
        (tag) => tag.toLowerCase() === selectedTag.toLowerCase()
      );

    return matchesSearch && matchesTag;
  });

  return (
    <SimpleLayout
      title="Just a Dev Who loves to write Blogs about Tech,Movies..."
      intro="A collection of my long-form thoughts — on code, system design, anime, tech culture, and everything I'm learning along the way. All in the order they happened."
    >
      <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 pl-10 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:border-zinc-700"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  selectedTag === tag
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-zinc-800 dark:text-gray-300 dark:hover:bg-zinc-700"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="flex max-w-3xl flex-col space-y-16">
          {filteredArticles.map((article) => (
            <Article key={article.slug} article={article} />
          ))}
          {filteredArticles.length === 0 && (
            <p className="text-center text-gray-500 dark:text-gray-400">
              No articles found matching your search criteria.
            </p>
          )}
        </div>
      </div>
    </SimpleLayout>
  );
}
