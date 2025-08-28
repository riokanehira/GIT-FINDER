// ページ上部ナビゲーション
// src/components/SearchBar.tsx
import { FormEvent } from "react";
import styles from "./SearchBar.module.css";

type Props = {
  keyword: string;
  onKeywordChange: (v: string) => void;
  onSearch: () => void;
  onClear: () => void;
  loading: boolean;
};


export default function SearchBar({
  keyword,
  onKeywordChange,
  onSearch,
  onClear,
  loading = false,
}: Props) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();   // Enter でフォーム送信してもページ遷移しない
    onSearch();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        value={keyword}
        placeholder="GitHubユーザーを検索"
        onChange={(e) => onKeywordChange(e.target.value)}
        aria-label="GitHubユーザー名"
        className={styles.input}
      />
      <button className={styles.search} type="submit" disabled={!keyword || loading}>
        検索
      </button>
      <button
        type="button"
        onClick={onClear}
        disabled={loading && !keyword}
        aria-label="検索条件と結果をクリア"
        className={styles.clearAll}
      >
        クリア
      </button>
    </form>
  );
}
