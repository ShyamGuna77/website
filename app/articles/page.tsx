import React from 'react'
import { Card } from '../components/Card'
import { SimpleLayout } from '../components/SimpleLayout'
import { formatDate } from '@/lib/formatDate'
import { type ArticleWithSlug,getAllArticles } from '@/lib/articles'
import { Metadata } from 'next'

function Article({ article }: { article: ArticleWithSlug }) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`/articles/${article.slug}`}>
          {article.title}
        </Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={article.date}
          className="md:hidden"
          decorate
        >
          {formatDate(article.date)}
        </Card.Eyebrow>
        <Card.Description>{article.description}</Card.Description>
        <Card.Cta>Read article</Card.Cta>
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
export const metadata: Metadata = {
  title: "Articles",
  description:
    "All of my long-form thoughts on programming, anime, product,Prodcasts and more, collected in chronological order.",
};


export default async function ArticlesIndex() {
  const articles = await getAllArticles();

  return (
    <SimpleLayout
      title="Just a Dev Who loves to write Blogs about Tech,Movies..."
      intro="A collection of my long-form thoughts — on code, system design, anime, tech culture, and everything I’m learning along the way. All in the order they happened."
    >
      <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <div className="flex max-w-3xl flex-col space-y-16">
          {articles.map((article) => (
            <Article key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </SimpleLayout>
  );
}

