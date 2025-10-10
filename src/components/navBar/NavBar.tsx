import { Link } from "react-router-dom";
import styles from "./navBar.module.css";

function Navbar() {
  return (
    <nav
      data-testid="navbar"
      className={styles.navbar}
      id="navbar"
      aria-label="navbar"
    >
      <Link id="game-link" to="/game-page" aria-label="Game Page Link">
        Game
      </Link>
      <Link
        id="leaderboard-link"
        to="/leader-board"
        aria-label="Leaderboard Link"
        data-testid="leaderboard-link"
      >
        Leader Board
      </Link>
    </nav>
  );
}

export default Navbar;
