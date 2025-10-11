import CardTemplate from "./CardTemplate";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PokemonCardObject from "../utilities/cardConstructor/cardConstructor";
import userEvent from "@testing-library/user-event";

// Create mock dispatch function
const mockDispatch = vi.fn();

// Create a mutable mock state that can be updated during tests
let mockState = {
  gameStarted: false,
  gameWon: false,
  gameLost: false,
  gameDifficulty: "easy",
  cardTotal: 1,
  score: 0,
  finalTime: "",
};

// Mock the Game module to control useGameContext output
vi.mock("../../gameComponents/game/Game", () => ({
  useGameContext: () => ({
    state: mockState,
    dispatch: mockDispatch,
  }),
}));

const cardDetails: PokemonCardObject = {
  id: "1",
  name: "Pikachu",
  imageUrl: "test-url",
  type: "electric",
  isClicked: false,
  toggleClick: vi.fn(),
  validateInputs: () => true,
};

const setIsHidden = vi.fn();
const mockCardTemplateProps = { cardDetails, setIsHidden };

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
  // Reset card state
  cardDetails.isClicked = false;
});

describe("CardTemplate Component", () => {
  it("renders without crashing", () => {
    render(<CardTemplate {...mockCardTemplateProps} />);
    expect(screen.getByTestId("playing-card-container")).toBeInTheDocument();
  });

  it("displays the correct card name", () => {
    render(<CardTemplate {...mockCardTemplateProps} />);
    expect(screen.getByText(cardDetails.name)).toBeInTheDocument();
  });

  it("displays the correct card image and alt text", () => {
    render(<CardTemplate {...mockCardTemplateProps} />);
    const cardImage = screen.getByRole("img");
    expect(cardImage.getAttribute("src")).toBe(cardDetails.imageUrl);
    expect(cardImage.getAttribute("alt")).toBe(`${cardDetails.name} Image`);
  });

  it("dispatches toggleGameLost on second click", () => {
    render(<CardTemplate {...mockCardTemplateProps} />);
    const cardContainer = screen.getByTestId("playing-card-container");
    cardContainer.click(); // First click
    cardContainer.click(); // Second click
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "toggleGameLost",
      payload: true,
    });
  });

  it("calls setIsHidden and dispatches incrementScore on first click", async () => {
    const user = userEvent.setup();
    render(<CardTemplate {...mockCardTemplateProps} />);
    const cardContainer = screen.getByTestId("playing-card-container");
    await user.click(cardContainer);
    expect(setIsHidden).toHaveBeenCalledWith(true);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "incrementScore",
      payload: null,
    });
    expect(cardDetails.isClicked).toBe(true);
  });

  it("dispatches toggleGameWon when score equals cardTotal after first click", async () => {
    mockState.score = 0;
    mockState.cardTotal = 1;

    const user = userEvent.setup();
    render(<CardTemplate {...mockCardTemplateProps} />);
    const cardContainer = screen.getByTestId("playing-card-container");
    await user.click(cardContainer);

    expect(setIsHidden).toHaveBeenCalledWith(true);
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "incrementScore",
      payload: null,
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "toggleGameWon",
      payload: true,
    });
    expect(cardDetails.isClicked).toBe(true);
  });
});
