"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

function subscribe() {
  return () => {};
}

function getSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

export default function ThemeToggle() {
  const mounted = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const { theme, setTheme } = useTheme();

  if (!mounted) {
    return (
      <div
        className="h-11 w-11 rounded-full border"
        style={{
          borderColor: "var(--border)",
          background: "color-mix(in srgb, var(--card) 70%, transparent)",
        }}
      />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-colors duration-300"
      style={{
        borderColor: "var(--border)",
        background: "color-mix(in srgb, var(--card) 70%, transparent)",
        color: "var(--text)",
      }}
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}