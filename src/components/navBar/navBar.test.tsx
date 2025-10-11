import NavBar from "./NavBar";
import { render, screen, act } from "@testing-library/react";
import { it, describe, expect, vi } from "vitest";
import { BrowserRouter, MemoryRouter, Routes, Route } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

// Helper function to render component with Router context
const renderWithRouter = (component: React.ReactNode) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("NavBar Component", () => {
  it("renders the navbar", () => {
    renderWithRouter(<NavBar />);
    const navBarElement = screen.getByTestId("navbar");
    expect(navBarElement).toBeInTheDocument();
  });

  it("Renders navbar links.", () => {
    renderWithRouter(<NavBar />);
    const gameLink = screen.getByRole("link", { name: /game/i });
    const leaderBoardLink = screen.getByTestId("leaderboard-link");
    expect(gameLink).toBeInTheDocument();
    expect(leaderBoardLink).toBeInTheDocument();
  });

  it("NavBar links should be clickable.", () => {
    renderWithRouter(<NavBar />);
    const gameLink = screen.getByRole("link", { name: /game/i });
    const gameLinkSpy = vi.spyOn(gameLink, "click");
    const leaderBoardLink = screen.getByTestId("leaderboard-link");
    const leaderBoardSpy = vi.spyOn(leaderBoardLink, "click");

    act(() => {
      gameLink.click();
      leaderBoardLink.click();
    });
    expect(gameLinkSpy).toHaveBeenCalled();
    expect(leaderBoardSpy).toHaveBeenCalled();
  });

  it("should have correct href attributes", () => {
    renderWithRouter(<NavBar />);
    const gameLink = screen.getByRole("link", { name: /game/i });
    const leaderBoardLink = screen.getByTestId("leaderboard-link");
    expect(gameLink).toHaveAttribute("href", "/game-page");
    expect(gameLink).toHaveAttribute("id", "game-link");
    expect(leaderBoardLink).toHaveAttribute("href", "/leader-board");
    expect(leaderBoardLink).toHaveAttribute("id", "leaderboard-link");
  });
});

describe("Navigation tests", () => {
  it("should navigate to game-page path when user clicks the Game Page link", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={["/leader-board"]}>
        <Routes>
          <Route
            path="/game-page"
            element={
              <div>
                Game Page
                <NavBar />
              </div>
            }
          />
          <Route
            path="/leader-board"
            element={
              <div>
                Leader Board Page
                <NavBar />
              </div>
            }
          />
        </Routes>
      </MemoryRouter>,
    );
    const gamePageLink = screen.getByRole("link", { name: /Game/i });
    await user.click(gamePageLink);
    const gamePage = screen.queryByText("Game Page");
    expect(gamePage).toBeInTheDocument();
  });

  it("should navigate to leader-board path when user clicks the Leader Board link", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={["/game-page"]}>
        <Routes>
          <Route
            path="/game-page"
            element={
              <div>
                Game Page
                <NavBar />
              </div>
            }
          />
          <Route
            path="/leader-board"
            element={
              <div>
                Leader Board Page
                <NavBar />
              </div>
            }
          />
        </Routes>
      </MemoryRouter>,
    );
    const leaderBoardLink = screen.getByTestId("leaderboard-link");
    await user.click(leaderBoardLink);
    const LeaderBoardPage = screen.queryByText("Leader Board Page");
    expect(LeaderBoardPage).toBeInTheDocument();
  });
});
