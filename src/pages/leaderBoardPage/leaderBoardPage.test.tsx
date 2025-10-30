import LeaderBoardPage from "./LeaderBoardPage";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import React from "react";

const renderWithRouter = (component: React.ReactNode) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("LeaderBoardPage", () => {
  it("renders LeaderBoardPage component", () => {
    renderWithRouter(<LeaderBoardPage />);
    expect(screen.getByTestId("leaderboard-page")).toBeInTheDocument();
  });

  it("renders LeaderBoardHeader component", () => {
    renderWithRouter(<LeaderBoardPage />);
    expect(screen.getByTestId("header")).toBeInTheDocument();
  });
});
