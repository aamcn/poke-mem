import LeaderBoardForm from "./LeaderBoardForm";
import { render, screen } from "@testing-library/react";
import { postToLeaderBoardUrls } from "./constants/postToLeaderBoardUrls";
import "@testing-library/jest-dom";
import { vi, it, describe, beforeEach, expect } from "vitest";
import userEvent from "@testing-library/user-event";
import axios from "axios";

// Mock axios post
vi.spyOn(axios, "post").mockResolvedValue({ data: {} });

// Initial mock state
let mockState = {
  gameStarted: false,
  gameWon: false,
  gameLost: false,
  gameDifficulty: "easy",
  cardTotal: 1,
  score: 0,
  finalTime: "00:30:00",
};

// Create mock dispatch function
const mockDispatch = vi.fn();

// Mock the useGameContext hook
vi.mock("../../gameComponents/game/useGameContext/useGameContext", () => ({
  useGameContext: vi.fn(() => ({
    state: mockState,
    dispatch: mockDispatch,
  })),
}));

// Mock setLeaderBoardFormVisible function
const setLeaderBoardFormVisible = vi.fn();

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
});

// Setup user event
const user = userEvent.setup();

describe("LeaderBoardForm Component", () => {
  it("renders without crashing", () => {
    render(
      <LeaderBoardForm setLeaderBoardFormVisible={setLeaderBoardFormVisible} />,
    );
    const formElement = screen.getByTestId("leaderboard-form");
    expect(formElement).toBeInTheDocument();
  });

  it("calls setLeaderBoardFormVisible and dispatch on cancel", async () => {
    render(
      <LeaderBoardForm setLeaderBoardFormVisible={setLeaderBoardFormVisible} />,
    );
    const cancelButton = screen.getByText("Cancel");
    await user.click(cancelButton);
    expect(setLeaderBoardFormVisible).toHaveBeenCalledWith(false);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "resetGame",
      payload: null,
    });
  });

  it("Calls resetGame and setLeaderBoardFormVisible on form submit", async () => {
    render(
      <LeaderBoardForm setLeaderBoardFormVisible={setLeaderBoardFormVisible} />,
    );
    await userEvent.type(screen.getByLabelText("Player Name"), "Test Player");
    const submitButton = screen.getByText("Submit");
    await user.click(submitButton);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "resetGame",
      payload: null,
    });
    expect(setLeaderBoardFormVisible).toHaveBeenCalledWith(false);
  });

  it("submits form when user clicks submit", async () => {
    render(
      <LeaderBoardForm setLeaderBoardFormVisible={setLeaderBoardFormVisible} />,
    );
    await userEvent.type(screen.getByLabelText("Player Name"), "Test Player");
    const submitButton = screen.getByText("Submit");
    await user.click(submitButton);
    expect(axios.post).toHaveBeenCalled();
  });

  it("does not submit form when user clicks submit without entering name", async () => {
    render(
      <LeaderBoardForm setLeaderBoardFormVisible={setLeaderBoardFormVisible} />,
    );
    const submitButton = screen.getByText("Submit");
    await user.click(submitButton);
    expect(axios.post).not.toHaveBeenCalled();
  });

  it("selects the correct leaderBoardPostUrl based on state gameDifficulty (easy)", async () => {
    mockState.gameDifficulty = "easy";
    const easyLeaderBoardUrl = postToLeaderBoardUrls.easy;
    render(
      <LeaderBoardForm setLeaderBoardFormVisible={setLeaderBoardFormVisible} />,
    );
    await user.type(screen.getByLabelText("Player Name"), "Test Player");
    const submitButton = screen.getByText("Submit");
    await user.click(submitButton);
    expect(axios.post).toHaveBeenCalledWith(
      easyLeaderBoardUrl,
      expect.any(Object),
      { method: "cors" },
    );
  });

  it("selects the correct leaderBoardPostUrl based on state gameDifficulty (medium)", async () => {
    mockState.gameDifficulty = "medium";
    const mediumLeaderBoardUrl = postToLeaderBoardUrls.medium;
    render(
      <LeaderBoardForm setLeaderBoardFormVisible={setLeaderBoardFormVisible} />,
    );
    await user.type(screen.getByLabelText("Player Name"), "Test Player");
    const submitButton = screen.getByText("Submit");
    await user.click(submitButton);
    expect(axios.post).toHaveBeenCalledWith(
      mediumLeaderBoardUrl,
      expect.any(Object),
      { method: "cors" },
    );
  });

  it("selects the correct leaderBoardPostUrl based on state gameDifficulty (hard)", async () => {
    mockState.gameDifficulty = "hard";
    const hardLeaderBoardUrl = postToLeaderBoardUrls.hard;
    render(
      <LeaderBoardForm setLeaderBoardFormVisible={setLeaderBoardFormVisible} />,
    );
    await user.type(screen.getByLabelText("Player Name"), "Test Player");
    const submitButton = screen.getByText("Submit");
    await user.click(submitButton);
    expect(axios.post).toHaveBeenCalledWith(
      hardLeaderBoardUrl,
      expect.any(Object),
      { method: "cors" },
    );
  });
});
