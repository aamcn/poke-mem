import ScoreBoard from "./scoreBoard";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { vi, it, describe, beforeEach, expect } from "vitest";


let mockState = {
  gameStarted: false,
  gameWon: false,
  gameLost: false,
  gameDifficulty: "easy",
  cardTotal: 1,
  score: 0,
  finalTime: "",
};

const dispatch = vi.fn();

vi.mock("../../gameComponents/game/Game", () => ({
  useGameContext: () => ({
    state: mockState,
    dispatch,
  }),
}));


beforeEach(() => {
  vi.clearAllMocks();
  // Reset mock state before each test
  mockState = {
    gameStarted: false,
    gameWon: false,
    gameLost: false,
    gameDifficulty: "easy",
    cardTotal: 1,
    score: 0,
    finalTime: "",
  };
  localStorage.clear();
});

describe("ScoreBoard Component", () => {

    it("renders without crashing", () => {
      render(<ScoreBoard />);
      const scoreBoardElement = screen.getByTestId("scoreboard-container");
      expect(scoreBoardElement).toBeInTheDocument();
    });

    it("displays the current score correctly", () => {
      mockState.score = 5;
      render(<ScoreBoard />);
      const currentScoreElement = screen.getByTestId("current-score-text");
      expect(currentScoreElement).toHaveTextContent("5");
    });

    it("initializes high score in localStorage if not present", () => {
      render(<ScoreBoard />);
      const highScore = localStorage.getItem("highScore");
      expect(highScore).toBe("0");
    });

    it("updates high score in localStorage if current score is greater", () => {
      localStorage.setItem("highScore", "3");
      mockState.score = 5;
      render(<ScoreBoard />);
      const highScore = localStorage.getItem("highScore");
      expect(highScore).toBe("5");
    });

    it("does not update high score in localStorage if current score is not greater", () => {
      localStorage.setItem("highScore", "7");
      mockState.score = 5;
      render(<ScoreBoard />);
      const highScore = localStorage.getItem("highScore");
      expect(highScore).toBe("7");
    });

    it("displays the high score correctly", () => {
      localStorage.setItem("highScore", "10");
      render(<ScoreBoard />);
      const highScoreElement = screen.getByTestId("high-score-text");
      expect(highScoreElement).toHaveTextContent("10");
    });
});