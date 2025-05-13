import { useEffect, useState } from "react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

export function useHeadings(
  articleRef: React.RefObject<HTMLDivElement | null>
) {
  const [headings, setHeadings] = useState<Heading[]>([]);

  useEffect(() => {
    if (!articleRef.current) return;

    const elements = Array.from(
      articleRef.current.querySelectorAll("h2, h3")
    ).map((element) => {
      if (!element.id) {
        element.id =
          element.textContent
            ?.toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "") || "";
      }
      return {
        id: element.id,
        text: element.textContent || "",
        level: Number(element.tagName.charAt(1)),
      };
    });

    setHeadings(elements);
  }, [articleRef]);

  return headings;
}
