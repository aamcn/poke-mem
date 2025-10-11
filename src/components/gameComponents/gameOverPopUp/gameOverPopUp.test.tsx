import GameOverPopUp from "./GameOverPopUp";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";

// Initial mock state
let mockState = {
  gameStarted: false,
  gameWon: true,
  gameLost: false,
  gameDifficulty: "easy",
  cardTotal: 1,
  score: 0,
  finalTime: "02:34:00",
};
// Create mock dispatch function
let mockDispatch = vi.fn();

// Mock the useGameContext hook
vi.mock("../../gameComponents/game/useGameContext", () => ({
  useGameContext: vi.fn(() => ({
    state: mockState,
    dispatch: mockDispatch,
  })),
}));

// Reset mock state and dispatch before each test
beforeEach(() => {
  mockState = {
    gameStarted: false,
    gameWon: true,
    gameLost: false,
    gameDifficulty: "easy",
    cardTotal: 1,
    score: 0,
    finalTime: "02:34:00",
  };
  mockDispatch = vi.fn();
});

// Setup user event
const user = userEvent.setup();

describe("GameOverPopUp Component", () => {
  
 it("renders without crashing", () => {
    render(<GameOverPopUp />);
    const gameOverPopUp = screen.getByTestId("game-over-popup");
    expect(gameOverPopUp).toBeInTheDocument();
  });

  it("dispatches resetGame action when 'Retry?' button is clicked", async () => {
    render(<GameOverPopUp />);
    const retryButton = screen.getByTestId("retry-button");
    await user.click(retryButton);
    expect(mockDispatch).toHaveBeenCalledWith({ type: "resetGame", payload: null });
  });   

    it("displays the correct game over text", () => {
    render(<GameOverPopUp />);
    expect(screen.getByLabelText("Game Over")).toBeInTheDocument();
    expect(screen.getByLabelText("Oh no...")).toBeInTheDocument();
    expect(screen.getByLabelText("You already clicked on that")).toBeInTheDocument();
    expect(screen.getByLabelText("Would you like to try again?")).toBeInTheDocument();      
    });

});
