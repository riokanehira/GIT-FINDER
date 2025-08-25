import { ROUTES } from "../const";


import { useState } from "react";

interface GithubUser {
  login: string;
  avatar_url: string;
  html_url: string;
}

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
      const res = await fetch(`https://api.github.com/search/users?q=${keyword}`);
      const data = await res.json();
      setUsers(data.items || []);
    } catch (err) {
      setError("検索に失敗しました");
    } finally {
      setLoading(false);
    }
  };



   const handleClear = () => {
    setKeyword("");
    setUsers([]);
    setError("");
    // localStorage.removeItem("searchKeyword"); ←後で実装予定ならここ
  };


  return (
    <div className="container">
      <h1>GitHub User Finder</h1>

      {/* 検索フォーム */}
      <div>
        <input
          type="text"
          value={keyword}
          placeholder="ユーザー名を入力"
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button onClick={handleSearch}>検索</button>
        <button onClick={handleClear}>クリア</button>
      </div>

      {/* ローディング・エラー表示 */}
      {loading && <p>検索中...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* 検索結果表示 */}
      <div style={{ marginTop: "20px" }}>
        {users.map((user) => (
          <div key={user.login} style={{ border: "1px solid #ccc", padding: "10px", margin: "8px 0" }}>
            <img src={user.avatar_url} alt={user.login} width={50} />
            <h3>{user.login}</h3>
            <a href={user.html_url} target="_blank" rel="noopener noreferrer">プロフィールを見る</a>
          </div>
        ))}
      </div>
    </div>
  );
}
