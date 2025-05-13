import glob from "fast-glob";
import path from "path";

export const CATEGORIES = [
  "React",
  "Next.js",
  "JavaScript",
  "Java",
  "Backend",
  "Animation",
  "General",
] as const;

export type Category = (typeof CATEGORIES)[number];

interface Article {
  title: string;
  description: string;
  author: string;
  date: string;
  tags: Category[];
}

export interface ArticleWithSlug extends Article {
  slug: string;
}

async function importArticle(
  articleFilename: string
): Promise<ArticleWithSlug> {
  const { article } = await import(`@/app/articles/${articleFilename}`);

  return {
    slug: articleFilename.replace(/(\/page)?\.mdx$/, ""),
    tags: article.tags || ["General"],
    ...article,
  };
}

export async function getAllArticles() {
  const articleFilenames = await glob("*/page.mdx", {
    cwd: path.join(process.cwd(), "app/articles"),
  });

  const articles = await Promise.all(articleFilenames.map(importArticle));

  return articles.sort((a, z) => +new Date(z.date) - +new Date(a.date));
}
