import { useRef, useEffect } from "react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  headings: Heading[];
  activeId: string | null;
}

export function TableOfContents({ headings, activeId }: TableOfContentsProps) {
  const tocRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!tocRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("id");
          if (entry.isIntersecting) {
            document
              .querySelector(`nav a[href="#${id}"]`)
              ?.classList.add("active");
          } else {
            document
              .querySelector(`nav a[href="#${id}"]`)
              ?.classList.remove("active");
          }
        });
      },
      { rootMargin: "-20% 0px -80% 0px" }
    );

    document
      .querySelectorAll("h2, h3")
      .forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) return null;

  return (
    <nav ref={tocRef} className="text-sm">
      <h5 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
        On this page
      </h5>
      <ul className="space-y-3">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className={`block text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300 ${
                heading.level === 3 ? "pl-4" : ""
              } ${
                activeId === heading.id
                  ? "text-zinc-900 dark:text-zinc-100 font-medium"
                  : ""
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
