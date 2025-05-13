import { useEffect, useState } from "react";

interface ScrollSpyOptions {
  rootMargin?: string;
}

export function useScrollSpy(
  selectors: string[],
  options: ScrollSpyOptions = {}
): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const elements = selectors
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: options.rootMargin || "0% 0% -80% 0%",
      }
    );

    elements.forEach((element) => {
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [selectors, options.rootMargin]);

  return activeId;
}
