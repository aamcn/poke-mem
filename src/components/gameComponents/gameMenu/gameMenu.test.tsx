import GameMenu from "./GameMenu";
import { render, screen } from "@testing-library/react";
import { describe, vi, expect, it, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

let mockState = {
  gameStarted: false,
  gameWon: false,
  gameLost: false,
  gameDifficulty: "",
  cardTotal: 0,
  score: 0,
};

let mockDispatch = vi.fn();

vi.mock("../../gameComponents/game/Game", () => ({
  useGameContext: () => ({
    state: mockState,
    dispatch: mockDispatch,
  }),
}));

beforeEach(() => {
  mockState = {
    gameStarted: false,
    gameWon: false,
    gameLost: false,
    gameDifficulty: "",
    cardTotal: 0,
    score: 0,
  };
  mockDispatch = vi.fn();
});

const user = userEvent.setup();

describe("GameMenu Component", () => {
  it("renders without crashing", () => {
    render(<GameMenu />);
    const gameMenu = screen.getByTestId("game-menu-container");
    expect(gameMenu).toBeInTheDocument();
  });

  it("calls toggleGameDifficulty dispatch when a difficulty button is clicked", async () => {
    render(<GameMenu />);
    const easyButton = screen.getByTestId("easy-button");
    const mediumButton = screen.getByTestId("medium-button");
    const hardButton = screen.getByTestId("hard-button");

    await user.click(easyButton);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "toggleGameDifficulty",
      payload: ["Easy", 4],
    });

    await user.click(mediumButton);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "toggleGameDifficulty",
      payload: ["Medium", 6],
    });

    await user.click(hardButton);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "toggleGameDifficulty",
      payload: ["Hard", 9],
    });
  });

  it("renders no error message when card total is 0", async () => {
    mockState.cardTotal = 4;
    const { rerender } = render(<GameMenu />);
    const easyButton = screen.getByTestId("easy-button");
    const currentDifficultyText = screen.getByTestId("difficulty-text");
    mockState.cardTotal = 0;
    rerender(<GameMenu />);
    await user.click(easyButton);
    expect(currentDifficultyText).not.toBeInTheDocument();
  });

  it("renders difficulty text correctly (easy)", async () => {
    const { rerender } = render(<GameMenu />);
    const easyButton = screen.getByTestId("easy-button");

    mockState.gameDifficulty = "easy";
    mockState.cardTotal = 4;
    rerender(<GameMenu />);
    const currentDifficultyText = screen.getByTestId("difficulty-text");
    await user.click(easyButton);
    expect(currentDifficultyText.textContent).toBe("easy - 4 Cards");
  });

  it("renders difficulty text correctly (medium)", async () => {
    const { rerender } = render(<GameMenu />);
    const mediumButton = screen.getByTestId("medium-button");

    mockState.gameDifficulty = "medium";
    mockState.cardTotal = 6;
    rerender(<GameMenu />);
    const currentDifficultyText = screen.getByTestId("difficulty-text");

    await user.click(mediumButton);
    expect(currentDifficultyText.textContent).toBe("medium - 6 Cards");
  });

  it("renders difficulty text correctly (hard)", async () => {
    const { rerender } = render(<GameMenu />);
    const hardButton = screen.getByTestId("hard-button");

    mockState.gameDifficulty = "hard";
    mockState.cardTotal = 9;
    rerender(<GameMenu />);
    const currentDifficultyText = screen.getByTestId("difficulty-text");

    await user.click(hardButton);
    expect(currentDifficultyText.textContent).toBe("hard - 9 Cards");
  });

    it("shows error message when starting game without selecting difficulty", async () => {
    render(<GameMenu />);
    const startButton = screen.getByText("Start Game");
    await user.click(startButton);
    const errorMessage = screen.getByText(
      "Please select a difficulty before starting the game."
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it("calls startGame dispatch when start button is clicked after selecting difficulty", async () => {
    mockState.gameDifficulty = "easy";
    mockState.cardTotal = 6;
    render(<GameMenu />);
    const startButton = screen.getByText("Start Game");
    await user.click(startButton);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "toggleGameStarted",
      payload: true,
    });
  });

  it("hides 'select difficulty' error message after selecting easy difficulty", async () => {
    const { rerender } = render(<GameMenu />);
    const startButton = screen.getByText("Start Game");
    const errorMessage = screen.queryByTestId("error-message");
    const easyButton = screen.getByTestId("easy-button");
    await user.click(startButton);
    expect(errorMessage).not.toBeInTheDocument();
    await user.click(easyButton);
    rerender(<GameMenu />);
    expect(errorMessage).not.toBeInTheDocument();
  });

  it("hides 'select difficulty' error message after selecting medium difficulty", async () => {
    const { rerender } = render(<GameMenu />);
    const startButton = screen.getByText("Start Game");
    const errorMessage = screen.queryByTestId("error-message");
    const mediumButton = screen.getByTestId("medium-button");
    await user.click(startButton);
    expect(errorMessage).not.toBeInTheDocument();
    await user.click(mediumButton);
    rerender(<GameMenu />);
    expect(errorMessage).not.toBeInTheDocument();
  });

  it("hides 'select difficulty' error message after selecting hard difficulty", async () => {
    const { rerender } = render(<GameMenu />);
    const startButton = screen.getByText("Start Game");
    const errorMessage = screen.queryByTestId("error-message");
    const hardButton = screen.getByTestId("hard-button");
    await user.click(startButton);
    expect(errorMessage).not.toBeInTheDocument();
    await user.click(hardButton);
    rerender(<GameMenu />);
    expect(errorMessage).not.toBeInTheDocument();
  });
});
