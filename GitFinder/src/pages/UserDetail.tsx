import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { GITHUB_API_HEADERS } from "../const";

type User = {
  login: string;
  avatar_url: string;
  html_url: string;
  name: string | null;
  bio: string | null;
  blog: string | null;
  followers: number;
  following: number;
  public_repos: number;
  public_gists: number;
};

type Repo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
};

export default function UserDetail() {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!username) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        // User
        const uRes = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`, {
          headers: GITHUB_API_HEADERS,
        });
        if (!uRes.ok) {
          if (uRes.status === 404) throw new Error("ユーザーが見つかりませんでした。");
          if (uRes.status === 403) throw new Error("APIの呼び出し制限に達しました。少し待って再度お試しください。");
          throw new Error(`ユーザー取得に失敗しました (HTTP ${uRes.status})`);
        }
        const uData: User = await uRes.json();
        setUser(uData);

        // Repos（更新日の新しい順で）
        const rRes = await fetch(
          `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=30&sort=updated`,
          { headers: GITHUB_API_HEADERS }
        );
        if (!rRes.ok) {
          if (rRes.status === 403) throw new Error("リポジトリ取得でAPI制限に達しました。時間を置いてください。");
          throw new Error(`リポジトリ取得に失敗しました (HTTP ${rRes.status})`);
        }
        const rData: Repo[] = await rRes.json();
        setRepos(Array.isArray(rData) ? rData : []);
      } catch (e: any) {
        setError(e?.message || "読み込みに失敗しました。");
        setUser(null);
        setRepos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  if (loading) return <div className="container">Loading...</div>;
  if (error) return <div className="container">{error}</div>;
  if (!user) return <div className="container">ユーザーが見つかりません。</div>;

  return (
    <div className="container" style={{ display: "grid", gap: 16 }}>
      <button onClick={() => navigate(-1)}>← Back</button>

      {/* ユーザー情報 */}
      <section className="profile-card" style={{ display: "grid", gap: 12 }}>
        <img src={user.avatar_url} alt={user.login} width={150} height={150} style={{ borderRadius: 8 }} />
        <h1>{user.name || user.login}</h1>
        {user.bio && <p>{user.bio}</p>}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <a href={user.html_url} target="_blank" rel="noopener noreferrer">GitHub Profile</a>
          {user.blog && (
            <a href={/^https?:\/\//.test(user.blog) ? user.blog : `https://${user.blog}`} target="_blank" rel="noopener noreferrer">
              Website
            </a>
          )}
        </div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <span>Followers: {user.followers}</span>
          <span>Following: {user.following}</span>
          <span>Repos: {user.public_repos}</span>
          <span>Gists: {user.public_gists}</span>
        </div>
      </section>

      {/* リポジトリ一覧 */}
      <section className="repo-grid" style={{ display: "grid", gap: 12 }}>
        <h2>Repositories</h2>
        {repos.length === 0 && <p>公開リポジトリはありません。</p>}
        {repos.map((repo) => (
          <article key={repo.id} className="repo-card" style={{ padding: 12, border: "1px solid var(--border)", borderRadius: 8 }}>
            <h3 style={{ margin: 0 }}>
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer">{repo.name}</a>
            </h3>
            <p style={{ margin: "8px 0" }}>{repo.description ?? "No description"}</p>
            <div style={{ fontSize: 12, opacity: 0.8 }}>
              ⭐ {repo.stargazers_count}　Forks {repo.forks_count}　Updated {new Date(repo.updated_at).toLocaleString()}
            </div>
          </article>
        ))}
      </section>

      {/* 検索に戻る導線 */}
      <div>
        <Link to="/">🔎 検索に戻る</Link>
      </div>
    </div>
  );
}
