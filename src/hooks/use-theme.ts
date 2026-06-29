import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const stored =
      typeof window !== "undefined"
        ? (localStorage.getItem("carolzyn-theme") as Theme | null)
        : null;
    const initial: Theme = stored ?? "light";
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);

  const toggle = () => {
    setTheme((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      document.documentElement.classList.toggle("dark", next === "dark");
      try {
        localStorage.setItem("carolzyn-theme", next);
      } catch {
        // Ignore localStorage errors
      }
      return next;
    });
  };

  return { theme, toggle };
}
