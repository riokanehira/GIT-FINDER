//import { GithubUser } from "../types/github";
import { useState } from "react";
import SearchBar from "./components/searchbar/SearchBar";
import UserCard from "./components/userCard/UserCard"; // ← usercard に統一
import { GITHUB_API_HEADERS } from "../const";
import { useEffect } from "react";
import styles from "../layout/home.module.css";

const KEYWORD_KEY = "gf:lastKeyword";
const RESULTS_KEY = "gf:lastResults";

function loadInitialKeyword() {
  if (typeof window === "undefined") return "";
  return sessionStorage.getItem(KEYWORD_KEY) ?? "";
}

function loadInitialResults(): any[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = sessionStorage.getItem(RESULTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/*
const KEYWORD_STORAGE_KEY = "gf:lastKeyword";
function getInitialKeyword() {
  if (typeof window === "undefined") return "";
  return window.localStorage.getItem(KEYWORD_STORAGE_KEY) ?? "";
}
*/

export default function Home() {
  // state 初期化を差し替え（既存の useState を置き換え）
  const [keyword, setKeyword] = useState(loadInitialKeyword);
  const [users, setUsers] = useState<any[]>(loadInitialResults);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");



  const handleSearch = async () => {
    if (!keyword) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `https://api.github.com/search/users?q=${encodeURIComponent(keyword)}&per_page=30`,
        { headers: GITHUB_API_HEADERS }
      );
      if (!res.ok) {
        if (res.status === 403) throw new Error("APIの呼び出し制限に達しました。少し待って再度お試しください。");
        throw new Error(`検索に失敗しました (HTTP ${res.status})`);
      }
      const data = await res.json();
      setUsers(Array.isArray(data.items) ? data.items : []);
    } catch (e: any) {
      setError(e?.message || "検索に失敗しました。時間を置いて再度お試しください。");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
  setKeyword("");
  setUsers([]);
  setError("");
  sessionStorage.removeItem(KEYWORD_KEY);
  sessionStorage.removeItem(RESULTS_KEY);
  };
  
  // 変更を保存：import { useEffect } from "react"; を忘れずに
  useEffect(() => {
    sessionStorage.setItem(KEYWORD_KEY, keyword);
  }, [keyword]);

  useEffect(() => {
    sessionStorage.setItem(RESULTS_KEY, JSON.stringify(users));
  }, [users]);


  

  return (
    <div className="container">
      <h1>GitHub User Finder</h1>

      <SearchBar
        keyword={keyword}
        onKeywordChange={setKeyword}
        onSearch={handleSearch}
        onClear={handleClear}
        loading={loading}
      />

      <div style={{ marginTop: 12 }}>
        {error && <p>{error}</p>}
        {!loading && !error && users.length === 0 && keyword === "" && (
          <p>Enter your username to search</p>
        )}
        {!loading && !error && users.length === 0 && keyword !== "" && (
          <p>No matching users were found</p>
        )}
      </div>

      <div className={styles.grid}>
        {users.map((u) => (
          <UserCard key={u.login} user={u} />
        ))}
      </div>
    </div>
  );
}
