import GameWonPopUp from "./GameWonPopUp";
import { render, screen } from "@testing-library/react";
import { describe, vi, expect, it, beforeEach } from "vitest";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

// Mock game context
let mockState = {
  gameStarted: false,
  gameWon: true,
  gameLost: false,
  gameDifficulty: "easy",
  cardTotal: 1,
  score: 0,
  finalTime: "02:34:00",
  // Add other state properties as needed
};

const mockDispatch = vi.fn();

vi.mock("../../gameComponents/game/Game", () => ({
  useGameContext: () => ({
    state: mockState,
    dispatch: mockDispatch,
  }),
}));

// Reset mock state before each test
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
});

const setLeaderBoardFormVisible = vi.fn();

describe("GameWonPopUp Component", () => {
  it("renders without crashing", () => {
    render(
      <GameWonPopUp setLeaderBoardFormVisible={setLeaderBoardFormVisible} />
    );
    const popupElement = screen.getByTestId("game-won-popup");
    expect(popupElement).toBeInTheDocument();
  });

  it("displays the correct final time from state", () => {
    render(
      <GameWonPopUp setLeaderBoardFormVisible={setLeaderBoardFormVisible} />
    );
    const finalTimeElement = screen.getByTestId("win-final-time");
    expect(finalTimeElement).toHaveTextContent(mockState.finalTime);
  });

   it("calls setLeaderBoardFormVisible when 'new game' button is clicked", async () => {
    render(
      <GameWonPopUp setLeaderBoardFormVisible={setLeaderBoardFormVisible} />
    );
    const user = userEvent.setup();
    const newGameButton = screen.getByLabelText("Start a New Game Button");
    await user.click(newGameButton);
    expect(mockDispatch).toHaveBeenCalledWith({ type: "resetGame", payload: null });
  });

  it("calls setLeaderBoardFormVisible when 'Submit Score' button is clicked", async () => {
    render(
      <GameWonPopUp setLeaderBoardFormVisible={setLeaderBoardFormVisible} />
    );
    const user = userEvent.setup();
    const submitButton = screen.getByTestId("submit-score-button");
    await user.click(submitButton);
    expect(setLeaderBoardFormVisible).toHaveBeenCalledWith(true);
  });

  
});
