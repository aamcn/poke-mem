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

// Mock the useGameContext to return mock state and dispatch
vi.mock("../../gameComponents/game/Game", () => ({
  useGameContext: () => ({
    state: mockState,
    dispatch: mockDispatch,
  }),
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

  // Class Name Tests

  it("applies correct class names for 4 cards", () => {
    mockState.cardTotal = 4;
    render(<CardTemplate {...mockCardTemplateProps} />);
    const cardContainer = screen.getByTestId("playing-card-container");
    expect(cardContainer.getAttribute("class")).toContain("fourCardContainer");
    const imageContainer = cardContainer.firstChild as HTMLElement;
    expect(imageContainer.getAttribute("class")).toContain("fourImageContainer");
  });

  it("applies correct class names for 6 cards", () => {
    mockState.cardTotal = 6;
    render(<CardTemplate {...mockCardTemplateProps} />);
    const cardContainer = screen.getByTestId("playing-card-container");
    expect(cardContainer.getAttribute("class")).toContain("sixCardContainer");
    const imageContainer = cardContainer.firstChild as HTMLElement;
    expect(imageContainer.getAttribute("class")).toContain("sixImageContainer");
  });

  it("applies correct class names for 9 cards", () => {
    mockState.cardTotal = 9;
    render(<CardTemplate {...mockCardTemplateProps} />);
    const cardContainer = screen.getByTestId("playing-card-container");
    expect(cardContainer.getAttribute("class")).toContain("nineCardContainer");
    const imageContainer = cardContainer.firstChild as HTMLElement;
    expect(imageContainer.getAttribute("class")).toContain("nineImageContainer");
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
    const user = userEvent.setup();
    render(<CardTemplate {...mockCardTemplateProps} />);
    expect(mockDispatch).not.toHaveBeenCalled();
    expect(setIsHidden).not.toHaveBeenCalled();
    expect(cardDetails.isClicked).toBe(false);
    // No click action performed
    });
});