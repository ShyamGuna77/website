export const CATEGORIES = [
  "React",
  "Next.js",
  "JavaScript",
  "Java",
  "Backend",
  "Animation",
  "General",
  "System Design",
] as const;

export type Category = (typeof CATEGORIES)[number];

export interface Article {
  title: string;
  description: string;
  author: string;
  date: string;
  tags: Category[];
}

export interface ArticleWithSlug extends Article {
  slug: string;
}
