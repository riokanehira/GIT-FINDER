import { GithubUser } from "../types/github";
import { useState } from "react";
import SearchBar from "./components/searchbar/SearchBar";
import UserCard from "./components/userCard/UserCard"; // ← usercard に統一
import { GITHUB_API_HEADERS } from "../const";

export default function Home() {
  const [keyword, setKeyword] = useState("");
  const [users, setUsers] = useState<GithubUser[]>([]);
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
  };

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
          <p>ユーザー名を入力して検索してください。</p>
        )}
        {!loading && !error && users.length === 0 && keyword !== "" && (
          <p>該当するユーザーが見つかりませんでした。</p>
        )}
      </div>

      <div>
        {users.map((u) => (
          <UserCard key={u.login} user={u} />
        ))}
      </div>
    </div>
  );
}
