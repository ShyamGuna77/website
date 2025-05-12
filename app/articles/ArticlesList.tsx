import { getAllArticles, getAllTags } from "@/lib/articles";
import { ArticleWithSlug } from "@/lib/articles";

export async function getArticles() {
  const articles = await getAllArticles();
  const tags = getAllTags(articles);
  return { articles, tags };
}

export type { ArticleWithSlug };
