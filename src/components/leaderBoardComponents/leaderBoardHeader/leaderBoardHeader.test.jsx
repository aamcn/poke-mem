import LeaderBoardHeader from "./LeaderBoardHeader";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { BrowserRouter } from "react-router-dom";
import React from "react";

const mockProps = {
  selectedDifficulty: "Easy",
};

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

afterEach(() => {
  vi.clearAllMocks();
});

describe("LeaderBoardHeader", () => {
  it("renders the header correctly", () => {
    renderWithRouter(<LeaderBoardHeader {...mockProps} />);
    const headerElement = screen.getByTestId("leader-board-header");
    expect(headerElement).toBeInTheDocument();
  });

  it("renders with the correct default difficulty", () => {
    renderWithRouter(<LeaderBoardHeader {...mockProps} />);
    const difficultyElement = screen.getByRole("heading", { name: /easy/i });
    expect(difficultyElement.textContent).toBe("Easy Leader Board");
  });

  it("renders with the correct updated difficulty", () => {
    renderWithRouter(<LeaderBoardHeader selectedDifficulty="Hard" />);
    const difficultyElement = screen.getByRole("heading", { name: /hard/i });
    expect(difficultyElement.textContent).toBe("Hard Leader Board");
  });
});
