// src/types/github.ts
import { useEffect, useState } from "react";
export interface GithubUser {
  login: string;
  avatar_url: string;
  html_url: string;
}

// src/hooks/useGithubUser.ts


export const useGithubUser = (username: string) => {
  const [user, setUser] = useState<any>(null);
  const [repos, setRepos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!username) return;
    const fetchData = async () => {
      setLoading(true);
      const userRes = await fetch(`https://api.github.com/users/${username}`);
      setUser(await userRes.json());
      const repoRes = await fetch(`https://api.github.com/users/${username}/repos`);
      setRepos(await repoRes.json());
      setLoading(false);
    };
    fetchData();
  }, [username]);

  return { user, repos, loading };
};




