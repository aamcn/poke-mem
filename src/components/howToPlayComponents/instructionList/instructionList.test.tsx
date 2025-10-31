import InstructionList from "./InstructionList";
import { render, screen } from "@testing-library/react";
import { describe, expect, it} from "vitest";

describe("InstructionList", () => {
  it("renders the instruction without crashing", () => {
    render(<InstructionList />);
    const listContainer = screen.getByTestId("instruction-container");
    expect(listContainer).toBeInTheDocument();
  });
});
