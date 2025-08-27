import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGithubUser } from "../types/github";

interface User {
  login: string;
  avatar_url: string;
  html_url: string;
  name: string;
  bio: string;
  blog: string;
  followers: number;
  following: number;
  public_repos: number;
  public_gists: number;
}

interface Repo {
  id: number;
  name: string;
  html_url: string;
  description: string;
}




const UserDetail = () => {
  const { username } = useParams<{ username: string }>();
  const { user, repos, loading } = useGithubUser(username || "");
  const [user, setUser] = useState<User | null>(null);
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!username) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const userRes = await fetch(`https://api.github.com/users/${username}`);
        const userData = await userRes.json();
        setUser(userData);

        const repoRes = await fetch(`https://api.github.com/users/${username}/repos`);
        const repoData = await repoRes.json();
        setRepos(repoData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div className="container">
      <button onClick={() => navigate("/")}>Back to Search</button>

      {/* ユーザー情報 */}
      <div className="profile-card">
        <img src={user.avatar_url} alt={user.login} width={150} />
        <h1>{user.name || user.login}</h1>
        <p>{user.bio}</p>
        <a href={user.html_url} target="_blank" rel="noopener noreferrer">Show Github Profile</a>
        <p>Website: <a href={user.blog}>{user.blog}</a></p>
        <div>
          <span>Followers: {user.followers}</span>
          <span>Following: {user.following}</span>
          <span>Repository: {user.public_repos}</span>
          <span>Gist: {user.public_gists}</span>
        </div>
      </div>

      {/* リポジトリ一覧 */}
      <div className="repo-grid">
        {repos.map((repo) => (
          <div className="repo-card" key={repo.id}>
            <h3>{repo.name}</h3>
            <p>{repo.description}</p>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">View on Github</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDetail;
