import { Link } from "react-router-dom";
import { GithubUser } from "../../../types/github";
import styles from "./UserCard.module.css";

export default function UserCard({ user }: { user: GithubUser }) {
  return (
    <article className={styles.card} style={{ display: "flex", gap: 12, alignItems: "center", padding: 12, border: "1px solid var(--border)", borderRadius: 8 }}>
      
      <img className={styles.avatar} src={user.avatar_url} alt={user.login} width={56} height={56} style={{ borderRadius: "50%" }} />
      
    
        <strong className={styles.name}>{user.login}</strong>
        <div className={styles.actions} style={{ display: "flex", gap: 8 }}>
          <Link className={styles.moreBtn} to={`/user/${user.login}`}>More</Link>
          
        </div>
    </article>
  );
}
