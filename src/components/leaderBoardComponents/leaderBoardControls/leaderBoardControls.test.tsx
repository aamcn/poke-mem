import LeaderBoardControls from "./LeaderBoardControls";
import { screen, render, fireEvent } from "@testing-library/react";
import { expect, vi, it, describe, beforeEach } from "vitest";

const mockProps = {
  selectedDifficulty: "Easy",
  setSelectedDifficulty: vi.fn(),
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe("LeaderBoardControls", () => {
  describe("Rendering tests", () => {
    it("renders correctly", () => {
      render(<LeaderBoardControls {...mockProps} />);
      const leaderboardControlsContainer = screen.getByTestId(
        "leaderboard-controls-container",
      );
      expect(leaderboardControlsContainer).toBeInTheDocument();
    });

    it("renders the difficulty selector label", () => {
      render(<LeaderBoardControls {...mockProps} />);
      const label = screen.getByLabelText("Difficulty Selector");
      expect(label).toBeInTheDocument();
    });

    it("renders the difficulty select dropdown", () => {
      render(<LeaderBoardControls {...mockProps} />);
      const select = screen.getByTestId("difficulty-selector");
      expect(select).toBeInTheDocument();
    });

    it("should render the selector with default value 'Easy'", () => {
      render(<LeaderBoardControls {...mockProps} />);
      const select = screen.getByTestId("difficulty-selector");
      expect(select).toHaveValue("Easy");
    });
  });

  describe("Difficulty option change tests", () => {
    it("calls setSelectedDifficulty with 'Easy' when Easy option is selected", () => {
      render(<LeaderBoardControls {...mockProps} />);
      const select = screen.getByTestId("difficulty-selector");
      fireEvent.change(select, { target: { value: "Easy" } });
      expect(mockProps.setSelectedDifficulty).toHaveBeenCalledWith("Easy");
    });

    it("calls setSelectedDifficulty with 'Medium' when Medium option is selected", () => {
      render(<LeaderBoardControls {...mockProps} />);
      const select = screen.getByTestId("difficulty-selector");
      fireEvent.change(select, { target: { value: "Medium" } });
      expect(mockProps.setSelectedDifficulty).toHaveBeenCalledWith("Medium");
    });

    it("calls setSelectedDifficulty with 'Hard' when Hard option is selected", () => {
      render(<LeaderBoardControls {...mockProps} />);
      const select = screen.getByTestId("difficulty-selector");
      fireEvent.change(select, { target: { value: "Hard" } });
      expect(mockProps.setSelectedDifficulty).toHaveBeenCalledWith("Hard");
    });

    it("Does not call setSelectedDifficulty when option is not changed", () => {
      render(<LeaderBoardControls {...mockProps} />);
      const select = screen.getByTestId("difficulty-selector");
      expect(select).toHaveValue("Easy");
      expect(mockProps.setSelectedDifficulty).not.toHaveBeenCalled();
    });
  });
});
