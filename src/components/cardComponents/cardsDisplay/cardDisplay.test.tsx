import CardDisplay from "./CardsDIsplay";
import { describe, expect, it, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

// Create a mock function that we can control
const mockUseGameContext = vi.fn();

// Mock the Game module
vi.mock("../../gameComponents/game/Game", () => ({
  useGameContext: () => mockUseGameContext(),
}));

// Define the Pokemon type for testing purposes
type Pokemon = {
  id: number;
  name: string;
  imageUrl: string;
  sprites: { other: { dream_world: { front_default: string } } };
  types: { type: { name: string } }[];
};

// Mock props for testing
const chosenPokemon: Pokemon[] = [
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
] as Pokemon[];

const CardDisplayprops = { chosenPokemon };

  mockUseGameContext.mockReturnValue({
      state: {
        gameStarted: false,
        gameWon: false,
        gameLost: false,
        gameDifficulty: "easy",
        cardTotal: 0,
        score: 0,
        finalTime: "",
      },
      dispatch: vi.fn(),
    });

describe("CardDisplay Component", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders the card display container when not hidden", () => {
    // Set up the mock to return basic states
    render(<CardDisplay {...CardDisplayprops} />);
    expect(screen.getByTestId("cards-container")).toBeInTheDocument();
  });

  it("applies correct CSS class for 4 cards", () => {
    // Mock useGameContext to return cardTotal of 4
    mockUseGameContext.mockReturnValue({ state: { cardTotal: 4 } });
    render(<CardDisplay {...CardDisplayprops} />);
    const container = screen.getByTestId("cards-container");
    expect(container.getAttribute("class")).toMatch(/fourCardsContainer/);
  });

  it("applies correct CSS class for 6 cards", () => {
    // Mock useGameContext to return cardTotal of 6
    mockUseGameContext.mockReturnValue({ state: { cardTotal: 6 } });
    render(<CardDisplay {...CardDisplayprops} />);
    const container = screen.getByTestId("cards-container");
    expect(container.getAttribute("class")).toMatch(/sixCardsContainer/);
  });

  it("applies correct CSS class for 9 cards", () => {
    // Mock useGameContext to return cardTotal of 9
    mockUseGameContext.mockReturnValue({ state: { cardTotal: 9 } });
    render(<CardDisplay {...CardDisplayprops} />);
    const container = screen.getByTestId("cards-container");
    expect(container.getAttribute("class")).toMatch(/nineCardsContainer/);
  });
});

it("applies correct CSS class for 9 cards", () => {
    // Mock useGameContext to return cardTotal of 9
    mockUseGameContext.mockReturnValue({ state: { cardTotal: 4 } });
    const { rerender } = render(<CardDisplay {...CardDisplayprops} />);
    const container = screen.getByTestId("cards-container");
    expect(container.getAttribute("class")).toMatch(/fourCardsContainer/);
    mockUseGameContext.mockReturnValue({ state: { cardTotal: 6 } });
    rerender(<CardDisplay {...CardDisplayprops} />);
    expect(container.getAttribute("class")).toMatch(/sixCardsContainer/);
    mockUseGameContext.mockReturnValue({ state: { cardTotal: 9 } });
    rerender(<CardDisplay {...CardDisplayprops} />);
    expect(container.getAttribute("class")).toMatch(/nineCardsContainer/);
  });
