// Initialize high score in local storage with a value of 0 if it doesn't already exist.
function initHighScore() {
  if (localStorage.getItem("highScore") === null) {
    localStorage.setItem("highScore", "0");
  }
}
export { initHighScore };
