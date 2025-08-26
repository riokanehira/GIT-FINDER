

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface User {
  login: string;
  avatar_url: string;
  html_url: string;
  name: string;
  bio: string;
}

interface Repo {
  id: number;
  name: string;
  html_url: string;
  description: string;
}

const UserDetail = () => {
  const { username } = useParams<{ username: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);

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
    <div>
      <h1>{user.name || user.login}</h1>
      <img src={user.avatar_url} alt={user.login} width={100} />
      <p>{user.bio}</p>
      <a href={user.html_url} target="_blank" rel="noopener noreferrer">
        Show Github Profile
      </a>

      <h2>Repositories</h2>
      <ul>
        {repos.map((repo) => (
          <li key={repo.id}>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
              {repo.name}
            </a>
            <p>{repo.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserDetail;
