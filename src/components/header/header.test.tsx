import Header from "./Header";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { describe, expect, it } from "vitest";

describe("Header Component", () => {
  it("renders the header component", () => {
    render(
      <Router>
        <Header />
      </Router>
    );
    const headerElement = screen.getByTestId("header");
    expect(headerElement).toBeInTheDocument();
  });
});