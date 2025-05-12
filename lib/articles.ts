import glob from "fast-glob";
import path from "path";

interface Article {
  title: string;
  description: string;
  author: string;
  date: string;
  tags?: string[];
}

export interface ArticleWithSlug extends Article {
  slug: string;
}

async function importArticle(
  articleFilename: string
): Promise<ArticleWithSlug> {
  // Use dynamic import with string concatenation
  // app/lib/articles.ts
  const { article } = await import(`@/app/articles/${articleFilename}`);

  return {
    slug: articleFilename.replace(/(\/page)?\.mdx$/, ""),
    tags: article.tags || [],
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

// Add search functionality
export function searchArticles(articles: ArticleWithSlug[], query: string) {
  const searchTerm = query.toLowerCase();
  return articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchTerm) ||
      article.description.toLowerCase().includes(searchTerm) ||
      (article.tags || []).some((tag) => tag.toLowerCase().includes(searchTerm))
  );
}

// Add tag filtering
export function filterArticlesByTag(articles: ArticleWithSlug[], tag: string) {
  return articles.filter((article) =>
    (article.tags || []).some((t) => t.toLowerCase() === tag.toLowerCase())
  );
}

// Get all unique tags
export function getAllTags(articles: ArticleWithSlug[]) {
  const tags = new Set<string>();
  articles.forEach((article) => {
    (article.tags || []).forEach((tag) => tags.add(tag));
  });
  return Array.from(tags).sort();
}
