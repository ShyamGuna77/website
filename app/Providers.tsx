"use client";

import { createContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ThemeProvider, useTheme } from "next-themes";

type AppContextType = {
  previousPathname: string | null;
};

export const AppContext = createContext<AppContextType>({
  previousPathname: null,
});

function ThemeWatcher() {
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    function onMediaChange() {
    const systemTheme = media.matches ? "dark" : "light";
      if (resolvedTheme === systemTheme) {
        setTheme("system");
      }
    }

    onMediaChange();
    media.addEventListener("change", onMediaChange);

    return () => {
      media.removeEventListener("change", onMediaChange);
    };
  }, [resolvedTheme, setTheme]);

  return null;
}

export function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [previousPathname, setPreviousPathname] = useState<string | null>(null);

  useEffect(() => {
  
    if (pathname && pathname.includes("/articles/")) {
    
      if (!previousPathname || !previousPathname.includes("/articles/")) {
        setPreviousPathname(previousPathname);
      }
    } else {
      setPreviousPathname(pathname);
    }
  }, [pathname]);

  return (
    <AppContext.Provider value={{ previousPathname }}>
      <ThemeProvider attribute="class" disableTransitionOnChange>
        <ThemeWatcher />
        {children}
      </ThemeProvider>
    </AppContext.Provider>
  );
}
