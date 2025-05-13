import { getAllArticles } from "@/lib/articles";
import ArticlesClient from "./ArticlesClient";

export const dynamic = "force-dynamic";

export default async function ArticlesPage() {
  const articles = await getAllArticles();

  return <ArticlesClient initialArticles={articles} />;
}
