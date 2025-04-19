import { useContext } from "react";
import { useRouter } from "next/router";
import { AppContext } from "../Providers";
import { Container } from "./Container";
import {type ArticleWithSlug } from "@/lib/articles";
import { formatDate } from "@/lib/formatDate";
import clsx from "clsx";

function Prose({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={clsx(className, "prose dark:prose-invert")} {...props} />
  );
}

