// Define the categories array
const CATEGORIES = [
  "React",
  "Next.js",
  "JavaScript",
  "Java",
  "Backend",
  "Animation",
  "General",
] as const;

// Export the categories array
export const categories = CATEGORIES;

// Export the Category type
export type Category = (typeof CATEGORIES)[number];

export interface Article {
  title: string;
  description: string;
  date: string;
  author: string;
  tags: Category[];
}

export interface ArticleWithSlug extends Article {
  slug: string;
}

// Helper function to get all unique tags from articles
export function getAllTags(articles: ArticleWithSlug[]): Category[] {
  const tagSet = new Set<Category>();
  articles.forEach((article) => {
    article.tags.forEach((tag) => tagSet.add(tag));
  });
  return Array.from(tagSet).sort();
}

// Rest of your existing code...
