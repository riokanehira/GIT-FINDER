// ユーザー検索結果表示
import { Link } from "react-router-dom";
import { GithubUser } from "../../../types/github";
import styles from "./UserCard.module.css";

type Props = {
  user: GithubUser;
};

export default function UserCard({ user }: Props) {
  return (
    <div className={styles.userCard}>
      <div className={styles.Profile}>
        <img
          src={user.avatar_url}
          alt={`${user.login}のアバター`}
          width={48}
          height={48}
          style={{ borderRadius: "50%" }}
        />
        <div className={styles.userLink}>
            <Link to ="/user/:username">View More</Link>
            
        </div>
      </div>
    </div>
  );
}  
