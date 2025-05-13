import { getAllArticles } from "../../lib/server/articles";
import { NextResponse } from "next/server";

export async function GET() {
  const articles = await getAllArticles();
  return NextResponse.json(articles);
}
