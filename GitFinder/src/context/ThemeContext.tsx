import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Theme = "light" | "dark";
type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (t: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);
const STORAGE_KEY = "theme";

/** 初期テーマを決定：localStorage > OSの設定 > "light" */
function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
  if (stored === "light" || stored === "dark") return stored;

  const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);

  // DOM と localStorage に同期
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  // OSのテーマ変更を検知して、ユーザーが手動切替していない場合に追従したい
  // （今回は「手動優先」なので追従しない実装。必要ならコメントを外して拡張）
  // useEffect(() => {
  //   const mq = window.matchMedia("(prefers-color-scheme: dark)");
  //   const listener = (e: MediaQueryListEvent) => {
  //     setThemeState(e.matches ? "dark" : "light");
  //   };
  //   mq.addEventListener("change", listener);
  //   return () => mq.removeEventListener("change", listener);
  // }, []);

  const toggleTheme = () => setThemeState(prev => (prev === "light" ? "dark" : "light"));
  const setTheme = (t: Theme) => setThemeState(t);

  const value = useMemo(() => ({ theme, toggleTheme, setTheme }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
