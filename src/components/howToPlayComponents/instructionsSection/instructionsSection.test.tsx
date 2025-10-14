import InstructionsSection from "./InstructionsSection";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi  } from "vitest";

describe("InstructionsSection", () => {
   
    it("renders the instruction without crashing", () => {
    render(<InstructionsSection />);
    const instructionsSection = screen.getByTestId("instructions-section-container");
    expect(instructionsSection).toBeInTheDocument();
  });

  
})