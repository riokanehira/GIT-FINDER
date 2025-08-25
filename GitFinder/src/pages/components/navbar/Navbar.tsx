// ページ上部ナビゲーション
import { NavLink } from "react-router-dom";
import ThemeToggle from "../themeToggle/ThemeToggle";

export default function Navbar() {
  return (
    <header className="header">
      <nav className="nav" aria-label="Main">
        <div className="brand">GitHub Finder</div>

        <div className="navLinks">
          <NavLink
            to="/"
            className={({ isActive }) => `link ${isActive ? "active" : ""}`}
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) => `link ${isActive ? "active" : ""}`}
          >
            About
          </NavLink>

          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
