
import styles from "./header.module.css";
import { Link } from "react-router-dom";
import Navbar from "../navBar/NavBar";

function Header() {
  return (
    <header
      className={styles.headerContainer}
      data-testid="header"
      aria-label="header"
    >
      <Navbar />
      <div
        className={styles.titleContainer}
        data-testid="header-title-container"
      >
        <h1 aria-label="Game Title: Poke-Mem">
          <Link
            data-testid="header-title"
            id="game-title"
            className={styles.gameTitle}
            aria-label="Game Title: Poke-Mem"
            to="/game-page"
          >
            Poke-Mem
          </Link>
        </h1>
      </div>
    </header>
  );
}

export default Header;