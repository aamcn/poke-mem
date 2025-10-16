import RouterErrorPage from "./RouterErrorPage";
import { render, screen } from "@testing-library/react";
import {expect, it, describe} from "vitest";
import { BrowserRouter as Router } from "react-router-dom";

describe("RouterErrorPage", () => {
  it("renders the error message and link correctly", () => {
    render(
      <Router>
        <RouterErrorPage />
      </Router>
    );
    const heading = screen.getByLabelText(
      "Error Heading: Oh no, this route doesn't exist!"
    );
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Oh no, this route doesn't exist!");
  });

  it("renders the home page link correctly", () => {
    render(
      <Router>
        <RouterErrorPage />
      </Router>
    );
    const link = screen.getByLabelText(
      "Home Page Link: Go back to the home page by clicking here"
    );
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/");
  });

})