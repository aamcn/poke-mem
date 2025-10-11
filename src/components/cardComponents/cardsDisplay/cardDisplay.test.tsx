import CardDisplay from "./CardsDIsplay";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

// Mock the useGameContext hook
const mockDispatch = vi.fn();

// initial mock state
let mockState = {
  gameStarted: false,
  gameWon: false,
  gameLost: false,
  gameDifficulty: "easy",
  cardTotal: 0,
  score: 0,
  finalTime: "",
};

// Mock the useGameContext hook
vi.mock("../../gameComponents/game/useGameContext/useGameContext", () => ({
  useGameContext: vi.fn(() => ({
    state: mockState,
    dispatch: mockDispatch,
  })),
}));

// Mock props for testing
const chosenPokemon = [
  {
    id: 1,
    name: "Pikachu",
    imageUrl: "test-url-1",
    sprites: { other: { dream_world: { front_default: "sprite-1" } } },
    types: [{ type: { name: "electric" } }],
  },
  {
    id: 2,
    name: "Charmander",
    imageUrl: "test-url-2",
    sprites: { other: { dream_world: { front_default: "sprite-2" } } },
    types: [{ type: { name: "fire" } }],
  },
];

// Combine props for easy passing
const CardDisplayprops = { chosenPokemon };

// Reset mock state before each test
beforeEach(() => {
  vi.clearAllMocks();
  mockState = {
    gameStarted: false,
    gameWon: false,
    gameLost: false,
    gameDifficulty: "easy",
    cardTotal: 0,
    score: 0,
    finalTime: "",
  };
});

describe("CardDisplay Component", () => {
  it("initially renders with cards visible", () => {
    render(<CardDisplay {...CardDisplayprops} />);
    const container = screen.getByTestId("cards-container");
    expect(container).toBeInTheDocument();
  });

  it("applies correct CSS class for 4 cards", () => {
    // Mock useGameContext to return cardTotal of 4
    mockState.cardTotal = 4;
    render(<CardDisplay {...CardDisplayprops} />);
    const container = screen.getByTestId("cards-container");
    expect(container.getAttribute("class")).toMatch(/fourCardsContainer/);
  });

  it("applies correct CSS class for 6 cards", () => {
    // Mock useGameContext to return cardTotal of 6
    mockState.cardTotal = 6;
    render(<CardDisplay {...CardDisplayprops} />);
    const container = screen.getByTestId("cards-container");
    expect(container.getAttribute("class")).toMatch(/sixCardsContainer/);
  });

  it("applies correct CSS class for 9 cards", () => {
    // Mock useGameContext to return cardTotal of 9
    mockState.cardTotal = 9;
    render(<CardDisplay {...CardDisplayprops} />);
    const container = screen.getByTestId("cards-container");
    expect(container.getAttribute("class")).toMatch(/nineCardsContainer/);
  });

  it("applies correct CSS class when cardTotal changes", () => {
    // Start with 4 cards
    mockState.cardTotal = 4;
    const { rerender } = render(<CardDisplay {...CardDisplayprops} />);
    const container = screen.getByTestId("cards-container");
    expect(container.getAttribute("class")).toMatch(/fourCardsContainer/);
    // Change to 6 cards
    mockState.cardTotal = 6;
    rerender(<CardDisplay {...CardDisplayprops} />);
    expect(container.getAttribute("class")).toMatch(/sixCardsContainer/);
    // Change to 9 cards
    mockState.cardTotal = 9;
    rerender(<CardDisplay {...CardDisplayprops} />);
    expect(container.getAttribute("class")).toMatch(/nineCardsContainer/);
  });
});
