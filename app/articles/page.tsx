import { getArticles } from "./ArticlesList";
import ArticlesClient from "./ArticlesClient";

export default async function ArticlesPage() {
  const { articles, tags } = await getArticles();

  return <ArticlesClient initialArticles={articles} initialTags={tags} />;
}
