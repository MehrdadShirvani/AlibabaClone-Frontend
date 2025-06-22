// ThemeSwitcher.tsx
import { useEffect, useState } from "react";

const themes = ["", "theme-dark", "theme-red", "theme-green"];

export const ThemeSwitcher = () => {
  const [theme, setTheme] = useState("theme-dark");

  useEffect(() => {
    const root = document.documentElement;
    // Remove all theme classes first
    themes.filter(Boolean).forEach((t) => root.classList.remove(t));
    if (theme) root.classList.add(theme);
  }, [theme]);

  return (
    <div className="fixed top-4 right-4 bg-white shadow-md rounded p-2 z-50 space-x-2">
      {themes.map((t) => (
        <button
          key={t || "default"}
          onClick={() => setTheme(t)}
          className="text-sm px-3 py-1 border rounded hover:bg-gray-100"
        >
          {t ? t.replace("theme-", "") : "Default"}
        </button>
      ))}
    </div>
  );
};
