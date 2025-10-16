import LandingPage from "./LandingPage";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { landingPageGifUrl } from "./constants/landingPageConstants";

describe("LandingPage", () => {
  it("renders the landing page container", () => {
    render(
      <Router>
        <LandingPage />
      </Router>
    );
    const container = screen.getByTestId("landing-page-container");
    expect(container).toBeInTheDocument();
  });

  it("renders the main image", () => {
    render(
      <Router>
        <LandingPage />
      </Router>
    );
    const mainImage = screen.getByAltText("Haunter floating gif");
    expect(mainImage.getAttribute("src")).toBe(landingPageGifUrl);
  });

  it("renders enter game button with correct url", () => {
    render(
      <Router>
        <LandingPage />
      </Router>
    );
    const enterGameButton = screen.getByTestId("enter-game-button");
    expect(enterGameButton).toHaveTextContent("Enter");
    expect(enterGameButton.querySelector("a")?.getAttribute("href")).toBe(
      "/game-page"
    );
    expect(enterGameButton).toBeInTheDocument();
  });
});
