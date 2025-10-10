import LeaderBoardTable from "./LeaderBoardTable";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import '@testing-library/jest-dom';

const mockProps = [
  { id: 3, player_name: "mockPlayerOne", finish_time: "9 seconds" },
  { id: 4, player_name: "mockPlayerTwo", finish_time: "15 seconds" },
];

describe("LeaderBoardTable", () => {
  it("renders Leader Board component", () => {
    render(<LeaderBoardTable leaderBoardData={mockProps} />);
    expect(screen.getByTestId("leaderboard-container")).toBeInTheDocument();
  });

  it("renders the table with correct headers", () => {
    render(<LeaderBoardTable leaderBoardData={mockProps} />);
    expect(screen.getByTestId("leaderboard-position-header")).toBeInTheDocument();
    expect(screen.getByTestId("leaderboard-player-name-header")).toBeInTheDocument();
    expect(screen.getByTestId("leaderboard-finish-time-header")).toBeInTheDocument();
  });

  it("handles empty state", () => {
    render(<LeaderBoardTable leaderBoardData={[]} />);
    expect(screen.getByText("No data available")).toBeInTheDocument();
  });

  describe("Renders with correct table row data", () => {
    it("renders table row 1 with first entry from mockProps", () => {
      render(<LeaderBoardTable leaderBoardData={mockProps} />);
      const entryRow = screen.getByTestId("row-1");
      expect(entryRow.firstChild).toHaveTextContent("1");
      expect(entryRow?.firstChild?.nextSibling).toHaveTextContent(
        "MockPlayerOne",
      );
      expect(entryRow?.firstChild?.nextSibling?.nextSibling).toHaveTextContent(
        "9 seconds",
      );
    });

    it("renders table row 2 with second entry from mockProps", () => {
      render(<LeaderBoardTable leaderBoardData={mockProps} />);
      const entryRowTwo = screen.getByTestId("row-2");
      expect(entryRowTwo.firstChild).toHaveTextContent("2");
      expect(entryRowTwo?.firstChild?.nextSibling).toHaveTextContent(
        "MockPlayerTwo",
      );
      expect(entryRowTwo.firstChild?.nextSibling?.nextSibling).toHaveTextContent(
        "15 seconds",
      );
    });
  });

  it("renders the correct number of rows", () => {
    render(<LeaderBoardTable leaderBoardData={mockProps} />);
    const rows = screen.getAllByRole("row");
    expect(rows.length).toBe(mockProps.length + 1); // +1 for header row
  });
});
