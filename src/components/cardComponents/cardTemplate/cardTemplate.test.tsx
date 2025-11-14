import CardTemplate from "./CardTemplate";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PokemonCardObject from "../utilities/cardConstructor/cardConstructor";
import userEvent from "@testing-library/user-event";

// Create mock dispatch function
const mockDispatch = vi.fn();

// Initial mock state
let mockState = {
  gameStarted: false,
  gameWon: false,
  gameLost: false,
  gameDifficulty: "easy",
  cardTotal: 1,
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
// mock cardDetails and setIsHidden function
const cardDetails: PokemonCardObject = {
  id: "1",
  name: "Pikachu",
  imageUrl: "test-url",
  type: "electric",
  isClicked: false,
  toggleClick: vi.fn(),
  validateInputs: () => true,
};

// Mock setIsHidden function
const setIsHidden = vi.fn();

// Combine props for easy passing
const mockCardTemplateProps = { cardDetails, setIsHidden };

// Clear mocks and reset state before each test
beforeEach(() => {
  vi.clearAllMocks();
  mockState = {
    gameStarted: false,
    gameWon: false,
    gameLost: false,
    gameDifficulty: "easy",
    cardTotal: 1,
    score: 0,
    finalTime: "",
  };
  cardDetails.isClicked = false;
});

describe("CardTemplate Component", () => {
  //Rendering Tests

  it("renders without crashing", () => {
    render(<CardTemplate {...mockCardTemplateProps} />);
    expect(screen.getByTestId("playing-card-container")).toBeInTheDocument();
  });

  it("displays the correct card name", () => {
    render(<CardTemplate {...mockCardTemplateProps} />);
    const cardName = screen.getByTestId("card-name");
    expect(cardName.textContent).toBe(cardDetails.name);
  });

  it("displays the correct card image and alt text", () => {
    render(<CardTemplate {...mockCardTemplateProps} />);
    const cardImage = screen.getByRole("img");
    expect(cardImage.getAttribute("src")).toBe(cardDetails.imageUrl);
    expect(cardImage.getAttribute("alt")).toBe(`${cardDetails.name} Image`);
  });


  // User Interaction Tests

  it("dispatches toggleGameLost on second click", async () => {
    const user = userEvent.setup();
    render(<CardTemplate {...mockCardTemplateProps} />);
    const cardContainer = screen.getByTestId("playing-card-container");
    await user.click(cardContainer); // First click
    await user.click(cardContainer); // Second click
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

  it("does not dispatch incrementScore or toggleGameWon when card is already clicked", async () => {
    cardDetails.isClicked = true; // Simulate already clicked card
    const user = userEvent.setup();
    render(<CardTemplate {...mockCardTemplateProps} />);
    const cardContainer = screen.getByTestId("playing-card-container");
    await user.click(cardContainer);
    expect(setIsHidden).not.toHaveBeenCalled();
    expect(mockDispatch).not.toHaveBeenCalledWith({
      type: "incrementScore",
      payload: null,
    });
    expect(mockDispatch).not.toHaveBeenCalledWith({
      type: "toggleGameWon",
      payload: true,
    });
  });

  it("No action is performed if no card is clicked", async () => {
    render(<CardTemplate {...mockCardTemplateProps} />);
    expect(mockDispatch).not.toHaveBeenCalled();
    expect(setIsHidden).not.toHaveBeenCalled();
    expect(cardDetails.isClicked).toBe(false);
    // No click action performed
  });
});
