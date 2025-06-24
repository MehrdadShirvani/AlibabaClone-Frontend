// ThemeSwitcher.tsx
import { useEffect, useState } from "react";

const themes = ["", "theme-dark", "theme-red", "theme-green"];

export const ThemeSwitcher = () => {
  const [theme, setTheme] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    themes.filter(Boolean).forEach((t) => root.classList.remove(t));
    if (theme) root.classList.add(theme);
  }, [theme]);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="nav-link"
        style={{ color: "var(--text-primary)" }}
      >
        Theme
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-40 bg-white dark:bg-neutral-900 border border-gray-300 dark:border-gray-700 rounded shadow z-50"
          style={{
            color: "var(--text-primary)",
            backgroundColor: "var(--surface)",
          }}
        >
          {themes.map((t) => (
            <button
              key={t || "default"}
              onClick={() => {
                setTheme(t);
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-neutral-800"
            >
              {t ? t.replace("theme-", "") : "Default"}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
