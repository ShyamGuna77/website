

import { FaChevronRight } from "react-icons/fa";
import clsx from "clsx";
import Link from "next/link";
import type { ElementType, ReactNode, ComponentPropsWithoutRef } from "react";

// Base type to support 'as' polymorphic components
type CardProps<T extends ElementType> = {
  as?: T;
  className?: string;
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

export function Card<T extends ElementType = "div">({
  as,
  className,
  children,
  ...props
}: CardProps<T>) {
  const Component = as || "div";

  return (
    // @ts-expect-error CardProps is not defined
    <Component
      className={clsx(className, "group relative flex flex-col items-start")}
      {...props}
    >
      {children}
    </Component>
  );
}

// Card.Link
Card.Link = function CardLink({
  children,
  ...props
}: ComponentPropsWithoutRef<typeof Link>) {
  return (
    <>
      <div className="absolute -inset-x-4 -inset-y-6 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-2xl dark:bg-zinc-800/50" />
      <Link {...props}>
        <span className="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl" />
        <span className="relative z-10">{children}</span>
      </Link>
    </>
  );
};

// Card.Title
Card.Title = function CardTitle<T extends ElementType = "h2">({
  as,
  href,
  children,
  ...props
}: {
  as?: T;
  href?: string;
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "href" | "children">) {
  const Component = as || "h2";

  return (
    // @ts-expect-error CardProps is not defined
    <Component
      className="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100"
      {...props}
    >
      {href ? <Card.Link href={href}>{children}</Card.Link> : children}
    </Component>
  );
};

// Card.Description
Card.Description = function CardDescription({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <p className="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
      {children}
    </p>
  );
};

// Card.Cta
Card.Cta = function CardCta({ children }: { children: ReactNode }) {
  return (
    <div
      aria-hidden="true"
      className="relative z-10 mt-4 flex items-center text-sm font-medium text-blue-400"
    >
      {children}
      <FaChevronRight className="ml-1 h-4 w-4 stroke-current" />
    </div>
  );
};

// Card.Eyebrow
Card.Eyebrow = function CardEyebrow<T extends ElementType = "p">({
  as,
  decorate = false,
  className,
  children,
  ...props
}: {
  as?: T;
  decorate?: boolean;
  className?: string;
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">) {
  const Component = as || "p";

  return (
    // @ts-expect-error CardProps is not defined
    <Component
      className={clsx(
        className,
        "relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500",
        decorate && "pl-3.5"
      )}
      {...props}
    >
      {decorate && (
        <span
          className="absolute inset-y-0 left-0 flex items-center"
          aria-hidden="true"
        >
          <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
        </span>
      )}
      {children}
    </Component>
  );
};
