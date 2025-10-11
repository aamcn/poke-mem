import { useGameContext } from "./useGameContext"
import { vi, describe, it, expect, beforeEach} from "vitest"


  // Mock context value
  const mockState = {
    gameStarted: false,
    gameWon: false,
    gameLost: false,
    gameDifficulty: "Easy",
    cardTotal: 0,
    score: 0,
    finalTime: "",
  };

  // Create mock dispatch function
  const mockDispatch = vi.fn();

  // Mock the useGameContext hook
  vi.mock("../../gameComponents/game/useGameContext", () => ({
    useGameContext: vi.fn(() => ({
      state: mockState,
      dispatch: mockDispatch,
    })),
  }));
  
  // Clear mocks before each test
  beforeEach(() => {
      vi.clearAllMocks();
    }); 

  describe("useGameContext Hook", () => {
    it("should return the context state and dispatch function", () => {
    const { state, dispatch } = useGameContext();
    expect(state).toEqual(mockState);
    expect(dispatch).toBe(mockDispatch);
  });

    it("should call dispatch function when invoked", () => {
    const { dispatch } = useGameContext();
    dispatch({ type: "toggleGameStarted", payload: true });
    expect(mockDispatch).toHaveBeenCalled();
    });

    it("should call dispatch function with correct payload", () => {
      const { dispatch } = useGameContext();
      dispatch({ type: "toggleGameStarted", payload: true });
      expect(mockDispatch).toHaveBeenCalledWith({ type: "toggleGameStarted", payload: true });
    });

    it("should handle multiple dispatch calls of the same action", () => {
      const { dispatch } = useGameContext();
      dispatch({ type: "toggleGameStarted", payload: true });
      dispatch({ type: "toggleGameStarted", payload: false });
      dispatch({ type: "toggleGameStarted", payload: true });
      dispatch({ type: "toggleGameStarted", payload: false });
      dispatch({ type: "toggleGameStarted", payload: true });
      expect(mockDispatch).toHaveBeenCalledTimes(5);
    });

    it("should handle multiple dispatch calls of different actions", () => {
      const { dispatch } = useGameContext();
      dispatch({ type: "toggleGameStarted", payload: true });
      dispatch({ type: "incrementScore", payload: null });
      dispatch({ type: "setFinalTime", payload: "01:23:45" });
      expect(mockDispatch).toHaveBeenCalledTimes(3);
    });

    it("should not call dispatch when no action is dispatched", () => {
      expect(mockDispatch).not.toHaveBeenCalled();
    });

});