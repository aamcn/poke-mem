import Game from "./Game";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, expect, it, vi, beforeEach } from "vitest";

describe("Game Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the Game component", () => {
    render(<Game />);
    const gameElement = screen.getByTestId("game-container");
    expect(gameElement).toBeInTheDocument();
  });
});
