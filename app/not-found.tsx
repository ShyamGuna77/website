
import { Button } from "@headlessui/react";
import Link from "next/link";
import { Container } from "./components/Container";

export default function NotFound() {
    return (
        <Container className="flex h-full items-center pt-16 sm:pt-32">
            <div className="flex flex-col items-center">
                <p className="text-2xl font-bold text-zinc-600 dark:text-zinc-400">404</p>
                <h1 className="font-bold mt-4 text-5xl tracking-tight text-zinc-800 sm:text-4xl dark:text-zinc-100">Page Not Found</h1>
                <p className="mt-6 text-base font-semibold tracking-tight text-zinc-600 dark:text-zinc-300 ">Sorry, We coudn&apos;t Find the Page you are looking for</p>
                 <Link href="/">
                 <Button className="inline-flex mt-5 items-center gap-2 rounded-md bg-gray-700 dark:bg-zinc-100 dark:text-zinc-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
                    Go Back Buddy
                 </Button>
                 
                 </Link>
               
            </div>
        </Container>
    )
}