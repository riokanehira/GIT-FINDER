export const ROUTES = {
    HOME: "/",
    ABOUT:"/about",
    USER:"/userPage",
    //REPO:"/repoList"
}
export const GITHUB_TOKEN = ""; // 任意: 'ghp_xxx...' を入れるならここ
export const GITHUB_API_HEADERS: HeadersInit = {
  Accept: "application/vnd.github+json",
  ...(GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : {}),
  "X-GitHub-Api-Version": "2022-11-28",
};
