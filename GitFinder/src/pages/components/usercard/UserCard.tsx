import { Link } from "react-router-dom";
import { GithubUser } from "../../../types/github";

export default function UserCard({ user }: { user: GithubUser }) {
  return (
    <article style={{ display: "flex", gap: 12, alignItems: "center", padding: 12, border: "1px solid var(--border)", borderRadius: 8 }}>
      <img src={user.avatar_url} alt={user.login} width={56} height={56} style={{ borderRadius: "50%" }} />
      <div style={{ display: "grid" }}>
        <strong>{user.login}</strong>
        <div style={{ display: "flex", gap: 8 }}>
          <Link to={`/user/${user.login}`}>詳細を見る</Link>
          <a href={user.html_url} target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
      </div>
    </article>
  );
}
