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

      <p>|</p>
      <Link
        id="leaderboard-link"
        to="/leader-board"
        aria-label="Leaderboard Link"
        data-testid="leaderboard-link"
      >
        Leader Board
      </Link>
      <p>|</p>
       <Link
        id="howToPlay-link"
        to="/how-to-play"
        aria-label="Hot To Play Link"
        data-testid="howToPlayLink"
      >
        How To Play
      </Link>
    </nav>
  );
}

export default Navbar;
